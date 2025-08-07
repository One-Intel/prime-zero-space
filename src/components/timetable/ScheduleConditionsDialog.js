import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const scheduleConditionSchema = z.object({
    condition_type: z.enum(["weather", "temperature", "attendance", "custom"]),
    operator: z.enum(["equals", "not_equals", "greater_than", "less_than", "between"]),
    value: z.any(),
    action: z.enum(["skip", "delay", "alternate", "notify"]),
    action_params: z.record(z.string(), z.any()).optional(),
});
export function ScheduleConditionsDialog({ open, onOpenChange, onSave, initialValues, scheduleItem, }) {
    const form = useForm({
        resolver: zodResolver(scheduleConditionSchema),
        defaultValues: initialValues || {
            condition_type: "weather",
            operator: "equals",
            value: "",
            action: "skip",
        },
    });
    const onSubmit = async (values) => {
        try {
            await onSave(values);
            onOpenChange(false);
            form.reset();
        }
        catch (error) {
            console.error("Error saving condition:", error);
        }
    };
    const renderValueInput = () => {
        const type = form.watch("condition_type");
        const operator = form.watch("operator");
        switch (type) {
            case "weather":
                return (_jsxs(Select, { onValueChange: (value) => form.setValue("value", value), value: form.getValues("value"), children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select weather condition" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "sunny", children: "Sunny" }), _jsx(SelectItem, { value: "rainy", children: "Rainy" }), _jsx(SelectItem, { value: "cloudy", children: "Cloudy" }), _jsx(SelectItem, { value: "stormy", children: "Stormy" })] })] }));
            case "temperature":
                return operator === "between" ? (_jsxs("div", { className: "flex gap-4", children: [_jsx(Input, { type: "number", placeholder: "Min temperature", onChange: (e) => form.setValue("value", {
                                ...form.getValues("value"),
                                min: parseFloat(e.target.value),
                            }) }), _jsx(Input, { type: "number", placeholder: "Max temperature", onChange: (e) => form.setValue("value", {
                                ...form.getValues("value"),
                                max: parseFloat(e.target.value),
                            }) })] })) : (_jsx(Input, { type: "number", placeholder: "Temperature value", onChange: (e) => form.setValue("value", parseFloat(e.target.value)) }));
            case "attendance":
                return (_jsx(Input, { type: "number", placeholder: "Attendance percentage", onChange: (e) => form.setValue("value", parseFloat(e.target.value)) }));
            default:
                return (_jsx(Input, { placeholder: "Custom value", onChange: (e) => form.setValue("value", e.target.value) }));
        }
    };
    const renderActionParams = () => {
        const action = form.watch("action");
        switch (action) {
            case "delay":
                return (_jsx(FormField, { control: form.control, name: "action_params.delay_minutes", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Delay Duration (minutes)" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", ...field }) }), _jsx(FormMessage, {})] })) }));
            case "alternate":
                return (_jsx(FormField, { control: form.control, name: "action_params.alternate_event", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Alternative Event" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }));
            case "notify":
                return (_jsx(FormField, { control: form.control, name: "action_params.notification_message", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Notification Message" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }));
            default:
                return null;
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { children: ["Add Condition for ", scheduleItem.title] }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "condition_type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Condition Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select condition type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "weather", children: "Weather" }), _jsx(SelectItem, { value: "temperature", children: "Temperature" }), _jsx(SelectItem, { value: "attendance", children: "Attendance" }), _jsx(SelectItem, { value: "custom", children: "Custom" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "operator", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Operator" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select operator" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "equals", children: "Equals" }), _jsx(SelectItem, { value: "not_equals", children: "Not Equals" }), _jsx(SelectItem, { value: "greater_than", children: "Greater Than" }), _jsx(SelectItem, { value: "less_than", children: "Less Than" }), _jsx(SelectItem, { value: "between", children: "Between" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "value", render: () => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Value" }), _jsx(FormControl, { children: renderValueInput() }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "action", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Action" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select action" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "skip", children: "Skip Event" }), _jsx(SelectItem, { value: "delay", children: "Delay Event" }), _jsx(SelectItem, { value: "alternate", children: "Use Alternative" }), _jsx(SelectItem, { value: "notify", children: "Send Notification" })] })] }), _jsx(FormMessage, {})] })) }), renderActionParams(), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Save Condition" }) })] }) })] }) }));
}
