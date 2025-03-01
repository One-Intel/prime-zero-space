import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Bell,
  Clock,
  Download,
  Globe,
  HardDrive,
  Lock,
  Save,
  Shield,
  User,
  Volume2,
  Wifi,
} from "lucide-react";

export function Settings() {
  // Check if dark mode is enabled in localStorage or system preference
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode || prefersDarkMode);

  // Apply dark mode when toggled and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState("en");
  const [volume, setVolume] = useState(80);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general system preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for the interface
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Localization</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">
                            Eastern Time (EST)
                          </SelectItem>
                          <SelectItem value="CST">
                            Central Time (CST)
                          </SelectItem>
                          <SelectItem value="MST">
                            Mountain Time (MST)
                          </SelectItem>
                          <SelectItem value="PST">
                            Pacific Time (PST)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select defaultValue="12h">
                        <SelectTrigger id="time-format">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">
                        Enable Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive system notifications and alerts
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
                <CardDescription>
                  Configure audio output and presets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Volume Controls</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="master-volume">Master Volume</Label>
                        <span className="text-sm">{volume}%</span>
                      </div>
                      <input
                        type="range"
                        id="master-volume"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="announcement-volume">
                        Announcement Volume
                      </Label>
                      <input
                        type="range"
                        id="announcement-volume"
                        min="0"
                        max="100"
                        defaultValue="90"
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="bell-volume">Bell Volume</Label>
                      <input
                        type="range"
                        id="bell-volume"
                        min="0"
                        max="100"
                        defaultValue="85"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Audio Presets</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure the 60 available audio presets for use in
                    announcements and schedules
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Preset Management</h4>
                      <div className="grid gap-2">
                        <Label htmlFor="preset-select">Select Preset</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="preset-select">
                            <SelectValue placeholder="Select preset" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] overflow-y-auto">
                            {Array.from({ length: 60 }, (_, i) => i + 1).map(
                              (num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  Preset {num}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2 mt-4">
                        <Label htmlFor="preset-name">Preset Name</Label>
                        <Input id="preset-name" defaultValue="Morning Bell" />
                      </div>

                      <div className="grid gap-2 mt-4">
                        <Label htmlFor="preset-file">Audio File</Label>
                        <div className="flex gap-2">
                          <Input
                            id="preset-file"
                            value="morning-bell.mp3"
                            readOnly
                            className="flex-1"
                          />
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button variant="outline" className="mr-2">
                          Test
                        </Button>
                        <Button>Upload New</Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Preset Library</h4>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {[
                          {
                            id: 1,
                            name: "Morning Bell",
                            file: "morning-bell.mp3",
                          },
                          {
                            id: 2,
                            name: "Class Change",
                            file: "class-change.mp3",
                          },
                          { id: 3, name: "Lunch Bell", file: "lunch-bell.mp3" },
                          {
                            id: 4,
                            name: "Dismissal Bell",
                            file: "dismissal.mp3",
                          },
                          {
                            id: 5,
                            name: "Emergency Tone",
                            file: "emergency.mp3",
                          },
                          { id: 6, name: "Fire Drill", file: "fire-drill.mp3" },
                          { id: 7, name: "Lockdown", file: "lockdown.mp3" },
                          { id: 8, name: "All Clear", file: "all-clear.mp3" },
                        ].map((preset) => (
                          <div
                            key={preset.id}
                            className="flex justify-between items-center p-2 border-b last:border-0"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {preset.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {preset.file}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Volume2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Settings</CardTitle>
                <CardDescription>
                  Configure network and connectivity options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Wireless Configuration
                  </h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="wifi-network">Wi-Fi Network</Label>
                      <div className="flex gap-2">
                        <Input
                          id="wifi-network"
                          value="School_Network"
                          className="flex-1"
                        />
                        <Button variant="outline">
                          <Wifi className="h-4 w-4 mr-2" /> Scan
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="wifi-password">Password</Label>
                      <Input
                        id="wifi-password"
                        type="password"
                        value="••••••••"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Connect</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically connect to known networks
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Network Status</h3>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-green-100 text-green-800">
                          <Wifi className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Connected</p>
                          <p className="text-sm text-muted-foreground">
                            School_Network
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Signal Strength</p>
                        <p className="text-sm text-muted-foreground">
                          Excellent (90%)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">IP Address</p>
                        <p className="text-sm text-muted-foreground">
                          192.168.1.105
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">MAC Address</p>
                        <p className="text-sm text-muted-foreground">
                          00:1A:2B:3C:4D:5E
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gateway</p>
                        <p className="text-sm text-muted-foreground">
                          192.168.1.1
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">DNS</p>
                        <p className="text-sm text-muted-foreground">
                          8.8.8.8, 8.8.4.4
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-auto">
                  <Globe className="mr-2 h-4 w-4" /> Test Connection
                </Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Access Control</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-password">
                        Administrator Password
                      </Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value="••••••••"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Require additional verification for admin access
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Logout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after period of inactivity
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Emergency Access</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emergency Override</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow emergency personnel to bypass security
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="emergency-code">
                        Emergency Access Code
                      </Label>
                      <Input id="emergency-code" value="9876" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Security</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically install security updates
                        </p>
                      </div>
                      <Switch
                        checked={autoUpdate}
                        onCheckedChange={setAutoUpdate}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Remote Access</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow remote management of the system
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-auto">
                  <Shield className="mr-2 h-4 w-4" /> Security Audit
                </Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system maintenance and backup options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Software Version</p>
                      <p className="text-sm text-muted-foreground">
                        TI-BOT v2.5.3
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Hardware Model</p>
                      <p className="text-sm text-muted-foreground">
                        TI-BOT Pro
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Serial Number</p>
                      <p className="text-sm text-muted-foreground">
                        TB-2023-78945612
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">
                        May 15, 2023
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Storage</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">System Storage</p>
                      <p className="text-sm text-muted-foreground">
                        45% used (9.0 GB / 20.0 GB)
                      </p>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label>Auto-Cleanup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically remove old logs and temporary files
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backup & Restore</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Create regular backups of system configuration
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="backup-location">Backup Location</Label>
                      <Select defaultValue="cloud">
                        <SelectTrigger id="backup-location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="network">Network Drive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <HardDrive className="mr-2 h-4 w-4" /> Backup Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Clock className="mr-2 h-4 w-4" /> Restore
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Factory Reset</h3>
                  <p className="text-sm text-muted-foreground">
                    Reset the system to factory defaults. This will erase all
                    data and settings.
                  </p>
                  <Button variant="destructive">
                    <AlertTriangle className="mr-2 h-4 w-4" /> Factory Reset
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
