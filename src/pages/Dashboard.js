import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { ScheduleTimeline } from "@/components/dashboard/ScheduleTimeline";
import { EmergencyPanel } from "@/components/dashboard/EmergencyPanel";
import { AnalyticsSummary } from "@/components/dashboard/AnalyticsSummary";
export function Dashboard() {
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(StatusOverview, {}), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "md:col-span-2", children: _jsx(ScheduleTimeline, {}) }), _jsx("div", { children: _jsx(EmergencyPanel, {}) })] }), _jsx(AnalyticsSummary, {})] }) }));
}
export default Dashboard;
