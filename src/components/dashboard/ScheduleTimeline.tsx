import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSchedule } from "@/lib/api";
import { Database } from "@/types/supabase";

type ScheduleEvent = Database["public"]["Tables"]["schedules"]["Row"];

interface TimelineEventProps {
  time: string;
  title: string;
  location: string;
  status: "upcoming" | "current" | "completed";
}

const TimelineEvent = ({
  time,
  title,
  location,
  status,
}: TimelineEventProps) => {
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

  return (
    <div
      className={`relative pl-6 pb-6 border-l ${status === "completed" ? "border-muted" : "border-primary"}`}
    >
      <div
        className={`absolute left-[-5px] top-1 h-[10px] w-[10px] rounded-full ${dotStyles[status]}`}
      ></div>
      <div className={`p-3 rounded-md border ${statusStyles[status]}`}>
        <p className="text-sm font-medium">{title}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground">{location}</p>
          <p className="text-xs font-medium">{time}</p>
        </div>
      </div>
    </div>
  );
};

export function ScheduleTimeline() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
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
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  // Determine current event based on time
  const determineEventStatus = (
    time: string,
  ): "upcoming" | "current" | "completed" => {
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

    if (now < eventTime) return "upcoming";
    if (now >= eventTime && now <= eventEndTime) return "current";
    return "completed";
  };

  // Format time from 24h to 12h format
  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Today's Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : events.length > 0 ? (
            events.map((event) => (
              <TimelineEvent
                key={event.id}
                time={formatTime(event.time)}
                title={event.title}
                location={event.location}
                status={event.status}
              />
            ))
          ) : (
            // Fallback static data if no events from API
            <>
              <TimelineEvent
                time="8:00 AM"
                title="Morning Announcements"
                location="All Classrooms"
                status="completed"
              />
              <TimelineEvent
                time="10:30 AM"
                title="Class Change Bell"
                location="All Buildings"
                status="current"
              />
              <TimelineEvent
                time="12:15 PM"
                title="Lunch Period Announcement"
                location="Cafeteria"
                status="upcoming"
              />
              <TimelineEvent
                time="3:00 PM"
                title="End of Day Announcements"
                location="All Classrooms"
                status="upcoming"
              />
              <TimelineEvent
                time="4:30 PM"
                title="After School Activities"
                location="Gymnasium"
                status="upcoming"
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ScheduleTimeline;
