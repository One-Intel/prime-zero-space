import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { ScheduleTimeline } from "@/components/dashboard/ScheduleTimeline";
import { EmergencyPanel } from "@/components/dashboard/EmergencyPanel";
import { AnalyticsSummary } from "@/components/dashboard/AnalyticsSummary";

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <StatusOverview />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ScheduleTimeline />
          </div>
          <div>
            <EmergencyPanel />
          </div>
        </div>

        <AnalyticsSummary />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
