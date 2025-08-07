import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";
import {
  getTimetableTemplates,
  getWeeklySchedule,
} from "@/lib/api";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function Timetable() {
  // Page SEO
  useEffect(() => {
    document.title = "Timetable | Dashboard";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Interactive timetable schedule management");
  }, []);

  // Templates & weekly schedule
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [activeDay, setActiveDay] = useState(new Date().getDay());

  // Local events editing
  const [events, setEvents] = useState(
    [
      {
        id: "1",
        title: "Morning Announcements",
        time: "08:00",
        location: "All Classrooms",
        type: "announcement",
      },
      {
        id: "2",
        title: "Class Change Bell",
        time: "10:30",
        location: "All Buildings",
        type: "bell",
      },
      {
        id: "3",
        title: "Lunch Period Announcement",
        time: "12:15",
        location: "Cafeteria",
        type: "announcement",
      },
      {
        id: "4",
        title: "End of Day Announcements",
        time: "15:00",
        location: "All Classrooms",
        type: "announcement",
      },
      {
        id: "5",
        title: "After School Activities",
        time: "16:30",
        location: "Gymnasium",
        type: "activity",
      },
    ]
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(new Date());

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Fetch weekly schedule when template changes
  useEffect(() => {
    if (selectedTemplate) fetchWeeklyScheduleData(selectedTemplate);
  }, [selectedTemplate]);

  const fetchTemplates = async () => {
    try {
      const data = await getTimetableTemplates();
      setTemplates(data);
      if (data?.length > 0) {
        const activeTemplate = data.find((t) => t.is_active);
        setSelectedTemplate(activeTemplate?.id || data[0].id);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchWeeklyScheduleData = async (templateId) => {
    try {
      const data = await getWeeklySchedule(templateId);
      setWeeklySchedule(data);
    } catch (error) {
      console.error("Error fetching weekly schedule:", error);
    }
  };

  const handleAddEvent = () => {
    setCurrentEvent({
      id: Math.random().toString(36).slice(2, 11),
      title: "",
      time: "",
      location: "",
      type: "announcement",
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      setEvents((prev) => prev.filter((event) => event.id !== id));
      console.log("Deleting event from database:", id);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleSaveEvent = async (event) => {
    try {
      if (isEditing) {
        setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
        console.log("Updating event in database:", event);
      } else {
        setEvents((prev) => [...prev, event]);
        console.log("Adding new event to database:", event);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "announcement":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "bell":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "activity":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Interactive Timetable</h1>
          <Button onClick={handleAddEvent}>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        <Tabs defaultValue="schedule">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Daily Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .slice()
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-4 border rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-center w-16">
                              <p className="text-sm font-bold">
                                {formatTime(event.time)}
                              </p>
                            </div>
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {event.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(
                                event.type
                              )}`}
                            >
                              {event.type.charAt(0).toUpperCase() +
                                event.type.slice(1)}
                            </span>
                            {event.audioPreset && (
                              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                Audio {event.audioPreset}
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                    {events.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No events scheduled for this day. Click "Add Event" to
                        create one.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Standard School Day", events: 5 },
                    { name: "Early Dismissal", events: 4 },
                    { name: "Assembly Day", events: 6 },
                    { name: "Testing Day", events: 3 },
                    { name: "Special Event", events: 7 },
                    { name: "Minimum Day", events: 3 },
                  ].map((template, index) => (
                    <div
                      key={index}
                      className="border rounded-md p-4 hover:border-primary cursor-pointer transition-colors"
                    >
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.events} events
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Apply
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Event" : "Add New Event"}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={currentEvent?.title || ""}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, title: e.target.value })
                  }
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={currentEvent?.time || ""}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, time: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={currentEvent?.location || ""}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, location: e.target.value })
                  }
                  placeholder="Enter location"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Event Type</Label>
                <Select
                  value={currentEvent?.type || "announcement"}
                  onValueChange={(value) =>
                    setCurrentEvent({ ...currentEvent, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="audioPreset">Audio Preset (1-60)</Label>
                <Select
                  value={currentEvent?.audioPreset?.toString() || ""}
                  onValueChange={(value) =>
                    setCurrentEvent({
                      ...currentEvent,
                      audioPreset: parseInt(value, 10),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audio preset" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        Preset {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={() => currentEvent && handleSaveEvent(currentEvent)}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default Timetable;
