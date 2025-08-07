import { supabase } from "./supabase";
// Function to sync data with Supabase
export async function syncData(tableName, data) {
    try {
        const { error } = await supabase.from(tableName).upsert(data);
        if (error) {
            console.error(`Error syncing ${tableName}:`, error);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(`Error syncing ${tableName}:`, error);
        return false;
    }
}
// Function to fetch data from Supabase
export async function fetchData(tableName) {
    try {
        const { data, error } = await supabase.from(tableName).select("*");
        if (error) {
            console.error(`Error fetching ${tableName}:`, error);
            return [];
        }
        return data;
    }
    catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return [];
    }
}
// Function to delete data from Supabase
export async function deleteData(tableName, id) {
    try {
        const { error } = await supabase.from(tableName).delete().eq("id", id);
        if (error) {
            console.error(`Error deleting from ${tableName}:`, error);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(`Error deleting from ${tableName}:`, error);
        return false;
    }
}
// Function to update data in Supabase
export async function updateData(tableName, id, data) {
    try {
        const { error } = await supabase.from(tableName).update(data).eq("id", id);
        if (error) {
            console.error(`Error updating ${tableName}:`, error);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(`Error updating ${tableName}:`, error);
        return false;
    }
}
