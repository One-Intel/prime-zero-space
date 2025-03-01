import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bell, ShieldAlert, Volume2 } from "lucide-react";
import { getAlerts, createAlert, resolveAlert } from "@/lib/api";
import { Database } from "@/types/supabase";

type Alert = Database["public"]["Tables"]["alerts"]["Row"];

interface EmergencyAlertProps {
  title: string;
  description: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
  onResolve?: () => void;
}

const EmergencyAlert = ({
  title,
  description,
  timestamp,
  severity,
  onResolve,
}: EmergencyAlertProps) => {
  const severityStyles = {
    low: "border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
    medium: "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20",
    high: "border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20",
  };

  const severityIcons = {
    low: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    medium: <AlertCircle className="h-4 w-4 text-orange-500" />,
    high: <AlertCircle className="h-4 w-4 text-red-500" />,
  };

  return (
    <div className={`mb-3 p-3 rounded-md ${severityStyles[severity]}`}>
      <div className="flex items-start gap-2">
        {severityIcons[severity]}
        <div className="flex-1">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs">{timestamp}</p>
            {onResolve && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={onResolve}
              >
                Resolve
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function EmergencyPanel() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEmergencyMode = async () => {
    setEmergencyMode(!emergencyMode);

    if (!emergencyMode) {
      // Create emergency alert when activating emergency mode
      try {
        await createAlert({
          title: "Emergency Mode Activated",
          description:
            "Emergency protocols have been activated by an administrator",
          severity: "high",
          resolved: false,
        });
        fetchAlerts();
      } catch (error) {
        console.error("Error creating emergency alert:", error);
      }
    }
  };

  const handleResolveAlert = async (id: string) => {
    try {
      await resolveAlert(id);
      fetchAlerts();
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return (
        date.toLocaleDateString([], { month: "short", day: "numeric" }) +
        `, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      );
    }
  };

  return (
    <Card
      className={`w-full h-full bg-card ${emergencyMode ? "border-red-500 shadow-red-100 dark:shadow-red-900/20" : ""}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-red-500" />
          Emergency Panel
        </CardTitle>
      </CardHeader>

      <CardContent>
        {emergencyMode && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Emergency Mode Active</AlertTitle>
            <AlertDescription>
              All emergency protocols are currently active. The system is in
              lockdown mode.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Recent Alerts</h3>
            <div className="max-h-[180px] overflow-y-auto pr-1">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : alerts.length > 0 ? (
                alerts
                  .filter((alert) => !alert.resolved)
                  .map((alert) => (
                    <EmergencyAlert
                      key={alert.id}
                      title={alert.title}
                      description={alert.description}
                      timestamp={formatTimestamp(alert.created_at)}
                      severity={alert.severity}
                      onResolve={() => handleResolveAlert(alert.id)}
                    />
                  ))
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No active alerts
                </div>
              )}

              {/* Show static alerts if no real alerts exist */}
              {!loading &&
                alerts.filter((alert) => !alert.resolved).length === 0 && (
                  <>
                    <EmergencyAlert
                      title="Temperature Warning"
                      description="Server room temperature exceeding normal range"
                      timestamp="Today, 10:23 AM"
                      severity="medium"
                    />
                    <EmergencyAlert
                      title="Network Connectivity Issue"
                      description="Building B experiencing intermittent connectivity"
                      timestamp="Today, 9:45 AM"
                      severity="low"
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button
          variant={emergencyMode ? "destructive" : "outline"}
          className="w-full"
          onClick={toggleEmergencyMode}
        >
          {emergencyMode
            ? "Deactivate Emergency Mode"
            : "Activate Emergency Mode"}
        </Button>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Volume2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EmergencyPanel;
