import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Bell, Clock, CheckCircle, } from "lucide-react";
const AnalyticCard = ({ title, value, change, icon }) => {
    const isPositive = change >= 0;
    return (_jsxs("div", { className: "bg-card rounded-lg border p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: title }), _jsx("p", { className: "text-2xl font-bold mt-1", children: value })] }), _jsx("div", { className: "p-2 rounded-full bg-primary/10 text-primary", children: icon })] }), _jsxs("div", { className: "flex items-center mt-3", children: [_jsxs("div", { className: `flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`, children: [isPositive ? (_jsx(ArrowUpRight, { className: "h-4 w-4 mr-1" })) : (_jsx(ArrowDownRight, { className: "h-4 w-4 mr-1" })), _jsxs("span", { className: "text-xs font-medium", children: [Math.abs(change), "%"] })] }), _jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "vs last week" })] })] }));
};
export function AnalyticsSummary() {
    return (_jsx(Card, { className: "w-full bg-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(AnalyticCard, { title: "Active Users", value: "248", change: 12, icon: _jsx(Users, { className: "h-5 w-5" }) }), _jsx(AnalyticCard, { title: "Announcements", value: "32", change: -5, icon: _jsx(Bell, { className: "h-5 w-5" }) }), _jsx(AnalyticCard, { title: "Uptime", value: "99.8%", change: 0.2, icon: _jsx(Clock, { className: "h-5 w-5" }) }), _jsx(AnalyticCard, { title: "Tasks Completed", value: "156", change: 24, icon: _jsx(CheckCircle, { className: "h-5 w-5" }) })] }) }) }));
}
export default AnalyticsSummary;
