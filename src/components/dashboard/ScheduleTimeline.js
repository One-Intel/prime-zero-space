import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSchedule } from "@/lib/api";
const TimelineEvent = ({ time, title, location, status, }) => {
    const statusStyles = {
        upcoming: "border-muted bg-background",
        current: "border-primary bg-primary/10",
        completed: "border-muted bg-muted/50",
    };
    const dotStyles = {
        upcoming: "bg-muted",
        current: "bg-primary",
        completed: "bg-muted",
    };
    return (_jsxs("div", { className: `relative pl-6 pb-6 border-l ${status === "completed" ? "border-muted" : "border-primary"}`, children: [_jsx("div", { className: `absolute left-[-5px] top-1 h-[10px] w-[10px] rounded-full ${dotStyles[status]}` }), _jsxs("div", { className: `p-3 rounded-md border ${statusStyles[status]}`, children: [_jsx("p", { className: "text-sm font-medium", children: title }), _jsxs("div", { className: "flex justify-between items-center mt-1", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: location }), _jsx("p", { className: "text-xs font-medium", children: time })] })] })] }));
};
export function ScheduleTimeline() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    useEffect(() => {
        fetchSchedule();
    }, []);
    const fetchSchedule = async () => {
        try {
            setLoading(true);
            const data = await getSchedule(todayDate);
            setEvents(data);
        }
        catch (error) {
            console.error("Error fetching schedule:", error);
        }
        finally {
            setLoading(false);
        }
    };
    // Determine current event based on time
    const determineEventStatus = (time) => {
        const now = new Date();
        const [hourStr, minuteStr] = time.split(":");
        const hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
        const eventTime = new Date();
        eventTime.setHours(hour);
        eventTime.setMinutes(minute);
        eventTime.setSeconds(0);
        // Add 30 minutes to event time to consider it "current" for 30 minutes
        const eventEndTime = new Date(eventTime);
        eventEndTime.setMinutes(eventEndTime.getMinutes() + 30);
        if (now < eventTime)
            return "upcoming";
        if (now >= eventTime && now <= eventEndTime)
            return "current";
        return "completed";
    };
    // Format time from 24h to 12h format
    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const hourNum = parseInt(hour);
        const ampm = hourNum >= 12 ? "PM" : "AM";
        const hour12 = hourNum % 12 || 12;
        return `${hour12}:${minute} ${ampm}`;
    };
    return (_jsxs(Card, { className: "w-full bg-card", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { children: "Today's Schedule" }), _jsx("p", { className: "text-sm text-muted-foreground", children: currentDate })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "mt-2", children: loading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" }) })) : events.length > 0 ? (events.map((event) => (_jsx(TimelineEvent, { time: formatTime(event.time), title: event.title, location: event.location, status: event.status }, event.id)))) : (
                    // Fallback static data if no events from API
                    _jsxs(_Fragment, { children: [_jsx(TimelineEvent, { time: "8:00 AM", title: "Morning Announcements", location: "All Classrooms", status: "completed" }), _jsx(TimelineEvent, { time: "10:30 AM", title: "Class Change Bell", location: "All Buildings", status: "current" }), _jsx(TimelineEvent, { time: "12:15 PM", title: "Lunch Period Announcement", location: "Cafeteria", status: "upcoming" }), _jsx(TimelineEvent, { time: "3:00 PM", title: "End of Day Announcements", location: "All Classrooms", status: "upcoming" }), _jsx(TimelineEvent, { time: "4:30 PM", title: "After School Activities", location: "Gymnasium", status: "upcoming" })] })) }) })] }));
}
export default ScheduleTimeline;
