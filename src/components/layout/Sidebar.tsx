import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  MonitorSmartphone,
  Users,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  href,
  active,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  const activeRoute = location.pathname;

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className="w-[280px] h-full border-r bg-card flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">TI-BOT</h2>
        <p className="text-xs text-muted-foreground">
          School Management System
        </p>
      </div>

      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            href="/"
            active={activeRoute === "/"}
          />
          <SidebarItem
            icon={<Calendar size={18} />}
            label="Timetable"
            href="/timetable"
            active={activeRoute === "/timetable"}
          />
          <SidebarItem
            icon={<MessageSquare size={18} />}
            label="Announcements"
            href="/announcements"
            active={activeRoute === "/announcements"}
          />
          <SidebarItem
            icon={<MonitorSmartphone size={18} />}
            label="Device Monitoring"
            href="/devices"
            active={activeRoute === "/devices"}
          />
          <SidebarItem
            icon={<Users size={18} />}
            label="User Management"
            href="/users"
            active={activeRoute === "/users"}
          />
          <SidebarItem
            icon={<Bell size={18} />}
            label="Alerts"
            href="/alerts"
            active={activeRoute === "/alerts"}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            href="/settings"
            active={activeRoute === "/settings"}
          />
        </div>
      </div>

      <div className="border-t p-3 mt-auto">
        <SidebarItem
          icon={<LogOut size={18} />}
          label="Logout"
          href="/logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Sidebar;
