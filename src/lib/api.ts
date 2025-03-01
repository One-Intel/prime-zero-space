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

// Schedule API
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
