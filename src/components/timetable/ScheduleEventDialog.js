import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
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
];
const scheduleEventSchema = z.object({
    title: z.string().min(1, "Event title is required"),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    location: z.string().min(1, "Location is required"),
    type: z.enum(["announcement", "bell", "activity"]),
    audioPreset: z.number().optional(),
    repeat_pattern: z.array(z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])),
});
export function ScheduleEventDialog({ open, onOpenChange, onSave, initialValues, audioPresets = [], }) {
    const form = useForm({
        resolver: zodResolver(scheduleEventSchema),
        defaultValues: initialValues || {
            title: "",
            time: "",
            location: "",
            type: "bell",
            repeat_pattern: [],
        },
    });
    const onSubmit = async (values) => {
        try {
            await onSave(values);
            onOpenChange(false);
            form.reset();
        }
        catch (error) {
            console.error("Error saving event:", error);
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: initialValues ? "Edit Schedule Event" : "Add Schedule Event" }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Event Title" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter event title", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "time", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Time" }), _jsx(FormControl, { children: _jsx(Input, { type: "time", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "location", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Location" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter location", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Event Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select event type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "bell", children: "Bell" }), _jsx(SelectItem, { value: "announcement", children: "Announcement" }), _jsx(SelectItem, { value: "activity", children: "Activity" })] })] }), _jsx(FormMessage, {})] })) }), audioPresets.length > 0 && (_jsx(FormField, { control: form.control, name: "audioPreset", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Audio Preset" }), _jsxs(Select, { onValueChange: (value) => field.onChange(Number(value)), value: field.value?.toString(), children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select audio preset" }) }) }), _jsx(SelectContent, { children: audioPresets.map((preset) => (_jsx(SelectItem, { value: preset.id.toString(), children: preset.name }, preset.id))) })] }), _jsx(FormMessage, {})] })) })), _jsx(FormField, { control: form.control, name: "repeat_pattern", render: () => (_jsxs(FormItem, { children: [_jsxs("div", { className: "mb-4", children: [_jsx(FormLabel, { className: "text-base", children: "Repeat Pattern" }), _jsx(FormDescription, { children: "Select the days when this event should occur" })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: DAYS_OF_WEEK.map((day, index) => {
                                                const dayCode = day.slice(0, 3).toUpperCase();
                                                return (_jsx(FormField, { control: form.control, name: "repeat_pattern", render: ({ field }) => {
                                                        return (_jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: field.value?.includes(dayCode), onCheckedChange: (checked) => {
                                                                            const values = checked
                                                                                ? [...field.value, dayCode]
                                                                                : field.value?.filter((value) => value !== dayCode);
                                                                            field.onChange(values);
                                                                        } }) }), _jsx(FormLabel, { className: "font-normal", children: day })] }, day));
                                                    } }, day));
                                            }) }), _jsx(FormMessage, {})] })) }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Save Event" }) })] }) })] }) }));
}
