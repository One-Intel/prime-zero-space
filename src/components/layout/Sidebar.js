import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { LayoutDashboard, Calendar, MessageSquare, MonitorSmartphone, Users, Settings, Bell, LogOut, } from "lucide-react";
const SidebarItem = ({ icon, label, href, active, onClick, }) => {
    return (_jsxs(Link, { to: href, className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent", active ? "bg-accent text-accent-foreground" : "text-muted-foreground"), onClick: onClick, children: [icon, _jsx("span", { children: label })] }));
};
export function Sidebar() {
    const location = useLocation();
    const { signOut } = useAuth();
    const activeRoute = location.pathname;
    const handleLogout = async (e) => {
        e.preventDefault();
        await signOut();
    };
    return (_jsxs("div", { className: "w-[280px] h-full border-r bg-card flex flex-col", children: [_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-primary", children: "TI-BOT" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "School Management System" })] }), _jsx("div", { className: "px-3 py-2 flex-1 overflow-y-auto", children: _jsxs("div", { className: "space-y-1", children: [_jsx(SidebarItem, { icon: _jsx(LayoutDashboard, { size: 18 }), label: "Dashboard", href: "/", active: activeRoute === "/" }), _jsx(SidebarItem, { icon: _jsx(Calendar, { size: 18 }), label: "Timetable", href: "/timetable", active: activeRoute === "/timetable" }), _jsx(SidebarItem, { icon: _jsx(MessageSquare, { size: 18 }), label: "Announcements", href: "/announcements", active: activeRoute === "/announcements" }), _jsx(SidebarItem, { icon: _jsx(MonitorSmartphone, { size: 18 }), label: "Device Monitoring", href: "/devices", active: activeRoute === "/devices" }), _jsx(SidebarItem, { icon: _jsx(Users, { size: 18 }), label: "User Management", href: "/users", active: activeRoute === "/users" }), _jsx(SidebarItem, { icon: _jsx(Bell, { size: 18 }), label: "Alerts", href: "/alerts", active: activeRoute === "/alerts" }), _jsx(SidebarItem, { icon: _jsx(Settings, { size: 18 }), label: "Settings", href: "/settings", active: activeRoute === "/settings" })] }) }), _jsx("div", { className: "border-t p-3 mt-auto", children: _jsx(SidebarItem, { icon: _jsx(LogOut, { size: 18 }), label: "Logout", href: "/logout", onClick: handleLogout }) })] }));
}
export default Sidebar;
