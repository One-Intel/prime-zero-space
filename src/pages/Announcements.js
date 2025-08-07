import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Mic, Volume2, Clock, Send, MessageSquare, AlertTriangle, } from "lucide-react";
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
            }
            catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };
        fetchAnnouncements();
    }, []);
    const [announcements, setAnnouncements] = useState([
        {
            id: "1",
            title: "Morning Announcements",
            message: "Good morning students! Today's lunch menu includes pizza, salad, and fruit.",
            type: "text",
            audience: "All Students",
            scheduled: false,
            status: "sent",
            timestamp: "2023-06-01T08:00:00",
        },
        {
            id: "2",
            title: "Early Dismissal",
            message: "Reminder: School will dismiss at 1:30 PM tomorrow due to teacher in-service.",
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
            message: "A fire drill will be conducted today at 11:00 AM. Please follow standard procedures.",
            type: "voice",
            audience: "All Buildings",
            scheduled: false,
            status: "sent",
            timestamp: "2023-06-01T10:45:00",
        },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        message: "",
        type: "text",
        audience: "All Students",
        scheduled: false,
        status: "draft",
    });
    const handleCreateAnnouncement = async () => {
        try {
            const announcement = {
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
        }
        catch (error) {
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (date.toLocaleDateString() +
            " at " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Announcement System" }), _jsxs(Button, { onClick: () => setIsDialogOpen(true), children: [_jsx(MessageSquare, { className: "mr-2 h-4 w-4" }), " Create Announcement"] })] }), _jsxs(Tabs, { defaultValue: "all", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "all", children: "All" }), _jsx(TabsTrigger, { value: "sent", children: "Sent" }), _jsx(TabsTrigger, { value: "scheduled", children: "Scheduled" }), _jsx(TabsTrigger, { value: "emergency", children: "Emergency Protocols" })] }), _jsx(TabsContent, { value: "all", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "All Announcements" }), _jsx(CardDescription, { children: "View and manage all announcements" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: announcements.map((announcement) => (_jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: announcement.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: announcement.message })] }), _jsxs("div", { className: "flex items-center gap-2", children: [announcement.type === "text" ? (_jsx(MessageSquare, { className: "h-4 w-4 text-blue-500" })) : (_jsx(Volume2, { className: "h-4 w-4 text-purple-500" })), _jsx("span", { className: `text-xs px-2 py-1 rounded-full ${announcement.status === "sent" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`, children: announcement.status.charAt(0).toUpperCase() +
                                                                            announcement.status.slice(1) })] })] }), _jsxs("div", { className: "flex justify-between items-center mt-4 text-xs text-muted-foreground", children: [_jsxs("div", { children: ["Audience: ", announcement.audience] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), announcement.scheduled && announcement.scheduledTime
                                                                        ? `Scheduled for ${formatDate(announcement.scheduledTime)}`
                                                                        : `Sent on ${formatDate(announcement.timestamp)}`] })] })] }, announcement.id))) }) })] }) }), _jsx(TabsContent, { value: "sent", className: "mt-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Sent Announcements" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: announcements
                                                .filter((a) => a.status === "sent")
                                                .map((announcement) => (_jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: announcement.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: announcement.message })] }), _jsxs("div", { className: "flex items-center gap-2", children: [announcement.type === "text" ? (_jsx(MessageSquare, { className: "h-4 w-4 text-blue-500" })) : (_jsx(Volume2, { className: "h-4 w-4 text-purple-500" })), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-green-100 text-green-800", children: "Sent" })] })] }), _jsxs("div", { className: "flex justify-between items-center mt-4 text-xs text-muted-foreground", children: [_jsxs("div", { children: ["Audience: ", announcement.audience] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), `Sent on ${formatDate(announcement.timestamp)}`] })] })] }, announcement.id))) }) })] }) }), _jsx(TabsContent, { value: "scheduled", className: "mt-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Scheduled Announcements" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [announcements
                                                    .filter((a) => a.status === "scheduled")
                                                    .map((announcement) => (_jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: announcement.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: announcement.message })] }), _jsxs("div", { className: "flex items-center gap-2", children: [announcement.type === "text" ? (_jsx(MessageSquare, { className: "h-4 w-4 text-blue-500" })) : (_jsx(Volume2, { className: "h-4 w-4 text-purple-500" })), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800", children: "Scheduled" })] })] }), _jsxs("div", { className: "flex justify-between items-center mt-4 text-xs text-muted-foreground", children: [_jsxs("div", { children: ["Audience: ", announcement.audience] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), `Scheduled for ${formatDate(announcement.scheduledTime || "")}`] })] }), _jsxs("div", { className: "flex justify-end mt-2", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "outline", size: "sm", className: "ml-2", children: "Edit" }), _jsx(Button, { size: "sm", className: "ml-2", children: "Send Now" })] })] }, announcement.id))), announcements.filter((a) => a.status === "scheduled")
                                                    .length === 0 && (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No scheduled announcements. Create one by clicking \"Create Announcement\"." }))] }) })] }) }), _jsx(TabsContent, { value: "emergency", className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Emergency Protocols" }), _jsx(CardDescription, { children: "Pre-configured emergency announcements" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [
                                                {
                                                    id: "e1",
                                                    title: "Fire Evacuation",
                                                    description: "Immediate evacuation to designated assembly points",
                                                },
                                                {
                                                    id: "e2",
                                                    title: "Lockdown",
                                                    description: "Secure all rooms, lock doors, stay away from windows",
                                                },
                                                {
                                                    id: "e3",
                                                    title: "Severe Weather",
                                                    description: "Move to interior rooms away from windows",
                                                },
                                                {
                                                    id: "e4",
                                                    title: "Medical Emergency",
                                                    description: "Clear the area, allow medical personnel access",
                                                },
                                            ].map((protocol) => (_jsxs("div", { className: "border border-red-200 rounded-md p-4 bg-red-50 dark:bg-red-950/20", children: [_jsx("div", { className: "flex justify-between items-start", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-red-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: protocol.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: protocol.description })] })] }) }), _jsxs("div", { className: "flex justify-end mt-4", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Preview" }), _jsx(Button, { variant: "destructive", size: "sm", className: "ml-2", children: "Activate" })] })] }, protocol.id))) }) })] }) })] }), _jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[525px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create New Announcement" }) }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Announcement Title" }), _jsx(Input, { id: "title", value: newAnnouncement.title, onChange: (e) => setNewAnnouncement({
                                                    ...newAnnouncement,
                                                    title: e.target.value,
                                                }), placeholder: "Enter announcement title" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Announcement Type" }), _jsxs(RadioGroup, { defaultValue: newAnnouncement.type, onValueChange: (value) => setNewAnnouncement({
                                                    ...newAnnouncement,
                                                    type: value,
                                                }), className: "flex gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "text", id: "text" }), _jsx(Label, { htmlFor: "text", className: "cursor-pointer", children: "Text" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "voice", id: "voice" }), _jsx(Label, { htmlFor: "voice", className: "cursor-pointer", children: "Voice" })] })] })] }), newAnnouncement.type === "text" ? (_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "message", children: "Message" }), _jsx(Textarea, { id: "message", value: newAnnouncement.message, onChange: (e) => setNewAnnouncement({
                                                    ...newAnnouncement,
                                                    message: e.target.value,
                                                }), placeholder: "Enter your announcement message", rows: 4 })] })) : (_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { children: "Voice Recording" }), _jsxs("div", { className: "border rounded-md p-4 flex flex-col items-center justify-center", children: [_jsx(Button, { variant: isRecording ? "destructive" : "outline", className: "mb-2", onClick: toggleRecording, children: isRecording ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "animate-pulse mr-2 h-2 w-2 rounded-full bg-red-500" }), "Stop Recording"] })) : (_jsxs(_Fragment, { children: [_jsx(Mic, { className: "mr-2 h-4 w-4" }), "Start Recording"] })) }), isRecording ? (_jsx("p", { className: "text-sm text-muted-foreground", children: "Recording... (00:15)" })) : (_jsx("p", { className: "text-sm text-muted-foreground", children: "Click to start recording your announcement" }))] })] })), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "audience", children: "Target Audience" }), _jsxs(Select, { value: newAnnouncement.audience, onValueChange: (value) => setNewAnnouncement({ ...newAnnouncement, audience: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select audience" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "All Students", children: "All Students" }), _jsx(SelectItem, { value: "All Staff", children: "All Staff" }), _jsx(SelectItem, { value: "All Students and Parents", children: "All Students and Parents" }), _jsx(SelectItem, { value: "All Buildings", children: "All Buildings" }), _jsx(SelectItem, { value: "Specific Classrooms", children: "Specific Classrooms" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "scheduled", checked: newAnnouncement.scheduled, onCheckedChange: (checked) => setNewAnnouncement({
                                                    ...newAnnouncement,
                                                    scheduled: checked,
                                                }) }), _jsx(Label, { htmlFor: "scheduled", children: "Schedule for later" })] }), newAnnouncement.scheduled && (_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "scheduledTime", children: "Schedule Time" }), _jsx(Input, { id: "scheduledTime", type: "datetime-local", value: newAnnouncement.scheduledTime, onChange: (e) => setNewAnnouncement({
                                                    ...newAnnouncement,
                                                    scheduledTime: e.target.value,
                                                }) })] }))] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsDialogOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleCreateAnnouncement, children: newAnnouncement.scheduled ? (_jsxs(_Fragment, { children: [_jsx(Clock, { className: "mr-2 h-4 w-4" }), "Schedule"] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), "Send Now"] })) })] })] }) })] }) }));
}
export default Announcements;
