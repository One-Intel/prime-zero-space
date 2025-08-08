import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LoginForm } from "@/components/auth/LoginForm";
export function Login() {
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-primary", children: "TI-BOT" }), _jsx("p", { className: "text-muted-foreground", children: "School Management System" })] }), _jsx(LoginForm, {})] }) }));
}
export default Login;
