import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { OrganizationProvider } from "@/components/auth/OrganizationProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Timetable = lazy(() => import("./pages/Timetable"));
const Announcements = lazy(() => import("./pages/Announcements"));
const DeviceMonitoring = lazy(() => import("./pages/DeviceMonitoring"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Settings = lazy(() => import("./pages/Settings"));
function App() {
    return (_jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(OrganizationProvider, { children: _jsx(Suspense, { fallback: _jsx("div", { className: "flex h-screen w-screen items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" }) }), children: _jsxs(_Fragment, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/timetable", element: _jsx(ProtectedRoute, { children: _jsx(Timetable, {}) }) }), _jsx(Route, { path: "/announcements", element: _jsx(ProtectedRoute, { children: _jsx(Announcements, {}) }) }), _jsx(Route, { path: "/devices", element: _jsx(ProtectedRoute, { children: _jsx(DeviceMonitoring, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(ProtectedRoute, { children: _jsx(UserManagement, {}) }) }), _jsx(Route, { path: "/alerts", element: _jsx(ProtectedRoute, { children: _jsx(Alerts, {}) }) }), _jsx(Route, { path: "/settings", element: _jsx(ProtectedRoute, { children: _jsx(Settings, {}) }) }), import.meta.env.VITE_TEMPO === "true" && (_jsx(Route, { path: "/tempobook/*" }))] }), import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)] }) }) }) }) }));
}
export default App;
