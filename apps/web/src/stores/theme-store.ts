import { create } from 'zustand';

type Theme = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark', // default to dark-first per spec guidelines
  setTheme: (theme) => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    
    // Support dark system classes if needed
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    set({ theme });
  },
}));
