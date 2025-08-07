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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const scheduleExceptionSchema = z.object({
  name: z.string().min(1, "Exception name is required"),
  description: z.string().optional(),
  start_date: z.date(),
  end_date: z.date(),
  exception_type: z.enum(["holiday", "special_schedule", "cancellation"]),
  replacement_schedule_id: z.string().optional(),
});

type ScheduleExceptionFormValues = z.infer<typeof scheduleExceptionSchema>;

interface ScheduleExceptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: ScheduleExceptionFormValues) => Promise<void>;
  initialValues?: Partial<ScheduleExceptionFormValues>;
  weeklySchedules: Array<{ id: string; name: string }>;
}

export function ScheduleExceptionDialog({
  open,
  onOpenChange,
  onSave,
  initialValues,
  weeklySchedules,
}: ScheduleExceptionDialogProps) {
  const form = useForm<ScheduleExceptionFormValues>({
    resolver: zodResolver(scheduleExceptionSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      exception_type: "holiday",
    },
  });

  const onSubmit = async (values: ScheduleExceptionFormValues) => {
    try {
      await onSave(values);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving schedule exception:", error);
    }
  };

  const exceptionType = form.watch("exception_type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Schedule Exception" : "Create Schedule Exception"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exception Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter exception name" {...field} />
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < form.getValues("start_date")
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="exception_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exception Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exception type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="special_schedule">
                        Special Schedule
                      </SelectItem>
                      <SelectItem value="cancellation">Cancellation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {exceptionType === "special_schedule" && (
              <FormField
                control={form.control}
                name="replacement_schedule_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Replacement Schedule</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select replacement schedule" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {weeklySchedules.map((schedule) => (
                          <SelectItem key={schedule.id} value={schedule.id}>
                            {schedule.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit">Save Exception</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
