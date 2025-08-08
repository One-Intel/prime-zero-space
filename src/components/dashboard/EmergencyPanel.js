import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bell, ShieldAlert, Volume2 } from "lucide-react";
import { getAlerts, createAlert, resolveAlert } from "@/lib/api";
const EmergencyAlert = ({ title, description, timestamp, severity, onResolve, }) => {
    const severityStyles = {
        low: "border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
        medium: "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20",
        high: "border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20",
    };
    const severityIcons = {
        low: _jsx(AlertCircle, { className: "h-4 w-4 text-yellow-500" }),
        medium: _jsx(AlertCircle, { className: "h-4 w-4 text-orange-500" }),
        high: _jsx(AlertCircle, { className: "h-4 w-4 text-red-500" }),
    };
    return (_jsx("div", { className: `mb-3 p-3 rounded-md ${severityStyles[severity]}`, children: _jsxs("div", { className: "flex items-start gap-2", children: [severityIcons[severity], _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-sm font-medium", children: title }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: description }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsx("p", { className: "text-xs", children: timestamp }), onResolve && (_jsx(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs", onClick: onResolve, children: "Resolve" }))] })] })] }) }));
};
export function EmergencyPanel() {
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAlerts();
    }, []);
    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const data = await getAlerts();
            setAlerts(data);
        }
        catch (error) {
            console.error("Error fetching alerts:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const toggleEmergencyMode = async () => {
        setEmergencyMode(!emergencyMode);
        if (!emergencyMode) {
            // Create emergency alert when activating emergency mode
            try {
                await createAlert({
                    title: "Emergency Mode Activated",
                    description: "Emergency protocols have been activated by an administrator",
                    severity: "high",
                    resolved: false,
                });
                fetchAlerts();
            }
            catch (error) {
                console.error("Error creating emergency alert:", error);
            }
        }
    };
    const handleResolveAlert = async (id) => {
        try {
            await resolveAlert(id);
            fetchAlerts();
        }
        catch (error) {
            console.error("Error resolving alert:", error);
        }
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        if (isToday) {
            return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        }
        else {
            return (date.toLocaleDateString([], { month: "short", day: "numeric" }) +
                `, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
        }
    };
    return (_jsxs(Card, { className: `w-full h-full bg-card ${emergencyMode ? "border-red-500 shadow-red-100 dark:shadow-red-900/20" : ""}`, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(ShieldAlert, { className: "h-5 w-5 text-red-500" }), "Emergency Panel"] }) }), _jsxs(CardContent, { children: [emergencyMode && (_jsxs(Alert, { variant: "destructive", className: "mb-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Emergency Mode Active" }), _jsx(AlertDescription, { children: "All emergency protocols are currently active. The system is in lockdown mode." })] })), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("h3", { className: "text-sm font-medium", children: "Recent Alerts" }), _jsxs("div", { className: "max-h-[180px] overflow-y-auto pr-1", children: [loading ? (_jsx("div", { className: "flex justify-center py-4", children: _jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary" }) })) : alerts.length > 0 ? (alerts
                                            .filter((alert) => !alert.resolved)
                                            .map((alert) => (_jsx(EmergencyAlert, { title: alert.title, description: alert.description, timestamp: formatTimestamp(alert.created_at), severity: alert.severity, onResolve: () => handleResolveAlert(alert.id) }, alert.id)))) : (_jsx("div", { className: "text-center py-4 text-sm text-muted-foreground", children: "No active alerts" })), !loading &&
                                            alerts.filter((alert) => !alert.resolved).length === 0 && (_jsxs(_Fragment, { children: [_jsx(EmergencyAlert, { title: "Temperature Warning", description: "Server room temperature exceeding normal range", timestamp: "Today, 10:23 AM", severity: "medium" }), _jsx(EmergencyAlert, { title: "Network Connectivity Issue", description: "Building B experiencing intermittent connectivity", timestamp: "Today, 9:45 AM", severity: "low" })] }))] })] }) })] }), _jsxs(CardFooter, { className: "flex gap-2 pt-2", children: [_jsx(Button, { variant: emergencyMode ? "destructive" : "outline", className: "w-full", onClick: toggleEmergencyMode, children: emergencyMode
                            ? "Deactivate Emergency Mode"
                            : "Activate Emergency Mode" }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Bell, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Volume2, { className: "h-4 w-4" }) })] })] }));
}
export default EmergencyPanel;
