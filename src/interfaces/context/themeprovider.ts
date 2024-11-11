import { ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ColorOption = {
    name: string;
    hex: string;
};

export type ThemeContextType = {
    isTheme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    selectedColor: ColorOption;
    setColor: (color: ColorOption) => void
};

export type ThemeProviderProps = {
    children: ReactNode;
};
