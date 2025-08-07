import { createClient } from "@supabase/supabase-js";
import { Database } from '../types/supabase';

// Default values for development - replace with actual values in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0MCwiZXhwIjoxOTI4Njc0NTQwfQ.fake-key-for-development";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const setOrganizationContext = async (organizationId: string) => {
  await supabase.rpc('set_organization_context', {
    org_id: organizationId
  });
};

// Middleware to attach organization context to all requests
supabase.realtime.setAuth = ((originalSetAuth) => {
  return async (token: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (userData?.organization_id) {
        await setOrganizationContext(userData.organization_id);
      }
    }
    return originalSetAuth(token);
  };
})(supabase.realtime.setAuth);
