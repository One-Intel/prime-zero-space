import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, X, GripVertical } from "lucide-react";

const bellPatternSchema = z.object({
  name: z.string().min(1, "Pattern name is required"),
  description: z.string().optional(),
  pattern_type: z.enum(["single", "sequence", "custom"]),
  sequence: z.array(z.number()),
  interval_seconds: z.array(z.number()),
});

type BellPatternFormValues = z.infer<typeof bellPatternSchema>;

interface BellPatternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: BellPatternFormValues) => Promise<void>;
  initialValues?: Partial<BellPatternFormValues>;
  audioPresets: Array<{ id: number; name: string }>;
}

export function BellPatternDialog({
  open,
  onOpenChange,
  onSave,
  initialValues,
  audioPresets,
}: BellPatternDialogProps) {
  const [sequenceItems, setSequenceItems] = useState<Array<{ preset: number; interval: number }>>(
    initialValues?.sequence.map((preset, index) => ({
      preset,
      interval: initialValues.interval_seconds?.[index] || 0,
    })) || []
  );

  const form = useForm<BellPatternFormValues>({
    resolver: zodResolver(bellPatternSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      pattern_type: "single",
      sequence: [],
      interval_seconds: [],
    },
  });

  const onSubmit = async (values: BellPatternFormValues) => {
    try {
      await onSave({
        ...values,
        sequence: sequenceItems.map(item => item.preset),
        interval_seconds: sequenceItems.map(item => item.interval),
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving bell pattern:", error);
    }
  };

  const addSequenceItem = () => {
    setSequenceItems([...sequenceItems, { preset: audioPresets[0].id, interval: 0 }]);
  };

  const removeSequenceItem = (index: number) => {
    setSequenceItems(sequenceItems.filter((_, i) => i !== index));
  };

  const updateSequenceItem = (index: number, field: "preset" | "interval", value: number) => {
    setSequenceItems(
      sequenceItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Bell Pattern" : "Create Bell Pattern"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pattern Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pattern name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pattern_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pattern Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pattern type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single Sound</SelectItem>
                      <SelectItem value="sequence">Sound Sequence</SelectItem>
                      <SelectItem value="custom">Custom Pattern</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("pattern_type") !== "single" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Sound Sequence</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSequenceItem}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Sound
                  </Button>
                </div>
                <div className="space-y-4">
                  {sequenceItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <FormItem>
                          <FormLabel>Sound</FormLabel>
                          <Select
                            value={item.preset.toString()}
                            onValueChange={(value) =>
                              updateSequenceItem(index, "preset", parseInt(value))
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sound" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {audioPresets.map((preset) => (
                                <SelectItem
                                  key={preset.id}
                                  value={preset.id.toString()}
                                >
                                  {preset.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                        <FormItem>
                          <FormLabel>
                            Interval (seconds): {item.interval}
                          </FormLabel>
                          <Slider
                            value={[item.interval]}
                            min={0}
                            max={60}
                            step={1}
                            onValueChange={([value]) =>
                              updateSequenceItem(index, "interval", value)
                            }
                          />
                        </FormItem>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSequenceItem(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="submit">Save Pattern</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
