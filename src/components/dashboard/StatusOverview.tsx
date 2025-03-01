import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Battery, Wifi, ThermometerSnowflake, Activity } from "lucide-react";
import { getDeviceStatus } from "@/lib/api";
import { Database } from "@/types/supabase";

type DeviceStatus = Database["public"]["Tables"]["device_status"]["Row"];

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: "normal" | "warning" | "critical";
}

const StatusItem = ({ icon, label, value, status }: StatusItemProps) => {
  const statusColors = {
    normal: "text-green-500",
    warning: "text-amber-500",
    critical: "text-red-500",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full bg-muted ${statusColors[status]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className={`text-sm ${statusColors[status]}`}>{value}</p>
      </div>
    </div>
  );
};

export function StatusOverview() {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetchDeviceStatus();

    // Refresh status every 30 seconds
    const interval = setInterval(fetchDeviceStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDeviceStatus = async () => {
    try {
      setLoading(true);
      const data = await getDeviceStatus();
      setDeviceStatus(data);

      // Format the last updated time
      const updatedDate = new Date(data.updated_at);
      setLastUpdated(
        `Today, ${updatedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      );
    } catch (error) {
      console.error("Error fetching device status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Determine status based on values
  const getBatteryStatus = (level: number) => {
    if (level > 50) return "normal";
    if (level > 20) return "warning";
    return "critical";
  };

  const getConnectivityStatus = (strength: string) => {
    if (strength === "Strong") return "normal";
    if (strength === "Moderate") return "warning";
    return "critical";
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 35) return "normal";
    if (temp < 40) return "warning";
    return "critical";
  };

  return (
    <Card className="w-full bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">TI-BOT Status</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Last updated: {loading ? "Loading..." : lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : deviceStatus ? (
              <>
                <StatusItem
                  icon={<Battery className="h-5 w-5" />}
                  label="Battery"
                  value={`${deviceStatus.battery}%`}
                  status={getBatteryStatus(deviceStatus.battery)}
                />
                <StatusItem
                  icon={<Wifi className="h-5 w-5" />}
                  label="Connectivity"
                  value={deviceStatus.connectivity}
                  status={getConnectivityStatus(deviceStatus.connectivity)}
                />
                <StatusItem
                  icon={<ThermometerSnowflake className="h-5 w-5" />}
                  label="Temperature"
                  value={`${deviceStatus.temperature}°C`}
                  status={getTemperatureStatus(deviceStatus.temperature)}
                />
                <StatusItem
                  icon={<Activity className="h-5 w-5" />}
                  label="System"
                  value={deviceStatus.system_status}
                  status={
                    deviceStatus.system_status === "Active"
                      ? "normal"
                      : "critical"
                  }
                />
              </>
            ) : (
              // Fallback static data if no data from API
              <>
                <StatusItem
                  icon={<Battery className="h-5 w-5" />}
                  label="Battery"
                  value="85%"
                  status="normal"
                />
                <StatusItem
                  icon={<Wifi className="h-5 w-5" />}
                  label="Connectivity"
                  value="Strong"
                  status="normal"
                />
                <StatusItem
                  icon={<ThermometerSnowflake className="h-5 w-5" />}
                  label="Temperature"
                  value="38°C"
                  status="warning"
                />
                <StatusItem
                  icon={<Activity className="h-5 w-5" />}
                  label="System"
                  value="Active"
                  status="normal"
                />
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatusOverview;
