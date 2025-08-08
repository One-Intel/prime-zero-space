import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '../../lib/supabase';
const OrganizationContext = createContext(undefined);
export function OrganizationProvider({ children }) {
    const { user } = useAuth();
    const [organization, setOrganization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
                .eq('id', user.id)
                .single();
            if (userError)
                throw userError;
            // Then get the organization details
            const { data: orgData, error: orgError } = await supabase
                .from('organizations')
                .select('*')
                .eq('id', userData.organization_id)
                .single();
            if (orgError)
                throw orgError;
            setOrganization(orgData);
            // Set the organization context in Supabase
            await supabase.rpc('set_organization_context', {
                org_id: orgData.id
            });
        }
        catch (err) {
            setError(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    const updateOrganization = async (updates) => {
        try {
            const { data, error } = await supabase
                .from('organizations')
                .update(updates)
                .eq('id', organization.id)
                .single();
            if (error)
                throw error;
            setOrganization({ ...organization, ...updates });
        }
        catch (err) {
            setError(err);
            throw err;
        }
    };
    return (_jsx(OrganizationContext.Provider, { value: {
            organization,
            isLoading,
            error,
            updateOrganization
        }, children: children }));
}
export const useOrganization = () => {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error('useOrganization must be used within an OrganizationProvider');
    }
    return context;
};
