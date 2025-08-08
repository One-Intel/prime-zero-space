import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../layout/ThemeProvider';
import { useOrganization } from '../auth/OrganizationProvider';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from '../ui/use-toast';
export function ThemeSettings() {
    const { theme, setTheme } = useTheme();
    const { organization, updateOrganization } = useOrganization();
    const handleColorModeChange = (value) => {
        setTheme({ colorMode: value });
    };
    const handleColorChange = async (field, value) => {
        setTheme({ [field]: value });
        // If it's a primary or secondary color, update the organization settings too
        if (field === 'primaryColor' || field === 'secondaryColor') {
            try {
                await updateOrganization({
                    [field === 'primaryColor' ? 'primary_color' : 'secondary_color']: value
                });
                toast({
                    title: "Theme updated",
                    description: "Your organization's theme has been updated successfully."
                });
            }
            catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to update organization theme.",
                    variant: "destructive"
                });
            }
        }
    };
    return (_jsx(Card, { className: "p-6 space-y-6", children: _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Theme Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Color Mode" }), _jsxs(Select, { value: theme.colorMode, onValueChange: handleColorModeChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select color mode" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "light", children: "Light" }), _jsx(SelectItem, { value: "dark", children: "Dark" }), _jsx(SelectItem, { value: "system", children: "System" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Primary Color" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "color", value: theme.primaryColor, onChange: (e) => handleColorChange('primaryColor', e.target.value) }), _jsx(Input, { type: "text", value: theme.primaryColor, onChange: (e) => handleColorChange('primaryColor', e.target.value), placeholder: "#000000" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Secondary Color" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "color", value: theme.secondaryColor, onChange: (e) => handleColorChange('secondaryColor', e.target.value) }), _jsx(Input, { type: "text", value: theme.secondaryColor, onChange: (e) => handleColorChange('secondaryColor', e.target.value), placeholder: "#000000" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Accent Color" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "color", value: theme.accentColor, onChange: (e) => handleColorChange('accentColor', e.target.value) }), _jsx(Input, { type: "text", value: theme.accentColor, onChange: (e) => handleColorChange('accentColor', e.target.value), placeholder: "#000000" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Border Radius" }), _jsxs(Select, { value: theme.borderRadius, onValueChange: (value) => setTheme({ borderRadius: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select border radius" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "0", children: "None" }), _jsx(SelectItem, { value: "0.25rem", children: "Small" }), _jsx(SelectItem, { value: "0.5rem", children: "Medium" }), _jsx(SelectItem, { value: "1rem", children: "Large" }), _jsx(SelectItem, { value: "9999px", children: "Full" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Font Family" }), _jsxs(Select, { value: theme.fontFamily, onValueChange: (value) => setTheme({ fontFamily: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select font family" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "system-ui, -apple-system, sans-serif", children: "System UI" }), _jsx(SelectItem, { value: "'Inter', sans-serif", children: "Inter" }), _jsx(SelectItem, { value: "'Roboto', sans-serif", children: "Roboto" }), _jsx(SelectItem, { value: "'Open Sans', sans-serif", children: "Open Sans" })] })] })] }), _jsx("div", { className: "pt-4", children: _jsx(Button, { variant: "outline", onClick: () => {
                                    setTheme(theme);
                                    toast({
                                        title: "Theme Preview",
                                        description: "Changes are saved automatically."
                                    });
                                }, children: "Preview Changes" }) })] })] }) }));
}
