import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, Link } from "react-router-dom";
import { Bell, Search, User, Settings, LogOut, Building2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useOrganization } from "@/components/auth/OrganizationProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
export function Header() {
    const location = useLocation();
    const { user, signOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const { organization } = useOrganization();
    // Determine page title based on current route
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === "/")
            return "Dashboard";
        if (path === "/timetable")
            return "Interactive Timetable";
        if (path === "/announcements")
            return "Announcement System";
        if (path === "/devices")
            return "Device Monitoring";
        if (path === "/users")
            return "User Management";
        if (path === "/alerts")
            return "Alerts";
        if (path === "/settings")
            return "Settings";
        return "Dashboard";
    };
    return (_jsxs("header", { className: "h-20 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-50", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h1", { className: "text-xl font-semibold", children: getPageTitle() }), organization && (_jsxs(Badge, { variant: "outline", className: "hidden md:flex", children: [_jsx(Building2, { className: "w-3 h-3 mr-1" }), organization.name] }))] }), _jsxs("div", { className: "relative hidden lg:flex items-center", children: [_jsx(Search, { className: "absolute left-3 h-4 w-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search...", className: "pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-background w-[300px] xl:w-[400px] focus:outline-none focus:ring-2 focus:ring-ring" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => setTheme({ colorMode: theme.colorMode === 'dark' ? 'light' : 'dark' }), className: "hidden md:flex", children: theme.colorMode === 'dark' ? (_jsx(Moon, { className: "h-5 w-5" })) : (_jsx(Sun, { className: "h-5 w-5" })) }), _jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(Bell, { className: "h-5 w-5" }), _jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "relative h-9 w-9 rounded-full", children: _jsxs(Avatar, { className: "h-9 w-9", children: [_jsx(AvatarImage, { src: user?.avatar_url, alt: user?.name }), _jsx(AvatarFallback, { children: user?.name?.[0]?.toUpperCase() })] }) }) }), _jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [_jsx(DropdownMenuLabel, { className: "font-normal", children: _jsxs("div", { className: "flex flex-col space-y-1", children: [_jsx("p", { className: "text-sm font-medium leading-none", children: user?.name }), _jsx("p", { className: "text-xs leading-none text-muted-foreground", children: user?.email })] }) }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/settings", className: "cursor-pointer", children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Settings" })] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-destructive focus:text-destructive", onClick: () => signOut(), children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Log out" })] })] })] })] })] }));
    _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "4" }), _jsx("path", { d: "M12 2v2" }), _jsx("path", { d: "M12 20v2" }), _jsx("path", { d: "m4.93 4.93 1.41 1.41" }), _jsx("path", { d: "m17.66 17.66 1.41 1.41" }), _jsx("path", { d: "M2 12h2" }), _jsx("path", { d: "M20 12h2" }), _jsx("path", { d: "m6.34 17.66-1.41 1.41" }), _jsx("path", { d: "m19.07 4.93-1.41 1.41" })] });
    (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }) }));
}
Button >
    (_jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(Bell, { className: "h-5 w-5" }), _jsx("span", { className: "absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" })] })
        ,
            _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "hidden md:block text-right", children: [_jsx("p", { className: "text-sm font-medium", children: user?.user_metadata?.name || "Admin User" }), _jsx("p", { className: "text-xs text-muted-foreground", children: user?.email || "admin@school.edu" })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", children: _jsx(User, { className: "h-5 w-5" }) })] }));
div >
;
header >
;
;
export default Header;
