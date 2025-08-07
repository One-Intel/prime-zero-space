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
import { Slider } from "@/components/ui/slider";

const scheduleConditionSchema = z.object({
  condition_type: z.enum(["weather", "temperature", "attendance", "custom"]),
  operator: z.enum(["equals", "not_equals", "greater_than", "less_than", "between"]),
  value: z.any(),
  action: z.enum(["skip", "delay", "alternate", "notify"]),
  action_params: z.record(z.string(), z.any()).optional(),
});

type ScheduleConditionFormValues = z.infer<typeof scheduleConditionSchema>;

interface ScheduleConditionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: ScheduleConditionFormValues) => Promise<void>;
  initialValues?: Partial<ScheduleConditionFormValues>;
  scheduleItem: {
    id: string;
    title: string;
  };
}

export function ScheduleConditionsDialog({
  open,
  onOpenChange,
  onSave,
  initialValues,
  scheduleItem,
}: ScheduleConditionsDialogProps) {
  const form = useForm<ScheduleConditionFormValues>({
    resolver: zodResolver(scheduleConditionSchema),
    defaultValues: initialValues || {
      condition_type: "weather",
      operator: "equals",
      value: "",
      action: "skip",
    },
  });

  const onSubmit = async (values: ScheduleConditionFormValues) => {
    try {
      await onSave(values);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving condition:", error);
    }
  };

  const renderValueInput = () => {
    const type = form.watch("condition_type");
    const operator = form.watch("operator");

    switch (type) {
      case "weather":
        return (
          <Select
            onValueChange={(value) => form.setValue("value", value)}
            value={form.getValues("value")}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select weather condition" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="sunny">Sunny</SelectItem>
              <SelectItem value="rainy">Rainy</SelectItem>
              <SelectItem value="cloudy">Cloudy</SelectItem>
              <SelectItem value="stormy">Stormy</SelectItem>
            </SelectContent>
          </Select>
        );
      case "temperature":
        return operator === "between" ? (
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Min temperature"
              onChange={(e) =>
                form.setValue("value", {
                  ...form.getValues("value"),
                  min: parseFloat(e.target.value),
                })
              }
            />
            <Input
              type="number"
              placeholder="Max temperature"
              onChange={(e) =>
                form.setValue("value", {
                  ...form.getValues("value"),
                  max: parseFloat(e.target.value),
                })
              }
            />
          </div>
        ) : (
          <Input
            type="number"
            placeholder="Temperature value"
            onChange={(e) => form.setValue("value", parseFloat(e.target.value))}
          />
        );
      case "attendance":
        return (
          <Input
            type="number"
            placeholder="Attendance percentage"
            onChange={(e) => form.setValue("value", parseFloat(e.target.value))}
          />
        );
      default:
        return (
          <Input
            placeholder="Custom value"
            onChange={(e) => form.setValue("value", e.target.value)}
          />
        );
    }
  };

  const renderActionParams = () => {
    const action = form.watch("action");

    switch (action) {
      case "delay":
        return (
          <FormField
            control={form.control}
            name="action_params.delay_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delay Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "alternate":
        return (
          <FormField
            control={form.control}
            name="action_params.alternate_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternative Event</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "notify":
        return (
          <FormField
            control={form.control}
            name="action_params.notification_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Message</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Condition for {scheduleItem.title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="condition_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weather">Weather</SelectItem>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="not_equals">Not Equals</SelectItem>
                      <SelectItem value="greater_than">Greater Than</SelectItem>
                      <SelectItem value="less_than">Less Than</SelectItem>
                      <SelectItem value="between">Between</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={() => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>{renderValueInput()}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="skip">Skip Event</SelectItem>
                      <SelectItem value="delay">Delay Event</SelectItem>
                      <SelectItem value="alternate">Use Alternative</SelectItem>
                      <SelectItem value="notify">Send Notification</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {renderActionParams()}
            <DialogFooter>
              <Button type="submit">Save Condition</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
