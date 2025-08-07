import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOrganization } from '../auth/OrganizationProvider';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '../ui/use-toast';
import { Skeleton } from '../ui/skeleton';
const organizationSchema = z.object({
    name: z.string().min(2).max(100),
    domain: z.string().min(3).max(100),
    contact_email: z.string().email(),
    contact_phone: z.string().optional(),
    timezone: z.string(),
    primary_color: z.string(),
    secondary_color: z.string(),
    logo_url: z.string().url().optional(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postal_code: z.string()
    }).optional()
});
export function OrganizationSettings() {
    const { organization, isLoading, updateOrganization } = useOrganization();
    const form = useForm({
        resolver: zodResolver(organizationSchema),
        defaultValues: organization || undefined
    });
    const onSubmit = async (data) => {
        try {
            await updateOrganization(data);
            toast({
                title: "Settings updated",
                description: "Your organization settings have been successfully updated."
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to update organization settings.",
                variant: "destructive"
            });
        }
    };
    if (isLoading) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-8 w-full" }), _jsx(Skeleton, { className: "h-8 w-full" }), _jsx(Skeleton, { className: "h-8 w-full" })] }));
    }
    return (_jsxs(Card, { className: "p-6", children: [_jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Organization Name" }), _jsx(Input, { ...form.register('name') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Domain" }), _jsx(Input, { ...form.register('domain') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Contact Email" }), _jsx(Input, { ...form.register('contact_email'), type: "email" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Contact Phone" }), _jsx(Input, { ...form.register('contact_phone'), type: "tel" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Timezone" }), _jsx(Input, { ...form.register('timezone') })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Primary Color" }), _jsx(Input, { ...form.register('primary_color'), type: "color" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Secondary Color" }), _jsx(Input, { ...form.register('secondary_color'), type: "color" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Logo URL" }), _jsx(Input, { ...form.register('logo_url'), type: "url" })] }), _jsx("div", { className: "pt-4", children: _jsx(Button, { type: "submit", children: "Save Changes" }) })] }), _jsxs("div", { className: "mt-6 border-t pt-6", children: [_jsx("h3", { className: "text-lg font-medium", children: "Subscription Information" }), _jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("p", { children: ["Tier: ", organization?.subscription_tier] }), _jsxs("p", { children: ["Users: ", organization?.max_users, " maximum"] }), _jsxs("p", { children: ["Devices: ", organization?.max_devices, " maximum"] }), organization?.subscription_ends_at && (_jsxs("p", { children: ["Expires: ", new Date(organization.subscription_ends_at).toLocaleDateString()] }))] })] })] }));
}
