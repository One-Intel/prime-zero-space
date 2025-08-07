import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

// Bell Pattern Management
export const createBellPattern = async (pattern: {
  name: string;
  description?: string;
  pattern_type: "single" | "sequence" | "custom";
  sequence: number[];
  interval_seconds: number[];
}) => {
  const { data, error } = await supabase
    .from("bell_patterns")
    .insert(pattern)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBellPatterns = async () => {
  const { data, error } = await supabase
    .from("bell_patterns")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

// Schedule Exception Management
export const createScheduleException = async (exception: {
  template_id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  exception_type: "holiday" | "special_schedule" | "cancellation";
  replacement_schedule_id?: string;
}) => {
  const { data, error } = await supabase
    .from("schedule_exceptions")
    .insert(exception)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getScheduleExceptions = async (templateId: string) => {
  const { data, error } = await supabase
    .from("schedule_exceptions")
    .select("*")
    .eq("template_id", templateId)
    .order("start_date");

  if (error) throw error;
  return data;
};

// Schedule Conditions Management
export const createScheduleCondition = async (condition: {
  schedule_item_id: string;
  condition_type: "weather" | "temperature" | "attendance" | "custom";
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "between";
  value: any;
  action: "skip" | "delay" | "alternate" | "notify";
  action_params?: Record<string, any>;
}) => {
  const { data, error } = await supabase
    .from("schedule_conditions")
    .insert(condition)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getScheduleConditions = async (scheduleItemId: string) => {
  const { data, error } = await supabase
    .from("schedule_conditions")
    .select("*")
    .eq("schedule_item_id", scheduleItemId)
    .order("created_at");

  if (error) throw error;
  return data;
};

// Bell Zone Management
export const createBellZone = async (zone: {
  name: string;
  description?: string;
  location_tags: string[];
  volume_adjustment?: number;
  delay_seconds?: number;
  active?: boolean;
}) => {
  const { data, error } = await supabase
    .from("bell_zones")
    .insert(zone)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBellZones = async () => {
  const { data, error } = await supabase
    .from("bell_zones")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const updateBellZone = async (
  id: string,
  zone: Partial<{
    name: string;
    description: string;
    location_tags: string[];
    volume_adjustment: number;
    delay_seconds: number;
    active: boolean;
  }>
) => {
  const { data, error } = await supabase
    .from("bell_zones")
    .update(zone)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
