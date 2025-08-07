import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
const scheduleExceptionSchema = z.object({
    name: z.string().min(1, "Exception name is required"),
    description: z.string().optional(),
    start_date: z.date(),
    end_date: z.date(),
    exception_type: z.enum(["holiday", "special_schedule", "cancellation"]),
    replacement_schedule_id: z.string().optional(),
});
export function ScheduleExceptionDialog({ open, onOpenChange, onSave, initialValues, weeklySchedules, }) {
    const form = useForm({
        resolver: zodResolver(scheduleExceptionSchema),
        defaultValues: initialValues || {
            name: "",
            description: "",
            start_date: new Date(),
            end_date: new Date(),
            exception_type: "holiday",
        },
    });
    const onSubmit = async (values) => {
        try {
            await onSave(values);
            onOpenChange(false);
            form.reset();
        }
        catch (error) {
            console.error("Error saving schedule exception:", error);
        }
    };
    const exceptionType = form.watch("exception_type");
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: initialValues ? "Edit Schedule Exception" : "Create Schedule Exception" }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Exception Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter exception name", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter description", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "start_date", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Start Date" }), _jsx(FormControl, { children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: field.onChange }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "end_date", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "End Date" }), _jsx(FormControl, { children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: field.onChange, disabled: (date) => date < form.getValues("start_date") }) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "exception_type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Exception Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select exception type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "holiday", children: "Holiday" }), _jsx(SelectItem, { value: "special_schedule", children: "Special Schedule" }), _jsx(SelectItem, { value: "cancellation", children: "Cancellation" })] })] }), _jsx(FormMessage, {})] })) }), exceptionType === "special_schedule" && (_jsx(FormField, { control: form.control, name: "replacement_schedule_id", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Replacement Schedule" }), _jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select replacement schedule" }) }) }), _jsx(SelectContent, { children: weeklySchedules.map((schedule) => (_jsx(SelectItem, { value: schedule.id, children: schedule.name }, schedule.id))) })] }), _jsx(FormMessage, {})] })) })), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Save Exception" }) })] }) })] }) }));
}
