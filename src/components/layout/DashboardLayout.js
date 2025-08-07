import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
export function DashboardLayout({ children = _jsx("div", { children: "Dashboard Content" }), }) {
    return (_jsxs("div", { className: "flex h-screen bg-background", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 overflow-y-auto p-6", children: children })] })] }));
}
export default DashboardLayout;
