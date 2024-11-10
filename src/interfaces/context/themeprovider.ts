import { ReactNode } from 'react';

export type ThemeContextType = {
    isTheme: 'dark' | 'light';
    toggleTheme: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
};

export type ThemeProviderProps = {
    children: ReactNode;
};
