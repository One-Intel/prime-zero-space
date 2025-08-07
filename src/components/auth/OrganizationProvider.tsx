import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '../../lib/supabase';

interface OrganizationContextType {
  organization: Organization | null;
  isLoading: boolean;
  error: Error | null;
  updateOrganization: (updates: Partial<Organization>) => Promise<void>;
}

interface Organization {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'suspended';
  subscription_tier: 'basic' | 'premium' | 'enterprise';
  max_users: number;
  max_devices: number;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  timezone: string;
  contact_email: string;
  contact_phone?: string;
  address?: Record<string, any>;
  settings: Record<string, any>;
  subscription_ends_at?: string;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      loadOrganization();
    }
  }, [user]);

  const loadOrganization = async () => {
    try {
      // First get the user's organization_id
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user!.id)
        .single();

      if (userError) throw userError;

      // Then get the organization details
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', userData.organization_id)
        .single();

      if (orgError) throw orgError;

      setOrganization(orgData);
      
      // Set the organization context in Supabase
      await supabase.rpc('set_organization_context', {
        org_id: orgData.id
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrganization = async (updates: Partial<Organization>) => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', organization!.id)
        .single();

      if (error) throw error;

      setOrganization({ ...organization!, ...updates });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        isLoading,
        error,
        updateOrganization
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
