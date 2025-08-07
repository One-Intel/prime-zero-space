import { supabase } from "./supabase";
// Bell Pattern Management
export const createBellPattern = async (pattern) => {
    const { data, error } = await supabase
        .from("bell_patterns")
        .insert(pattern)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export const getBellPatterns = async () => {
    const { data, error } = await supabase
        .from("bell_patterns")
        .select("*")
        .order("name");
    if (error)
        throw error;
    return data;
};
// Schedule Exception Management
export const createScheduleException = async (exception) => {
    const { data, error } = await supabase
        .from("schedule_exceptions")
        .insert(exception)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export const getScheduleExceptions = async (templateId) => {
    const { data, error } = await supabase
        .from("schedule_exceptions")
        .select("*")
        .eq("template_id", templateId)
        .order("start_date");
    if (error)
        throw error;
    return data;
};
// Schedule Conditions Management
export const createScheduleCondition = async (condition) => {
    const { data, error } = await supabase
        .from("schedule_conditions")
        .insert(condition)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export const getScheduleConditions = async (scheduleItemId) => {
    const { data, error } = await supabase
        .from("schedule_conditions")
        .select("*")
        .eq("schedule_item_id", scheduleItemId)
        .order("created_at");
    if (error)
        throw error;
    return data;
};
// Bell Zone Management
export const createBellZone = async (zone) => {
    const { data, error } = await supabase
        .from("bell_zones")
        .insert(zone)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export const getBellZones = async () => {
    const { data, error } = await supabase
        .from("bell_zones")
        .select("*")
        .order("name");
    if (error)
        throw error;
    return data;
};
export const updateBellZone = async (id, zone) => {
    const { data, error } = await supabase
        .from("bell_zones")
        .update(zone)
        .eq("id", id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
