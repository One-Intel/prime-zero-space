import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Bell,
  Clock,
  CheckCircle,
} from "lucide-react";

interface AnalyticCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const AnalyticCard = ({ title, value, change, icon }: AnalyticCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div
          className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 mr-1" />
          )}
          <span className="text-xs font-medium">{Math.abs(change)}%</span>
        </div>
        <span className="text-xs text-muted-foreground ml-2">vs last week</span>
      </div>
    </div>
  );
};

export function AnalyticsSummary() {
  return (
    <Card className="w-full bg-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticCard
            title="Active Users"
            value="248"
            change={12}
            icon={<Users className="h-5 w-5" />}
          />
          <AnalyticCard
            title="Announcements"
            value="32"
            change={-5}
            icon={<Bell className="h-5 w-5" />}
          />
          <AnalyticCard
            title="Uptime"
            value="99.8%"
            change={0.2}
            icon={<Clock className="h-5 w-5" />}
          />
          <AnalyticCard
            title="Tasks Completed"
            value="156"
            change={24}
            icon={<CheckCircle className="h-5 w-5" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AnalyticsSummary;
