import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Battery,
  Wifi,
  ThermometerSnowflake,
  Activity,
  Cpu,
  HardDrive,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  MessageSquare,
  Volume2,
} from "lucide-react";

interface DiagnosticItem {
  id: string;
  name: string;
  status: "normal" | "warning" | "critical";
  value: string;
  timestamp: string;
}

interface LogItem {
  id: string;
  type: "info" | "warning" | "error";
  message: string;
  timestamp: string;
}

export function DeviceMonitoring() {
  const [activeTab, setActiveTab] = useState("status");
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);

  const [diagnosticItems, setDiagnosticItems] = useState<DiagnosticItem[]>([
    {
      id: "1",
      name: "CPU Temperature",
      status: "normal",
      value: "45°C",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "2",
      name: "Memory Usage",
      status: "warning",
      value: "85%",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "3",
      name: "Storage",
      status: "normal",
      value: "45% used",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "4",
      name: "Network Latency",
      status: "normal",
      value: "15ms",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "5",
      name: "Battery Health",
      status: "normal",
      value: "Good",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "6",
      name: "Speaker System",
      status: "critical",
      value: "Fault Detected",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "7",
      name: "Microphone",
      status: "normal",
      value: "Operational",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "8",
      name: "Software Version",
      status: "warning",
      value: "Update Available",
      timestamp: "2023-06-01T10:15:00",
    },
  ]);

  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: "1",
      type: "info",
      message: "System startup completed successfully",
      timestamp: "2023-06-01T08:00:00",
    },
    {
      id: "2",
      type: "info",
      message: "Morning announcements broadcast initiated",
      timestamp: "2023-06-01T08:15:00",
    },
    {
      id: "3",
      type: "info",
      message: "Morning announcements broadcast completed",
      timestamp: "2023-06-01T08:20:00",
    },
    {
      id: "4",
      type: "warning",
      message: "Memory usage exceeding 80% threshold",
      timestamp: "2023-06-01T09:45:00",
    },
    {
      id: "5",
      type: "error",
      message: "Speaker system fault detected in Building B",
      timestamp: "2023-06-01T10:10:00",
    },
    {
      id: "6",
      type: "info",
      message: "Scheduled system diagnostic initiated",
      timestamp: "2023-06-01T10:15:00",
    },
    {
      id: "7",
      type: "info",
      message: "Diagnostic completed: 2 issues found",
      timestamp: "2023-06-01T10:18:00",
    },
    {
      id: "8",
      type: "warning",
      message: "Software update available: v2.5.3",
      timestamp: "2023-06-01T10:20:00",
    },
  ]);

  useEffect(() => {
    const fetchDiagnosticData = async () => {
      try {
        // In a real production app, this would be uncommented
        // const items = await fetchData<DiagnosticItem>('diagnostic_items');
        // const logItems = await fetchData<LogItem>('system_logs');
        // if (items.length > 0) setDiagnosticItems(items);
        // if (logItems.length > 0) setLogs(logItems);
        console.log("Fetching diagnostic data from database...");
      } catch (error) {
        console.error("Error fetching diagnostic data:", error);
      }
    };
    fetchDiagnosticData();
  }, []);

  const runDiagnostic = () => {
    setIsRunningDiagnostic(true);
    setDiagnosticProgress(0);

    const interval = setInterval(() => {
      setDiagnosticProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningDiagnostic(false);
          // Add a new log entry
          const newLog: LogItem = {
            id: Math.random().toString(36).substr(2, 9),
            type: "info",
            message: "Manual diagnostic completed",
            timestamp: new Date().toISOString(),
          };
          setLogs([newLog, ...logs]);
          // In a production app, we would sync this to the database
          // await syncData('system_logs', [newLog]);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "warning":
        return "text-amber-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Normal
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Warning
          </Badge>
        );
      case "critical":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Critical
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case "info":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Device Monitoring</h1>
          <Button onClick={runDiagnostic} disabled={isRunningDiagnostic}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {isRunningDiagnostic ? "Running Diagnostic..." : "Run Diagnostic"}
          </Button>
        </div>

        {isRunningDiagnostic && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Diagnostic in progress...</span>
                  <span>{diagnosticProgress}%</span>
                </div>
                <Progress value={diagnosticProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Battery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <Battery className="h-10 w-10 text-green-500 mb-2" />
                <span className="text-2xl font-bold">85%</span>
                <span className="text-xs text-muted-foreground">
                  Estimated 8 hours remaining
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Connectivity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <Wifi className="h-10 w-10 text-green-500 mb-2" />
                <span className="text-2xl font-bold">Strong</span>
                <span className="text-xs text-muted-foreground">
                  5GHz - 867 Mbps
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <ThermometerSnowflake className="h-10 w-10 text-amber-500 mb-2" />
                <span className="text-2xl font-bold">38°C</span>
                <span className="text-xs text-muted-foreground">
                  Warning: Above normal range
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <Activity className="h-10 w-10 text-green-500 mb-2" />
                <span className="text-2xl font-bold">Active</span>
                <span className="text-xs text-muted-foreground">
                  All systems operational
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="status" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="status">System Status</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Status Overview</CardTitle>
                <CardDescription>
                  Current status of all TI-BOT systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Hardware</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-5 w-5 text-muted-foreground" />
                          <span>Processor</span>
                        </div>
                        <span className="text-green-500">Normal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-5 w-5 text-muted-foreground" />
                          <span>Memory</span>
                        </div>
                        <span className="text-amber-500">
                          Warning (85% used)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-5 w-5 text-muted-foreground" />
                          <span>Storage</span>
                        </div>
                        <span className="text-green-500">
                          Normal (45% used)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-5 w-5 text-muted-foreground" />
                          <span>Speaker System</span>
                        </div>
                        <span className="text-red-500">
                          Critical (Fault Detected)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Software</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-muted-foreground" />
                          <span>Operating System</span>
                        </div>
                        <span className="text-green-500">Normal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          <span>Announcement System</span>
                        </div>
                        <span className="text-green-500">Normal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>Scheduling System</span>
                        </div>
                        <span className="text-green-500">Normal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-5 w-5 text-muted-foreground" />
                          <span>Software Version</span>
                        </div>
                        <span className="text-amber-500">
                          Update Available (v2.5.3)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Last updated: Today at 10:45 AM
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="diagnostics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Diagnostics</CardTitle>
                <CardDescription>
                  Detailed diagnostic information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {diagnosticItems.map((item) => (
                    <div key={item.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full bg-muted ${getStatusColor(item.status)}`}
                          >
                            {item.name.includes("CPU") ||
                            item.name.includes("Processor") ? (
                              <Cpu className="h-4 w-4" />
                            ) : item.name.includes("Memory") ? (
                              <Cpu className="h-4 w-4" />
                            ) : item.name.includes("Storage") ? (
                              <HardDrive className="h-4 w-4" />
                            ) : item.name.includes("Network") ||
                              item.name.includes("Connectivity") ? (
                              <Wifi className="h-4 w-4" />
                            ) : item.name.includes("Battery") ? (
                              <Battery className="h-4 w-4" />
                            ) : item.name.includes("Speaker") ||
                              item.name.includes("Microphone") ? (
                              <Volume2 className="h-4 w-4" />
                            ) : item.name.includes("Software") ||
                              item.name.includes("Version") ? (
                              <Activity className="h-4 w-4" />
                            ) : (
                              <Wrench className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Last checked: {formatDate(item.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">
                            {item.value}
                          </span>
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={runDiagnostic}
                  disabled={isRunningDiagnostic}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Diagnostic
                </Button>
                <Button variant="outline">
                  <Wrench className="mr-2 h-4 w-4" />
                  Troubleshoot Issues
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  Historical system activity and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {logs.map((log) => (
                      <div key={log.id} className="border-b pb-4">
                        <div className="flex items-start gap-3">
                          {getLogIcon(log.type)}
                          <div className="flex-1">
                            <p className="text-sm">{log.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(log.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Export Logs
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
                <CardDescription>
                  System maintenance and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          Software Update Available
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Version 2.5.3 is available for installation
                        </p>
                        <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                          <li>Improved announcement scheduling system</li>
                          <li>Fixed audio quality issues in Building C</li>
                          <li>Enhanced security features</li>
                          <li>Performance optimizations</li>
                        </ul>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Pending
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        View Details
                      </Button>
                      <Button size="sm">Install Update</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          Speaker System Maintenance Required
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Hardware fault detected in Building B speakers
                        </p>
                        <p className="text-sm mt-2">
                          Recommended action: Schedule technician visit
                        </p>
                      </div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        Critical
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        Troubleshoot
                      </Button>
                      <Button size="sm">Schedule Repair</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Routine Maintenance</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Next scheduled maintenance: June 15, 2023
                        </p>
                        <p className="text-sm mt-2">
                          System will be offline from 10:00 PM to 11:00 PM
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Scheduled
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

export default DeviceMonitoring;
