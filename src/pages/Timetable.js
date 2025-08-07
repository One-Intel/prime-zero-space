import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { getTimetableTemplates, getWeeklySchedule, } from "@/lib/api";
React, { useState, useEffect };
from;
"react";
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
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [weeklySchedule, setWeeklySchedule] = useState([]);
    const [activeDay, setActiveDay] = useState(new Date().getDay());
    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editingTemplate, setEditingTemplate] = useState(null);
    useEffect(() => {
        fetchTemplates();
    }, []);
    useEffect(() => {
        if (selectedTemplate) {
            fetchWeeklySchedule(selectedTemplate);
        }
    }, [selectedTemplate]);
    const fetchTemplates = async () => {
        try {
            const data = await getTimetableTemplates();
            setTemplates(data);
            if (data.length > 0) {
                const activeTemplate = data.find(t => t.is_active);
                setSelectedTemplate(activeTemplate?.id || data[0].id);
            }
        }
        catch (error) {
            console.error("Error fetching templates:", error);
        }
    };
    const fetchWeeklySchedule = async (templateId) => {
        try {
            const data = await getWeeklySchedule(templateId);
            setWeeklySchedule(data);
        }
        catch (error) {
            console.error("Error fetching weekly schedule:", error);
        }
    };
}
[];
;
const [events, setEvents] = useState([
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
]);
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [currentEvent, setCurrentEvent] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const handleAddEvent = () => {
    setCurrentEvent({
        id: Math.random().toString(36).substr(2, 9),
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
        setEvents(events.filter((event) => event.id !== id));
        // In a real production app, this would be uncommented
        // await deleteData('schedules', id);
        console.log("Deleting event from database:", id);
    }
    catch (error) {
        console.error("Error deleting event:", error);
    }
};
const handleSaveEvent = async (event) => {
    try {
        if (isEditing) {
            setEvents(events.map((e) => (e.id === event.id ? event : e)));
            // In a real production app, this would be uncommented
            // await updateData('schedules', event.id, {
            //   title: event.title,
            //   time: event.time,
            //   location: event.location,
            //   type: event.type,
            //   audio_preset: event.audioPreset
            // });
            console.log("Updating event in database:", event);
        }
        else {
            setEvents([...events, event]);
            // In a real production app, this would be uncommented
            // await syncData('schedules', [{
            //   title: event.title,
            //   date: new Date().toISOString().split('T')[0],
            //   time: event.time,
            //   location: event.location,
            //   type: event.type,
            //   audio_preset: event.audioPreset,
            //   status: 'upcoming'
            // }]);
            console.log("Adding new event to database:", event);
        }
        setIsDialogOpen(false);
    }
    catch (error) {
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
return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Interactive Timetable" }), _jsxs(Button, { onClick: handleAddEvent, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Add Event"] })] }), _jsxs(Tabs, { defaultValue: "schedule", children: [_jsxs(TabsList, { className: "grid w-full max-w-md grid-cols-2", children: [_jsx(TabsTrigger, { value: "schedule", children: "Schedule" }), _jsx(TabsTrigger, { value: "templates", children: "Templates" })] }), _jsx(TabsContent, { value: "schedule", className: "mt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "md:col-span-2", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Daily Schedule" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [events
                                                        .sort((a, b) => a.time.localeCompare(b.time))
                                                        .map((event) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "text-center w-16", children: _jsx("p", { className: "text-sm font-bold", children: formatTime(event.time) }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: event.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: event.location })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`, children: event.type.charAt(0).toUpperCase() +
                                                                            event.type.slice(1) }), event.audioPreset && (_jsxs("span", { className: "text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300", children: ["Audio ", event.audioPreset] })), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEditEvent(event), children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDeleteEvent(event.id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }, event.id))), events.length === 0 && (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No events scheduled for this day. Click \"Add Event\" to create one." }))] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Calendar" }) }), _jsx(CardContent, { children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, className: "rounded-md border" }) })] })] }) }), _jsx(TabsContent, { value: "templates", className: "mt-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Schedule Templates" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                                            { name: "Standard School Day", events: 5 },
                                            { name: "Early Dismissal", events: 4 },
                                            { name: "Assembly Day", events: 6 },
                                            { name: "Testing Day", events: 3 },
                                            { name: "Special Event", events: 7 },
                                            { name: "Minimum Day", events: 3 },
                                        ].map((template, index) => (_jsxs("div", { className: "border rounded-md p-4 hover:border-primary cursor-pointer transition-colors", children: [_jsx("h3", { className: "font-medium", children: template.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [template.events, " events"] }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { variant: "outline", size: "sm", children: "Apply" }) })] }, index))) }) })] }) })] }), _jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isEditing ? "Edit Event" : "Add New Event" }) }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Event Title" }), _jsx(Input, { id: "title", value: currentEvent?.title || "", onChange: (e) => setCurrentEvent({ ...currentEvent, title: e.target.value }), placeholder: "Enter event title" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "time", children: "Time" }), _jsx(Input, { id: "time", type: "time", value: currentEvent?.time || "", onChange: (e) => setCurrentEvent({ ...currentEvent, time: e.target.value }) })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "location", children: "Location" }), _jsx(Input, { id: "location", value: currentEvent?.location || "", onChange: (e) => setCurrentEvent({
                                                ...currentEvent,
                                                location: e.target.value,
                                            }), placeholder: "Enter location" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "type", children: "Event Type" }), _jsxs(Select, { value: currentEvent?.type || "announcement", onValueChange: (value) => setCurrentEvent({ ...currentEvent, type: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select event type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "announcement", children: "Announcement" }), _jsx(SelectItem, { value: "bell", children: "Bell" }), _jsx(SelectItem, { value: "activity", children: "Activity" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "audioPreset", children: "Audio Preset (1-60)" }), _jsxs(Select, { value: currentEvent?.audioPreset?.toString() || "", onValueChange: (value) => setCurrentEvent({
                                                ...currentEvent,
                                                audioPreset: parseInt(value),
                                            }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select audio preset" }) }), _jsx(SelectContent, { className: "max-h-[200px] overflow-y-auto", children: Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (_jsxs(SelectItem, { value: num.toString(), children: ["Preset ", num] }, num))) })] })] })] }), _jsxs(DialogFooter, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsDialogOpen(false), children: [_jsx(X, { className: "mr-2 h-4 w-4" }), " Cancel"] }), _jsxs(Button, { onClick: () => handleSaveEvent(currentEvent), children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), " Save"] })] })] }) })] }) }));
export default Timetable;
