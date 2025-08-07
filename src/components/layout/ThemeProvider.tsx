import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeConfig, defaultTheme, applyTheme } from "@/lib/theme";
import { useOrganization } from "../auth/OrganizationProvider";

type ThemeContextType = {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const storedTheme = localStorage.getItem("themeConfig");
    if (storedTheme) {
      try {
        return { ...defaultTheme, ...JSON.parse(storedTheme) };
      } catch (e) {
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

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
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

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
