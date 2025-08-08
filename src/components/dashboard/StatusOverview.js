import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Battery, Wifi, ThermometerSnowflake, Activity } from "lucide-react";
import { getDeviceStatus } from "@/lib/api";
const StatusItem = ({ icon, label, value, status }) => {
    const statusColors = {
        normal: "text-green-500",
        warning: "text-amber-500",
        critical: "text-red-500",
    };
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-full bg-muted ${statusColors[status]}`, children: icon }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: label }), _jsx("p", { className: `text-sm ${statusColors[status]}`, children: value })] })] }));
};
export function StatusOverview() {
    const [deviceStatus, setDeviceStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");
    useEffect(() => {
        fetchDeviceStatus();
        // Refresh status every 30 seconds
        const interval = setInterval(fetchDeviceStatus, 30000);
        return () => clearInterval(interval);
    }, []);
    const fetchDeviceStatus = async () => {
        try {
            setLoading(true);
            const data = await getDeviceStatus();
            setDeviceStatus(data);
            // Format the last updated time
            const updatedDate = new Date(data.updated_at);
            setLastUpdated(`Today, ${updatedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
        }
        catch (error) {
            console.error("Error fetching device status:", error);
        }
        finally {
            setLoading(false);
        }
    };
    // Determine status based on values
    const getBatteryStatus = (level) => {
        if (level > 50)
            return "normal";
        if (level > 20)
            return "warning";
        return "critical";
    };
    const getConnectivityStatus = (strength) => {
        if (strength === "Strong")
            return "normal";
        if (strength === "Moderate")
            return "warning";
        return "critical";
    };
    const getTemperatureStatus = (temp) => {
        if (temp < 35)
            return "normal";
        if (temp < 40)
            return "warning";
        return "critical";
    };
    return (_jsx(Card, { className: "w-full bg-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between gap-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "TI-BOT Status" }), _jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: ["Last updated: ", loading ? "Loading..." : lastUpdated] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6", children: loading ? (_jsx("div", { className: "col-span-full flex justify-center py-4", children: _jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary" }) })) : deviceStatus ? (_jsxs(_Fragment, { children: [_jsx(StatusItem, { icon: _jsx(Battery, { className: "h-5 w-5" }), label: "Battery", value: `${deviceStatus.battery}%`, status: getBatteryStatus(deviceStatus.battery) }), _jsx(StatusItem, { icon: _jsx(Wifi, { className: "h-5 w-5" }), label: "Connectivity", value: deviceStatus.connectivity, status: getConnectivityStatus(deviceStatus.connectivity) }), _jsx(StatusItem, { icon: _jsx(ThermometerSnowflake, { className: "h-5 w-5" }), label: "Temperature", value: `${deviceStatus.temperature}°C`, status: getTemperatureStatus(deviceStatus.temperature) }), _jsx(StatusItem, { icon: _jsx(Activity, { className: "h-5 w-5" }), label: "System", value: deviceStatus.system_status, status: deviceStatus.system_status === "Active"
                                        ? "normal"
                                        : "critical" })] })) : (
                        // Fallback static data if no data from API
                        _jsxs(_Fragment, { children: [_jsx(StatusItem, { icon: _jsx(Battery, { className: "h-5 w-5" }), label: "Battery", value: "85%", status: "normal" }), _jsx(StatusItem, { icon: _jsx(Wifi, { className: "h-5 w-5" }), label: "Connectivity", value: "Strong", status: "normal" }), _jsx(StatusItem, { icon: _jsx(ThermometerSnowflake, { className: "h-5 w-5" }), label: "Temperature", value: "38\u00B0C", status: "warning" }), _jsx(StatusItem, { icon: _jsx(Activity, { className: "h-5 w-5" }), label: "System", value: "Active", status: "normal" })] })) })] }) }) }));
}
export default StatusOverview;
