// Check if the user prefers dark mode
export function getSystemThemePreference(): "dark" | "light" {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // Default to light if matchMedia is not available
}

// Apply theme to document
export function applyTheme(theme: "dark" | "light"): void {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }
}

// Get theme from localStorage or system preference
export function getInitialTheme(): "dark" | "light" {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTheme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;
    if (storedTheme) {
      return storedTheme;
    }
  }
  return getSystemThemePreference();
}
