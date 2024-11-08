import { ReactNode } from 'react';

export type ThemeContextType = {
    isTheme: string;
    toggleTheme: () => void;
    setTheme: (theme: string) => void;
};

export type ThemeProviderProps = {
    children: ReactNode;
};
