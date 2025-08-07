import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [organizationId, setOrganizationId] = useState(null);
    useEffect(() => {
        // Mock user for development
        const mockUser = {
            id: "mock-user-id",
            email: "admin@school.edu",
            user_metadata: {
                name: "Admin User",
                role: "admin",
            },
        };
        setUser(mockUser);
        setLoading(false);
        // In a real app with Supabase connected, we would use this code:
        /*
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        });
    
        // Listen for auth changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        });
    
        return () => subscription.unsubscribe();
        */
    }, []);
    const signIn = async (email, password) => {
        // Mock authentication for development
        if (email === "admin@school.edu" && password === "password") {
            const mockUser = {
                id: "mock-user-id",
                email: "admin@school.edu",
                user_metadata: {
                    name: "Admin User",
                    role: "admin",
                },
            };
            setUser(mockUser);
            return;
        }
        throw new Error("Invalid credentials");
        // In a real app with Supabase connected, we would use this code:
        /*
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        */
    };
    const signOut = async () => {
        // Mock sign out for development
        setUser(null);
        setSession(null);
        // In a real app with Supabase connected, we would use this code:
        /*
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        */
    };
    const value = {
        session,
        user,
        organizationId,
        signIn,
        signOut,
        loading,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
