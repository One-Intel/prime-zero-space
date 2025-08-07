import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const scheduleEventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["announcement", "bell", "activity"]),
  audioPreset: z.number().optional(),
  repeat_pattern: z.array(z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])),
});

type ScheduleEventFormValues = z.infer<typeof scheduleEventSchema>;

interface ScheduleEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: ScheduleEventFormValues) => Promise<void>;
  initialValues?: Partial<ScheduleEventFormValues>;
  audioPresets?: Array<{ id: number; name: string }>;
}

export function ScheduleEventDialog({
  open,
  onOpenChange,
  onSave,
  initialValues,
  audioPresets = [],
}: ScheduleEventDialogProps) {
  const form = useForm<ScheduleEventFormValues>({
    resolver: zodResolver(scheduleEventSchema),
    defaultValues: initialValues || {
      title: "",
      time: "",
      location: "",
      type: "bell",
      repeat_pattern: [],
    },
  });

  const onSubmit = async (values: ScheduleEventFormValues) => {
    try {
      await onSave(values);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Schedule Event" : "Add Schedule Event"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bell">Bell</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {audioPresets.length > 0 && (
              <FormField
                control={form.control}
                name="audioPreset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audio Preset</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audio preset" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="repeat_pattern"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Repeat Pattern</FormLabel>
                    <FormDescription>
                      Select the days when this event should occur
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {DAYS_OF_WEEK.map((day, index) => {
                      const dayCode = day.slice(0, 3).toUpperCase() as "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
                      return (
                        <FormField
                          key={day}
                          control={form.control}
                          name="repeat_pattern"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={day}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(dayCode)}
                                    onCheckedChange={(checked) => {
                                      const values = checked
                                        ? [...field.value, dayCode]
                                        : field.value?.filter(
                                            (value) => value !== dayCode
                                          );
                                      field.onChange(values);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {day}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
