import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
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
  Mic,
  Volume2,
  Clock,
  Send,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  History,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "text" | "voice";
  audience: string;
  scheduled: boolean;
  scheduledTime?: string;
  status: "draft" | "sent" | "scheduled";
  timestamp: string;
}

export function Announcements() {
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // In a real production app, this would be uncommented
        // const data = await fetchData<Announcement>('announcements');
        // if (data.length > 0) {
        //   setAnnouncements(data);
        // }
        console.log("Fetching announcements from database...");
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Morning Announcements",
      message:
        "Good morning students! Today's lunch menu includes pizza, salad, and fruit.",
      type: "text",
      audience: "All Students",
      scheduled: false,
      status: "sent",
      timestamp: "2023-06-01T08:00:00",
    },
    {
      id: "2",
      title: "Early Dismissal",
      message:
        "Reminder: School will dismiss at 1:30 PM tomorrow due to teacher in-service.",
      type: "text",
      audience: "All Students and Parents",
      scheduled: true,
      scheduledTime: "2023-06-02T12:00:00",
      status: "scheduled",
      timestamp: "2023-06-01T15:30:00",
    },
    {
      id: "3",
      title: "Fire Drill",
      message:
        "A fire drill will be conducted today at 11:00 AM. Please follow standard procedures.",
      type: "voice",
      audience: "All Buildings",
      scheduled: false,
      status: "sent",
      timestamp: "2023-06-01T10:45:00",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>(
    {
      title: "",
      message: "",
      type: "text",
      audience: "All Students",
      scheduled: false,
      status: "draft",
    },
  );

  const handleCreateAnnouncement = async () => {
    try {
      const announcement: Announcement = {
        id: Math.random().toString(36).substr(2, 9),
        title: newAnnouncement.title || "Untitled Announcement",
        message: newAnnouncement.message || "",
        type: newAnnouncement.type || "text",
        audience: newAnnouncement.audience || "All Students",
        scheduled: newAnnouncement.scheduled || false,
        scheduledTime: newAnnouncement.scheduledTime,
        status: newAnnouncement.scheduled ? "scheduled" : "sent",
        timestamp: new Date().toISOString(),
      };

      setAnnouncements([announcement, ...announcements]);
      setIsDialogOpen(false);
      resetForm();

      // In a real production app, this would be uncommented
      // await syncData('announcements', [{
      //   title: announcement.title,
      //   message: announcement.message,
      //   type: announcement.type,
      //   audience: announcement.audience,
      //   scheduled: announcement.scheduled,
      //   scheduled_time: announcement.scheduledTime,
      //   status: announcement.status,
      //   timestamp: announcement.timestamp
      // }]);
      console.log("Adding new announcement to database:", announcement);
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const resetForm = () => {
    setNewAnnouncement({
      title: "",
      message: "",
      type: "text",
      audience: "All Students",
      scheduled: false,
      status: "draft",
    });
    setIsRecording(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
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
          <h1 className="text-2xl font-bold">Announcement System</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <MessageSquare className="mr-2 h-4 w-4" /> Create Announcement
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Protocols</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Announcements</CardTitle>
                <CardDescription>
                  View and manage all announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{announcement.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {announcement.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {announcement.type === "text" ? (
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Volume2 className="h-4 w-4 text-purple-500" />
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${announcement.status === "sent" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                          >
                            {announcement.status.charAt(0).toUpperCase() +
                              announcement.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                        <div>Audience: {announcement.audience}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {announcement.scheduled && announcement.scheduledTime
                            ? `Scheduled for ${formatDate(announcement.scheduledTime)}`
                            : `Sent on ${formatDate(announcement.timestamp)}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements
                    .filter((a) => a.status === "sent")
                    .map((announcement) => (
                      <div
                        key={announcement.id}
                        className="border rounded-md p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {announcement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {announcement.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {announcement.type === "text" ? (
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Volume2 className="h-4 w-4 text-purple-500" />
                            )}
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                              Sent
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                          <div>Audience: {announcement.audience}</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {`Sent on ${formatDate(announcement.timestamp)}`}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements
                    .filter((a) => a.status === "scheduled")
                    .map((announcement) => (
                      <div
                        key={announcement.id}
                        className="border rounded-md p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {announcement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {announcement.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {announcement.type === "text" ? (
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Volume2 className="h-4 w-4 text-purple-500" />
                            )}
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                              Scheduled
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                          <div>Audience: {announcement.audience}</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {`Scheduled for ${formatDate(announcement.scheduledTime || "")}`}
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Edit
                          </Button>
                          <Button size="sm" className="ml-2">
                            Send Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  {announcements.filter((a) => a.status === "scheduled")
                    .length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No scheduled announcements. Create one by clicking "Create
                      Announcement".
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Protocols</CardTitle>
                <CardDescription>
                  Pre-configured emergency announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "e1",
                      title: "Fire Evacuation",
                      description:
                        "Immediate evacuation to designated assembly points",
                    },
                    {
                      id: "e2",
                      title: "Lockdown",
                      description:
                        "Secure all rooms, lock doors, stay away from windows",
                    },
                    {
                      id: "e3",
                      title: "Severe Weather",
                      description: "Move to interior rooms away from windows",
                    },
                    {
                      id: "e4",
                      title: "Medical Emergency",
                      description:
                        "Clear the area, allow medical personnel access",
                    },
                  ].map((protocol) => (
                    <div
                      key={protocol.id}
                      className="border border-red-200 rounded-md p-4 bg-red-50 dark:bg-red-950/20"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <h3 className="font-medium">{protocol.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {protocol.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2"
                        >
                          Activate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Announcement Title</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter announcement title"
                />
              </div>

              <div className="grid gap-2">
                <Label>Announcement Type</Label>
                <RadioGroup
                  defaultValue={newAnnouncement.type}
                  onValueChange={(value) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      type: value as "text" | "voice",
                    })
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text" className="cursor-pointer">
                      Text
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="voice" id="voice" />
                    <Label htmlFor="voice" className="cursor-pointer">
                      Voice
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {newAnnouncement.type === "text" ? (
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newAnnouncement.message}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        message: e.target.value,
                      })
                    }
                    placeholder="Enter your announcement message"
                    rows={4}
                  />
                </div>
              ) : (
                <div className="grid gap-2">
                  <Label>Voice Recording</Label>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      className="mb-2"
                      onClick={toggleRecording}
                    >
                      {isRecording ? (
                        <>
                          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4" />
                          Start Recording
                        </>
                      )}
                    </Button>
                    {isRecording ? (
                      <p className="text-sm text-muted-foreground">
                        Recording... (00:15)
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Click to start recording your announcement
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select
                  value={newAnnouncement.audience}
                  onValueChange={(value) =>
                    setNewAnnouncement({ ...newAnnouncement, audience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Students">All Students</SelectItem>
                    <SelectItem value="All Staff">All Staff</SelectItem>
                    <SelectItem value="All Students and Parents">
                      All Students and Parents
                    </SelectItem>
                    <SelectItem value="All Buildings">All Buildings</SelectItem>
                    <SelectItem value="Specific Classrooms">
                      Specific Classrooms
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="scheduled"
                  checked={newAnnouncement.scheduled}
                  onCheckedChange={(checked) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      scheduled: checked,
                    })
                  }
                />
                <Label htmlFor="scheduled">Schedule for later</Label>
              </div>

              {newAnnouncement.scheduled && (
                <div className="grid gap-2">
                  <Label htmlFor="scheduledTime">Schedule Time</Label>
                  <Input
                    id="scheduledTime"
                    type="datetime-local"
                    value={newAnnouncement.scheduledTime}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        scheduledTime: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAnnouncement}>
                {newAnnouncement.scheduled ? (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Now
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default Announcements;
