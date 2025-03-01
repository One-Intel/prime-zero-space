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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Settings,
  X,
} from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  source: "system" | "user" | "device";
  status: "active" | "resolved" | "acknowledged";
  createdAt: string;
  resolvedAt?: string;
}

export function Alerts() {
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // In a real production app, this would be uncommented
        // const data = await fetchData<Alert>('alerts');
        // if (data.length > 0) {
        //   setAlerts(data);
        // }
        console.log("Fetching alerts from database...");
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Temperature Warning",
      description: "Server room temperature exceeding normal range",
      severity: "medium",
      source: "device",
      status: "active",
      createdAt: "2023-06-01T10:23:00",
    },
    {
      id: "2",
      title: "Network Connectivity Issue",
      description: "Building B experiencing intermittent connectivity",
      severity: "low",
      source: "system",
      status: "active",
      createdAt: "2023-06-01T09:45:00",
    },
    {
      id: "3",
      title: "Speaker System Fault",
      description: "Hardware fault detected in Building B speakers",
      severity: "high",
      source: "device",
      status: "acknowledged",
      createdAt: "2023-06-01T10:10:00",
    },
    {
      id: "4",
      title: "Software Update Available",
      description: "Critical security update pending installation",
      severity: "low",
      source: "system",
      status: "resolved",
      createdAt: "2023-05-31T16:30:00",
      resolvedAt: "2023-06-01T09:15:00",
    },
    {
      id: "5",
      title: "Emergency Mode Activated",
      description:
        "Emergency protocols have been activated by an administrator",
      severity: "high",
      source: "user",
      status: "resolved",
      createdAt: "2023-05-31T14:20:00",
      resolvedAt: "2023-05-31T14:45:00",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleCreateAlert = async (alert: Alert) => {
    try {
      setAlerts([alert, ...alerts]);
      setIsDialogOpen(false);
      // In a real production app, this would be uncommented
      // await syncData('alerts', [{
      //   title: alert.title,
      //   description: alert.description,
      //   severity: alert.severity,
      //   source: alert.source,
      //   status: alert.status
      // }]);
      console.log("Adding new alert to database:", alert);
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  const handleResolveAlert = async (id: string) => {
    try {
      const updatedAlerts = alerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "resolved",
              resolvedAt: new Date().toISOString(),
            }
          : alert,
      );
      setAlerts(updatedAlerts);

      // In a real production app, this would be uncommented
      // await updateData('alerts', id, {
      //   status: "resolved",
      //   resolved_at: new Date().toISOString()
      // });
      console.log("Resolving alert in database:", id);
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  const handleAcknowledgeAlert = async (id: string) => {
    try {
      setAlerts(
        alerts.map((alert) =>
          alert.id === id ? { ...alert, status: "acknowledged" } : alert,
        ),
      );

      // In a real production app, this would be uncommented
      // await updateData('alerts', id, { status: "acknowledged" });
      console.log("Acknowledging alert in database:", id);
    } catch (error) {
      console.error("Error acknowledging alert:", error);
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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            High
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Active
          </Badge>
        );
      case "acknowledged":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Acknowledged
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Resolved
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alert Management</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {}}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Alert
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>
              Monitor and manage system alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={severityFilter}
                  onValueChange={setSeverityFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>{formatDate(alert.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        {alert.status === "active" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Acknowledge
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Resolve
                            </Button>
                          </div>
                        )}
                        {alert.status === "acknowledged" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        )}
                        {alert.status === "resolved" && (
                          <span className="text-sm text-muted-foreground">
                            Resolved on {formatDate(alert.resolvedAt || "")}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAlerts.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-6 text-muted-foreground"
                      >
                        No alerts found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="settings">
          <TabsList>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notification Rules</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
                <CardDescription>
                  Configure alert thresholds and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Thresholds</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label>Temperature Warning Threshold</Label>
                          <div className="flex gap-2">
                            <Input type="number" defaultValue="35" />
                            <span className="flex items-center">°C</span>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Temperature Critical Threshold</Label>
                          <div className="flex gap-2">
                            <Input type="number" defaultValue="40" />
                            <span className="flex items-center">°C</span>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Battery Warning Level</Label>
                          <div className="flex gap-2">
                            <Input type="number" defaultValue="20" />
                            <span className="flex items-center">%</span>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Memory Usage Warning</Label>
                          <div className="flex gap-2">
                            <Input type="number" defaultValue="80" />
                            <span className="flex items-center">%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Alert Behavior</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label>Auto-acknowledge Low Severity</Label>
                          <Select defaultValue="false">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Enabled</SelectItem>
                              <SelectItem value="false">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Auto-resolve Acknowledged Alerts</Label>
                          <Select defaultValue="24">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="12">After 12 hours</SelectItem>
                              <SelectItem value="24">After 24 hours</SelectItem>
                              <SelectItem value="48">After 48 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Alert Retention Period</Label>
                          <Select defaultValue="30">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="14">14 days</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Rules</CardTitle>
                <CardDescription>
                  Configure who gets notified for different alert types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Alert Type</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Notify</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Temperature Alerts</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              High
                            </Badge>
                          </TableCell>
                          <TableCell>All Administrators</TableCell>
                          <TableCell>Email, SMS</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Network Connectivity</TableCell>
                          <TableCell>
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                              Medium
                            </Badge>
                          </TableCell>
                          <TableCell>IT Department</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>System Updates</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              Low
                            </Badge>
                          </TableCell>
                          <TableCell>System Administrator</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Emergency Alerts</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              High
                            </Badge>
                          </TableCell>
                          <TableCell>All Staff</TableCell>
                          <TableCell>Email, SMS, Push</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" /> Add Rule
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>
                  View historical alerts and their resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts
                    .filter((alert) => alert.status === "resolved")
                    .sort(
                      (a, b) =>
                        new Date(b.resolvedAt || "").getTime() -
                        new Date(a.resolvedAt || "").getTime(),
                    )
                    .map((alert) => (
                      <div
                        key={alert.id}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              alert.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : alert.severity === "medium"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{alert.title}</h4>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(alert.createdAt)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm">
                                Resolved on {formatDate(alert.resolvedAt || "")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Alert Title</Label>
                <Input id="title" placeholder="Enter alert title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter alert description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="severity">Severity</Label>
                <Select defaultValue="low">
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button
                onClick={() =>
                  handleCreateAlert({
                    id: Math.random().toString(36).substr(2, 9),
                    title: "Manual Alert", // In a real app, this would come from the form
                    description: "Alert created manually by administrator",
                    severity: "medium",
                    source: "user",
                    status: "active",
                    createdAt: new Date().toISOString(),
                  })
                }
              >
                <Bell className="mr-2 h-4 w-4" /> Create Alert
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default Alerts;
