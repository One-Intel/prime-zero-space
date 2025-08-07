import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
const templateFormSchema = z.object({
    name: z.string().min(1, "Template name is required"),
    description: z.string().optional(),
    is_active: z.boolean().default(false),
});
export function TimetableTemplateDialog({ open, onOpenChange, onSave, initialValues, }) {
    const form = useForm({
        resolver: zodResolver(templateFormSchema),
        defaultValues: initialValues || {
            name: "",
            description: "",
            is_active: false,
        },
    });
    const onSubmit = async (values) => {
        try {
            await onSave(values);
            onOpenChange(false);
            form.reset();
        }
        catch (error) {
            console.error("Error saving template:", error);
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: initialValues ? "Edit Template" : "Create Template" }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Template Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter template name", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter description", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "is_active", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-center justify-between rounded-lg border p-4", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(FormLabel, { className: "text-base", children: "Active Template" }), _jsx(FormDescription, { children: "Make this the active timetable template" })] }), _jsx(FormControl, { children: _jsx(Switch, { checked: field.value, onCheckedChange: field.onChange }) })] })) }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Save Template" }) })] }) })] }) }));
}
