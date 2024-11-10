import { ReactNode } from 'react';

export type ThemeContextType = {
    isTheme: 'dark' | 'light' | 'system';
    toggleTheme: () => void;
    setTheme: (theme: 'dark' | 'light' | 'system') => void;
};

export type ThemeProviderProps = {
    children: ReactNode;
};
