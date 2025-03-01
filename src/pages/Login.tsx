import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">TI-BOT</h1>
          <p className="text-muted-foreground">School Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
