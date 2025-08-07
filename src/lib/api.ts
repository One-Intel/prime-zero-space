import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

// Alerts API
export const getAlerts = async () => {
  try {
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
};

export const createAlert = async (
  alert: Database["public"]["Tables"]["alerts"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("alerts")
    .insert(alert)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const resolveAlert = async (id: string) => {
  const { data, error } = await supabase
    .from("alerts")
    .update({ resolved: true, resolved_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Timetable API
export const getTimetableTemplates = async () => {
  try {
    const { data, error } = await supabase
      .from("timetable_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching timetable templates:", error);
    return [];
  }
};

export const createTimetableTemplate = async (template: {
  name: string;
  description?: string;
  is_active: boolean;
}) => {
  const { data: existingActive } = await supabase
    .from("timetable_templates")
    .select("id")
    .eq("is_active", true)
    .single();

  // Start a transaction
  const { error: err1 } = await supabase.rpc("begin_transaction");
  if (err1) throw err1;

  try {
    // If this template is active and there's an existing active template,
    // deactivate the existing one
    if (template.is_active && existingActive) {
      const { error: updateError } = await supabase
        .from("timetable_templates")
        .update({ is_active: false })
        .eq("id", existingActive.id);

      if (updateError) throw updateError;
    }

    // Create the new template
    const { data, error } = await supabase
      .from("timetable_templates")
      .insert(template)
      .select()
      .single();

    if (error) throw error;

    // Commit the transaction
    const { error: err2 } = await supabase.rpc("commit_transaction");
    if (err2) throw err2;

    return data;
  } catch (error) {
    // Rollback on error
    await supabase.rpc("rollback_transaction");
    throw error;
  }
};

export const getWeeklySchedule = async (templateId: string) => {
  try {
    const { data, error } = await supabase
      .from("weekly_schedules")
      .select(`
        *,
        schedule_items (*)
      `)
      .eq("template_id", templateId)
      .order("day_of_week", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching weekly schedule:", error);
    return [];
  }
};

export const createWeeklySchedule = async (schedule: {
  template_id: string;
  day_of_week: number;
  is_active: boolean;
}) => {
  const { data, error } = await supabase
    .from("weekly_schedules")
    .insert(schedule)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateWeeklySchedule = async (
  id: string,
  schedule: {
    is_active?: boolean;
  }
) => {
  const { data, error } = await supabase
    .from("weekly_schedules")
    .update(schedule)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createScheduleItem = async (item: {
  weekly_schedule_id: string;
  title: string;
  time: string;
  location: string;
  type: "announcement" | "bell" | "activity";
  audio_preset?: number;
  repeat_pattern?: string[];
}) => {
  const { data, error } = await supabase
    .from("schedule_items")
    .insert(item)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateScheduleItem = async (
  id: string,
  item: Partial<{
    title: string;
    time: string;
    location: string;
    type: "announcement" | "bell" | "activity";
    audio_preset?: number;
    repeat_pattern?: string[];
  }>
) => {
  const { data, error } = await supabase
    .from("schedule_items")
    .update(item)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteScheduleItem = async (id: string) => {
  const { error } = await supabase
    .from("schedule_items")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// One-off Schedule API
export const getSchedule = async (date: string) => {
  try {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("date", date)
      .order("time", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return [];
  }
};

export const createScheduleEvent = async (
  event: Database["public"]["Tables"]["schedules"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("schedules")
    .insert(event)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateScheduleEvent = async (
  id: string,
  event: Database["public"]["Tables"]["schedules"]["Update"],
) => {
  const { data, error } = await supabase
    .from("schedules")
    .update(event)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Device Status API
export const getDeviceStatus = async () => {
  try {
    const { data, error } = await supabase
      .from("device_status")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching device status:", error);
    return null;
  }
};

export const updateDeviceStatus = async (
  status: Database["public"]["Tables"]["device_status"]["Update"],
) => {
  const { data, error } = await supabase
    .from("device_status")
    .update(status)
    .eq("id", status.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Users API
export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

export const createUser = async (
  user: Database["public"]["Tables"]["users"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateUser = async (
  id: string,
  user: Database["public"]["Tables"]["users"]["Update"],
) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw error;
  return true;
};
