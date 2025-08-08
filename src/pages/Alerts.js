import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { AlertTriangle, Bell, CheckCircle2, Clock, Plus, RefreshCw, Search, Settings, X, } from "lucide-react";
export function Alerts() {
    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                // In a real production app, this would be uncommented
                // const data = await fetchData<Alert>('alerts');
                // if (data.length > 0) {
                //   setAlerts(data);
                // }
                console.log("Fetching alerts from database...");
            }
            catch (error) {
                console.error("Error fetching alerts:", error);
            }
        };
        fetchAlerts();
    }, []);
    const [alerts, setAlerts] = useState([
        {
            id: "1",
            title: "Temperature Warning",
            description: "Server room temperature exceeding normal range",
            severity: "medium",
            source: "device",
            status: "active",
            createdAt: "2023-06-01T10:23:00",
        },
        {
            id: "2",
            title: "Network Connectivity Issue",
            description: "Building B experiencing intermittent connectivity",
            severity: "low",
            source: "system",
            status: "active",
            createdAt: "2023-06-01T09:45:00",
        },
        {
            id: "3",
            title: "Speaker System Fault",
            description: "Hardware fault detected in Building B speakers",
            severity: "high",
            source: "device",
            status: "acknowledged",
            createdAt: "2023-06-01T10:10:00",
        },
        {
            id: "4",
            title: "Software Update Available",
            description: "Critical security update pending installation",
            severity: "low",
            source: "system",
            status: "resolved",
            createdAt: "2023-05-31T16:30:00",
            resolvedAt: "2023-06-01T09:15:00",
        },
        {
            id: "5",
            title: "Emergency Mode Activated",
            description: "Emergency protocols have been activated by an administrator",
            severity: "high",
            source: "user",
            status: "resolved",
            createdAt: "2023-05-31T14:20:00",
            resolvedAt: "2023-05-31T14:45:00",
        },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [severityFilter, setSeverityFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const handleCreateAlert = async (alert) => {
        try {
            setAlerts([alert, ...alerts]);
            setIsDialogOpen(false);
            // In a real production app, this would be uncommented
            // await syncData('alerts', [{
            //   title: alert.title,
            //   description: alert.description,
            //   severity: alert.severity,
            //   source: alert.source,
            //   status: alert.status
            // }]);
            console.log("Adding new alert to database:", alert);
        }
        catch (error) {
            console.error("Error creating alert:", error);
        }
    };
    const handleResolveAlert = async (id) => {
        try {
            const updatedAlerts = alerts.map((alert) => alert.id === id
                ? {
                    ...alert,
                    status: "resolved",
                    resolvedAt: new Date().toISOString(),
                }
                : alert);
            setAlerts(updatedAlerts);
            // In a real production app, this would be uncommented
            // await updateData('alerts', id, {
            //   status: "resolved",
            //   resolved_at: new Date().toISOString()
            // });
            console.log("Resolving alert in database:", id);
        }
        catch (error) {
            console.error("Error resolving alert:", error);
        }
    };
    const handleAcknowledgeAlert = async (id) => {
        try {
            setAlerts(alerts.map((alert) => alert.id === id ? { ...alert, status: "acknowledged" } : alert));
            // In a real production app, this would be uncommented
            // await updateData('alerts', id, { status: "acknowledged" });
            console.log("Acknowledging alert in database:", id);
        }
        catch (error) {
            console.error("Error acknowledging alert:", error);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (date.toLocaleDateString() +
            " at " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    const getSeverityBadge = (severity) => {
        switch (severity) {
            case "low":
                return (_jsx(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: "Low" }));
            case "medium":
                return (_jsx(Badge, { className: "bg-orange-100 text-orange-800 hover:bg-orange-100", children: "Medium" }));
            case "high":
                return (_jsx(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: "High" }));
            default:
                return _jsx(Badge, { children: "Unknown" });
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return (_jsx(Badge, { className: "bg-blue-100 text-blue-800 hover:bg-blue-100", children: "Active" }));
            case "acknowledged":
                return (_jsx(Badge, { className: "bg-purple-100 text-purple-800 hover:bg-purple-100", children: "Acknowledged" }));
            case "resolved":
                return (_jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "Resolved" }));
            default:
                return _jsx(Badge, { children: "Unknown" });
        }
    };
    const filteredAlerts = alerts.filter((alert) => {
        const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
        const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
        return matchesSearch && matchesSeverity && matchesStatus;
    });
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Alert Management" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", onClick: () => { }, children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), " Refresh"] }), _jsxs(Button, { onClick: () => setIsDialogOpen(true), children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Create Alert"] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Alerts" }), _jsx(CardDescription, { children: "Monitor and manage system alerts and notifications" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search alerts...", className: "pl-9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Select, { value: severityFilter, onValueChange: setSeverityFilter, children: [_jsx(SelectTrigger, { className: "w-[140px]", children: _jsx(SelectValue, { placeholder: "Severity" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Severities" }), _jsx(SelectItem, { value: "low", children: "Low" }), _jsx(SelectItem, { value: "medium", children: "Medium" }), _jsx(SelectItem, { value: "high", children: "High" })] })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-[140px]", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Statuses" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "acknowledged", children: "Acknowledged" }), _jsx(SelectItem, { value: "resolved", children: "Resolved" })] })] })] })] }), _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Alert" }), _jsx(TableHead, { children: "Severity" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Created" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsxs(TableBody, { children: [filteredAlerts.map((alert) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: alert.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: alert.description })] }) }), _jsx(TableCell, { children: getSeverityBadge(alert.severity) }), _jsx(TableCell, { children: getStatusBadge(alert.status) }), _jsx(TableCell, { children: formatDate(alert.createdAt) }), _jsxs(TableCell, { className: "text-right", children: [alert.status === "active" && (_jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleAcknowledgeAlert(alert.id), children: "Acknowledge" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => handleResolveAlert(alert.id), children: "Resolve" })] })), alert.status === "acknowledged" && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleResolveAlert(alert.id), children: "Resolve" })), alert.status === "resolved" && (_jsxs("span", { className: "text-sm text-muted-foreground", children: ["Resolved on ", formatDate(alert.resolvedAt || "")] }))] })] }, alert.id))), filteredAlerts.length === 0 && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "text-center py-6 text-muted-foreground", children: "No alerts found matching your criteria" }) }))] })] }) })] })] }), _jsxs(Tabs, { defaultValue: "settings", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "settings", children: "Alert Settings" }), _jsx(TabsTrigger, { value: "notifications", children: "Notification Rules" }), _jsx(TabsTrigger, { value: "history", children: "Alert History" })] }), _jsx(TabsContent, { value: "settings", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Alert Settings" }), _jsx(CardDescription, { children: "Configure alert thresholds and notification preferences" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "System Thresholds" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Temperature Warning Threshold" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "number", defaultValue: "35" }), _jsx("span", { className: "flex items-center", children: "\u00B0C" })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Temperature Critical Threshold" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "number", defaultValue: "40" }), _jsx("span", { className: "flex items-center", children: "\u00B0C" })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Battery Warning Level" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "number", defaultValue: "20" }), _jsx("span", { className: "flex items-center", children: "%" })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Memory Usage Warning" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "number", defaultValue: "80" }), _jsx("span", { className: "flex items-center", children: "%" })] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Alert Behavior" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Auto-acknowledge Low Severity" }), _jsxs(Select, { defaultValue: "false", children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "true", children: "Enabled" }), _jsx(SelectItem, { value: "false", children: "Disabled" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Auto-resolve Acknowledged Alerts" }), _jsxs(Select, { defaultValue: "24", children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "never", children: "Never" }), _jsx(SelectItem, { value: "12", children: "After 12 hours" }), _jsx(SelectItem, { value: "24", children: "After 24 hours" }), _jsx(SelectItem, { value: "48", children: "After 48 hours" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Alert Retention Period" }), _jsxs(Select, { defaultValue: "30", children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "7", children: "7 days" }), _jsx(SelectItem, { value: "14", children: "14 days" }), _jsx(SelectItem, { value: "30", children: "30 days" }), _jsx(SelectItem, { value: "90", children: "90 days" })] })] })] })] })] })] }) }) }), _jsxs(CardFooter, { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", children: "Reset to Defaults" }), _jsx(Button, { children: "Save Settings" })] })] }) }), _jsx(TabsContent, { value: "notifications", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Notification Rules" }), _jsx(CardDescription, { children: "Configure who gets notified for different alert types" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Alert Type" }), _jsx(TableHead, { children: "Severity" }), _jsx(TableHead, { children: "Notify" }), _jsx(TableHead, { children: "Method" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { children: "Temperature Alerts" }), _jsx(TableCell, { children: _jsx(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: "High" }) }), _jsx(TableCell, { children: "All Administrators" }), _jsx(TableCell, { children: "Email, SMS" }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) }) })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Network Connectivity" }), _jsx(TableCell, { children: _jsx(Badge, { className: "bg-orange-100 text-orange-800 hover:bg-orange-100", children: "Medium" }) }), _jsx(TableCell, { children: "IT Department" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) }) })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "System Updates" }), _jsx(TableCell, { children: _jsx(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: "Low" }) }), _jsx(TableCell, { children: "System Administrator" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) }) })] }), _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Emergency Alerts" }), _jsx(TableCell, { children: _jsx(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: "High" }) }), _jsx(TableCell, { children: "All Staff" }), _jsx(TableCell, { children: "Email, SMS, Push" }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) }) })] })] })] }) }) }) }), _jsx(CardFooter, { children: _jsxs(Button, { className: "ml-auto", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Add Rule"] }) })] }) }), _jsx(TabsContent, { value: "history", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Alert History" }), _jsx(CardDescription, { children: "View historical alerts and their resolution" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: alerts
                                                .filter((alert) => alert.status === "resolved")
                                                .sort((a, b) => new Date(b.resolvedAt || "").getTime() -
                                                new Date(a.resolvedAt || "").getTime())
                                                .map((alert) => (_jsx("div", { className: "border-b pb-4 last:border-0 last:pb-0", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `p-2 rounded-full ${alert.severity === "high"
                                                                ? "bg-red-100 text-red-800"
                                                                : alert.severity === "medium"
                                                                    ? "bg-orange-100 text-orange-800"
                                                                    : "bg-yellow-100 text-yellow-800"}`, children: _jsx(AlertTriangle, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h4", { className: "font-medium", children: alert.title }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm text-muted-foreground", children: formatDate(alert.createdAt) })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: alert.description }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" }), _jsxs("span", { className: "text-sm", children: ["Resolved on ", formatDate(alert.resolvedAt || "")] })] })] })] }) }, alert.id))) }) })] }) })] }), _jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create New Alert" }) }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Alert Title" }), _jsx(Input, { id: "title", placeholder: "Enter alert title" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Input, { id: "description", placeholder: "Enter alert description" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "severity", children: "Severity" }), _jsxs(Select, { defaultValue: "low", children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select severity" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "low", children: "Low" }), _jsx(SelectItem, { value: "medium", children: "Medium" }), _jsx(SelectItem, { value: "high", children: "High" })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsDialogOpen(false), children: [_jsx(X, { className: "mr-2 h-4 w-4" }), " Cancel"] }), _jsxs(Button, { onClick: () => handleCreateAlert({
                                            id: Math.random().toString(36).substr(2, 9),
                                            title: "Manual Alert", // In a real app, this would come from the form
                                            description: "Alert created manually by administrator",
                                            severity: "medium",
                                            source: "user",
                                            status: "active",
                                            createdAt: new Date().toISOString(),
                                        }), children: [_jsx(Bell, { className: "mr-2 h-4 w-4" }), " Create Alert"] })] })] }) })] }) }));
}
export default Alerts;
