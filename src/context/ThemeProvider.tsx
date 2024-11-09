import { ThemeContextType, ThemeProviderProps } from "@/interfaces";

import { useContext, createContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [inStorage, setInStorage] = useState<boolean | null>(null);
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        if (inStorage === null) {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme) {
                setTheme(storedTheme);
            } else {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            }
            setInStorage(true);
        }
    }, [inStorage]);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const changeTheme = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <ThemeContext.Provider value={{ isTheme: theme, toggleTheme, setTheme: changeTheme }}>{children}</ThemeContext.Provider>
    );
};
