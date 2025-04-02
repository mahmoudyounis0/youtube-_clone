'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button type='button' onClick={toggleTheme}>
            {theme === 'dark' ? <Sun  /> :<Moon  />}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}