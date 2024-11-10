import { ThemeContextType, ThemeProviderProps } from "@/interfaces";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = 'dark' | 'light' | 'system';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
    }
    setIsInitialized(true);
  }, []);

  const getDayOrNightTheme = (): Theme => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? 'dark' : 'light';
  };

  useEffect(() => {
    if (isInitialized) {
      if (theme === 'system') {
        const systemTheme = getDayOrNightTheme();
        document.documentElement.classList.toggle("dark", systemTheme === "dark");
      } else {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    }
  }, [theme, isInitialized]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", systemTheme === "dark");
      }
    };

    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "system";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isTheme: theme, toggleTheme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
