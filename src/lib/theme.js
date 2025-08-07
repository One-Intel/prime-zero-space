export const defaultTheme = {
    colorMode: 'system',
    primaryColor: '#1a73e8',
    secondaryColor: '#4285f4',
    accentColor: '#fbbc04',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    borderRadius: '0.5rem'
};
// Check if the user prefers dark mode
export function getSystemThemePreference() {
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
    return "light";
}
// Apply theme to document
export function applyTheme(config) {
    if (typeof document !== "undefined") {
        const root = document.documentElement;
        const colorMode = config.colorMode === 'system'
            ? getSystemThemePreference()
            : config.colorMode;
        // Apply color mode
        if (colorMode === "dark") {
            root.classList.add("dark");
            // Adjust colors for dark mode
            root.style.setProperty('--background', '#1f2937');
            root.style.setProperty('--text', '#f9fafb');
        }
        else {
            root.classList.remove("dark");
            root.style.setProperty('--background', config.backgroundColor);
            root.style.setProperty('--text', config.textColor);
        }
        // Apply theme properties
        root.style.setProperty('--primary', config.primaryColor);
        root.style.setProperty('--secondary', config.secondaryColor);
        root.style.setProperty('--accent', config.accentColor);
        root.style.setProperty('--font-family', config.fontFamily);
        root.style.setProperty('--border-radius', config.borderRadius);
        // Store theme in localStorage
        localStorage.setItem("themeConfig", JSON.stringify(config));
        // Apply custom CSS if provided
        if (config.customCss) {
            let customStyle = document.getElementById('org-custom-css');
            if (!customStyle) {
                customStyle = document.createElement('style');
                customStyle.id = 'org-custom-css';
                document.head.appendChild(customStyle);
            }
            customStyle.textContent = config.customCss;
        }
    }
}
// Get theme from localStorage or default
export function getInitialTheme() {
    if (typeof window !== "undefined" && window.localStorage) {
        const storedTheme = localStorage.getItem("themeConfig");
        if (storedTheme) {
            try {
                return { ...defaultTheme, ...JSON.parse(storedTheme) };
            }
            catch (e) {
                console.error('Failed to parse stored theme:', e);
            }
        }
    }
    return defaultTheme;
}
