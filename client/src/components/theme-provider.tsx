import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Theme = "dark" | "light" | "bios";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(
    "bughunt-theme",
    defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove any old theme classes
    root.classList.remove("dark", "light", "bios");
    
    // Add the new theme class
    root.classList.add(theme);
    
    // Set data-theme attribute for components that use it
    root.setAttribute("data-theme", theme);
    
    // Special styles for the BIOS theme
    if (theme === "bios") {
      document.body.style.fontFamily = "'JetBrains Mono', monospace";
    } else {
      document.body.style.fontFamily = ""; // Reset to default from CSS
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};