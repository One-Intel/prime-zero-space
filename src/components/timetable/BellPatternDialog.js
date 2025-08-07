import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
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
export function BellPatternDialog({ open, onOpenChange, onSave, initialValues, audioPresets, }) {
    const [sequenceItems, setSequenceItems] = useState(initialValues?.sequence.map((preset, index) => ({
        preset,
        interval: initialValues.interval_seconds?.[index] || 0,
    })) || []);
    const form = useForm({
        resolver: zodResolver(bellPatternSchema),
        defaultValues: initialValues || {
            name: "",
            description: "",
            pattern_type: "single",
            sequence: [],
            interval_seconds: [],
        },
    });
    const onSubmit = async (values) => {
        try {
            await onSave({
                ...values,
                sequence: sequenceItems.map(item => item.preset),
                interval_seconds: sequenceItems.map(item => item.interval),
            });
            onOpenChange(false);
            form.reset();
        }
        catch (error) {
            console.error("Error saving bell pattern:", error);
        }
    };
    const addSequenceItem = () => {
        setSequenceItems([...sequenceItems, { preset: audioPresets[0].id, interval: 0 }]);
    };
    const removeSequenceItem = (index) => {
        setSequenceItems(sequenceItems.filter((_, i) => i !== index));
    };
    const updateSequenceItem = (index, field, value) => {
        setSequenceItems(sequenceItems.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: initialValues ? "Edit Bell Pattern" : "Create Bell Pattern" }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Pattern Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter pattern name", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter description", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "pattern_type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Pattern Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select pattern type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "single", children: "Single Sound" }), _jsx(SelectItem, { value: "sequence", children: "Sound Sequence" }), _jsx(SelectItem, { value: "custom", children: "Custom Pattern" })] })] }), _jsx(FormMessage, {})] })) }), form.watch("pattern_type") !== "single" && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(FormLabel, { children: "Sound Sequence" }), _jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addSequenceItem, children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Sound"] })] }), _jsx("div", { className: "space-y-4", children: sequenceItems.map((item, index) => (_jsxs("div", { className: "flex items-center gap-4 p-4 border rounded-lg", children: [_jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground" }), _jsxs("div", { className: "flex-1 grid grid-cols-2 gap-4", children: [_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Sound" }), _jsxs(Select, { value: item.preset.toString(), onValueChange: (value) => updateSequenceItem(index, "preset", parseInt(value)), children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select sound" }) }) }), _jsx(SelectContent, { children: audioPresets.map((preset) => (_jsx(SelectItem, { value: preset.id.toString(), children: preset.name }, preset.id))) })] })] }), _jsxs(FormItem, { children: [_jsxs(FormLabel, { children: ["Interval (seconds): ", item.interval] }), _jsx(Slider, { value: [item.interval], min: 0, max: 60, step: 1, onValueChange: ([value]) => updateSequenceItem(index, "interval", value) })] })] }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => removeSequenceItem(index), children: _jsx(X, { className: "w-4 h-4" }) })] }, index))) })] })), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Save Pattern" }) })] }) })] }) }));
}
