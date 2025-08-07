import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultTheme, applyTheme } from "@/lib/theme";
import { useOrganization } from "../auth/OrganizationProvider";
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const { organization } = useOrganization();
    const [theme, setThemeState] = useState(() => {
        const storedTheme = localStorage.getItem("themeConfig");
        if (storedTheme) {
            try {
                return { ...defaultTheme, ...JSON.parse(storedTheme) };
            }
            catch (e) {
                console.error('Failed to parse stored theme:', e);
            }
        }
        return defaultTheme;
    });
    useEffect(() => {
        if (organization) {
            // Apply organization theme settings
            setThemeState(current => ({
                ...current,
                primaryColor: organization.primary_color || defaultTheme.primaryColor,
                secondaryColor: organization.secondary_color || defaultTheme.secondaryColor
            }));
        }
    }, [organization]);
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);
    const setTheme = (newTheme) => {
        setThemeState(current => ({
            ...current,
            ...newTheme
        }));
    };
    const resetTheme = () => {
        setThemeState(defaultTheme);
    };
    const value = {
        theme,
        setTheme,
        resetTheme
    };
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
}
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
