import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Battery, Wifi, ThermometerSnowflake, Activity, Cpu, HardDrive, Wrench, AlertTriangle, CheckCircle2, Clock, RefreshCw, MessageSquare, Volume2, } from "lucide-react";
export function DeviceMonitoring() {
    const [activeTab, setActiveTab] = useState("status");
    const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
    const [diagnosticProgress, setDiagnosticProgress] = useState(0);
    const [diagnosticItems, setDiagnosticItems] = useState([
        {
            id: "1",
            name: "CPU Temperature",
            status: "normal",
            value: "45°C",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "2",
            name: "Memory Usage",
            status: "warning",
            value: "85%",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "3",
            name: "Storage",
            status: "normal",
            value: "45% used",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "4",
            name: "Network Latency",
            status: "normal",
            value: "15ms",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "5",
            name: "Battery Health",
            status: "normal",
            value: "Good",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "6",
            name: "Speaker System",
            status: "critical",
            value: "Fault Detected",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "7",
            name: "Microphone",
            status: "normal",
            value: "Operational",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "8",
            name: "Software Version",
            status: "warning",
            value: "Update Available",
            timestamp: "2023-06-01T10:15:00",
        },
    ]);
    const [logs, setLogs] = useState([
        {
            id: "1",
            type: "info",
            message: "System startup completed successfully",
            timestamp: "2023-06-01T08:00:00",
        },
        {
            id: "2",
            type: "info",
            message: "Morning announcements broadcast initiated",
            timestamp: "2023-06-01T08:15:00",
        },
        {
            id: "3",
            type: "info",
            message: "Morning announcements broadcast completed",
            timestamp: "2023-06-01T08:20:00",
        },
        {
            id: "4",
            type: "warning",
            message: "Memory usage exceeding 80% threshold",
            timestamp: "2023-06-01T09:45:00",
        },
        {
            id: "5",
            type: "error",
            message: "Speaker system fault detected in Building B",
            timestamp: "2023-06-01T10:10:00",
        },
        {
            id: "6",
            type: "info",
            message: "Scheduled system diagnostic initiated",
            timestamp: "2023-06-01T10:15:00",
        },
        {
            id: "7",
            type: "info",
            message: "Diagnostic completed: 2 issues found",
            timestamp: "2023-06-01T10:18:00",
        },
        {
            id: "8",
            type: "warning",
            message: "Software update available: v2.5.3",
            timestamp: "2023-06-01T10:20:00",
        },
    ]);
    useEffect(() => {
        const fetchDiagnosticData = async () => {
            try {
                // In a real production app, this would be uncommented
                // const items = await fetchData<DiagnosticItem>('diagnostic_items');
                // const logItems = await fetchData<LogItem>('system_logs');
                // if (items.length > 0) setDiagnosticItems(items);
                // if (logItems.length > 0) setLogs(logItems);
                console.log("Fetching diagnostic data from database...");
            }
            catch (error) {
                console.error("Error fetching diagnostic data:", error);
            }
        };
        fetchDiagnosticData();
    }, []);
    const runDiagnostic = () => {
        setIsRunningDiagnostic(true);
        setDiagnosticProgress(0);
        const interval = setInterval(() => {
            setDiagnosticProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsRunningDiagnostic(false);
                    // Add a new log entry
                    const newLog = {
                        id: Math.random().toString(36).substr(2, 9),
                        type: "info",
                        message: "Manual diagnostic completed",
                        timestamp: new Date().toISOString(),
                    };
                    setLogs([newLog, ...logs]);
                    // In a production app, we would sync this to the database
                    // await syncData('system_logs', [newLog]);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "normal":
                return "text-green-500";
            case "warning":
                return "text-amber-500";
            case "critical":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "normal":
                return (_jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "Normal" }));
            case "warning":
                return (_jsx(Badge, { className: "bg-amber-100 text-amber-800 hover:bg-amber-100", children: "Warning" }));
            case "critical":
                return (_jsx(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: "Critical" }));
            default:
                return _jsx(Badge, { children: "Unknown" });
        }
    };
    const getLogIcon = (type) => {
        switch (type) {
            case "info":
                return _jsx(CheckCircle2, { className: "h-4 w-4 text-blue-500" });
            case "warning":
                return _jsx(AlertTriangle, { className: "h-4 w-4 text-amber-500" });
            case "error":
                return _jsx(AlertTriangle, { className: "h-4 w-4 text-red-500" });
            default:
                return _jsx(CheckCircle2, { className: "h-4 w-4" });
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (date.toLocaleDateString() +
            " at " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Device Monitoring" }), _jsxs(Button, { onClick: runDiagnostic, disabled: isRunningDiagnostic, children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), isRunningDiagnostic ? "Running Diagnostic..." : "Run Diagnostic"] })] }), isRunningDiagnostic && (_jsx(Card, { className: "mb-6", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm font-medium", children: [_jsx("span", { children: "Diagnostic in progress..." }), _jsxs("span", { children: [diagnosticProgress, "%"] })] }), _jsx(Progress, { value: diagnosticProgress, className: "h-2" })] }) }) })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Battery" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(Battery, { className: "h-10 w-10 text-green-500 mb-2" }), _jsx("span", { className: "text-2xl font-bold", children: "85%" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Estimated 8 hours remaining" })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Connectivity" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(Wifi, { className: "h-10 w-10 text-green-500 mb-2" }), _jsx("span", { className: "text-2xl font-bold", children: "Strong" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "5GHz - 867 Mbps" })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Temperature" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(ThermometerSnowflake, { className: "h-10 w-10 text-amber-500 mb-2" }), _jsx("span", { className: "text-2xl font-bold", children: "38\u00B0C" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Warning: Above normal range" })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "System Status" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(Activity, { className: "h-10 w-10 text-green-500 mb-2" }), _jsx("span", { className: "text-2xl font-bold", children: "Active" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "All systems operational" })] }) })] })] }), _jsxs(Tabs, { defaultValue: "status", onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "status", children: "System Status" }), _jsx(TabsTrigger, { value: "diagnostics", children: "Diagnostics" }), _jsx(TabsTrigger, { value: "logs", children: "Logs" }), _jsx(TabsTrigger, { value: "maintenance", children: "Maintenance" })] }), _jsx(TabsContent, { value: "status", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "System Status Overview" }), _jsx(CardDescription, { children: "Current status of all TI-BOT systems" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Hardware" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Cpu, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Processor" })] }), _jsx("span", { className: "text-green-500", children: "Normal" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Cpu, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Memory" })] }), _jsx("span", { className: "text-amber-500", children: "Warning (85% used)" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HardDrive, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Storage" })] }), _jsx("span", { className: "text-green-500", children: "Normal (45% used)" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Volume2, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Speaker System" })] }), _jsx("span", { className: "text-red-500", children: "Critical (Fault Detected)" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Software" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Operating System" })] }), _jsx("span", { className: "text-green-500", children: "Normal" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageSquare, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Announcement System" })] }), _jsx("span", { className: "text-green-500", children: "Normal" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Scheduling System" })] }), _jsx("span", { className: "text-green-500", children: "Normal" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { children: "Software Version" })] }), _jsx("span", { className: "text-amber-500", children: "Update Available (v2.5.3)" })] })] })] })] }) }), _jsx(CardFooter, { children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Last updated: Today at 10:45 AM" }) })] }) }), _jsx(TabsContent, { value: "diagnostics", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "System Diagnostics" }), _jsx(CardDescription, { children: "Detailed diagnostic information" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: diagnosticItems.map((item) => (_jsx("div", { className: "border rounded-md p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-full bg-muted ${getStatusColor(item.status)}`, children: item.name.includes("CPU") ||
                                                                        item.name.includes("Processor") ? (_jsx(Cpu, { className: "h-4 w-4" })) : item.name.includes("Memory") ? (_jsx(Cpu, { className: "h-4 w-4" })) : item.name.includes("Storage") ? (_jsx(HardDrive, { className: "h-4 w-4" })) : item.name.includes("Network") ||
                                                                        item.name.includes("Connectivity") ? (_jsx(Wifi, { className: "h-4 w-4" })) : item.name.includes("Battery") ? (_jsx(Battery, { className: "h-4 w-4" })) : item.name.includes("Speaker") ||
                                                                        item.name.includes("Microphone") ? (_jsx(Volume2, { className: "h-4 w-4" })) : item.name.includes("Software") ||
                                                                        item.name.includes("Version") ? (_jsx(Activity, { className: "h-4 w-4" })) : (_jsx(Wrench, { className: "h-4 w-4" })) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: item.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Last checked: ", formatDate(item.timestamp)] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-sm font-medium", children: item.value }), getStatusBadge(item.status)] })] }) }, item.id))) }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsxs(Button, { variant: "outline", onClick: runDiagnostic, disabled: isRunningDiagnostic, children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Run Diagnostic"] }), _jsxs(Button, { variant: "outline", children: [_jsx(Wrench, { className: "mr-2 h-4 w-4" }), "Troubleshoot Issues"] })] })] }) }), _jsx(TabsContent, { value: "logs", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "System Logs" }), _jsx(CardDescription, { children: "Historical system activity and events" })] }), _jsx(CardContent, { children: _jsx(ScrollArea, { className: "h-[400px] pr-4", children: _jsx("div", { className: "space-y-4", children: logs.map((log) => (_jsx("div", { className: "border-b pb-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [getLogIcon(log.type), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm", children: log.message }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(log.timestamp) })] })] }) }, log.id))) }) }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: "outline", className: "w-full", children: "Export Logs" }) })] }) }), _jsx(TabsContent, { value: "maintenance", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Maintenance" }), _jsx(CardDescription, { children: "System maintenance and updates" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Software Update Available" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Version 2.5.3 is available for installation" }), _jsxs("ul", { className: "text-sm mt-2 space-y-1 list-disc list-inside", children: [_jsx("li", { children: "Improved announcement scheduling system" }), _jsx("li", { children: "Fixed audio quality issues in Building C" }), _jsx("li", { children: "Enhanced security features" }), _jsx("li", { children: "Performance optimizations" })] })] }), _jsx(Badge, { className: "bg-amber-100 text-amber-800 hover:bg-amber-100", children: "Pending" })] }), _jsxs("div", { className: "flex justify-end mt-4", children: [_jsx(Button, { variant: "outline", size: "sm", className: "mr-2", children: "View Details" }), _jsx(Button, { size: "sm", children: "Install Update" })] })] }), _jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Speaker System Maintenance Required" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Hardware fault detected in Building B speakers" }), _jsx("p", { className: "text-sm mt-2", children: "Recommended action: Schedule technician visit" })] }), _jsx(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: "Critical" })] }), _jsxs("div", { className: "flex justify-end mt-4", children: [_jsx(Button, { variant: "outline", size: "sm", className: "mr-2", children: "Troubleshoot" }), _jsx(Button, { size: "sm", children: "Schedule Repair" })] })] }), _jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Routine Maintenance" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Next scheduled maintenance: June 15, 2023" }), _jsx("p", { className: "text-sm mt-2", children: "System will be offline from 10:00 PM to 11:00 PM" })] }), _jsx(Badge, { className: "bg-blue-100 text-blue-800 hover:bg-blue-100", children: "Scheduled" })] }), _jsxs("div", { className: "flex justify-end mt-4", children: [_jsx(Button, { variant: "outline", size: "sm", className: "mr-2", children: "View Details" }), _jsx(Button, { variant: "outline", size: "sm", children: "Reschedule" })] })] })] }) })] }) })] })] }) }));
}
export default DeviceMonitoring;
