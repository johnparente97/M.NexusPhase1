import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'auto' | 'day' | 'night';
export type ActiveTheme = 'day' | 'night';

interface ThemeState {
  mode: ThemeMode;
  activeTheme: ActiveTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

// Determines if it is daytime based on current local hours (6am to 6pm)
const getAutoTheme = (): ActiveTheme => {
  const hours = new Date().getHours();
  return hours >= 6 && hours < 18 ? 'day' : 'night';
};

const applyThemeToDocument = (theme: ActiveTheme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'day') {
    document.documentElement.classList.add('theme-day');
    document.documentElement.classList.remove('theme-night');
  } else {
    document.documentElement.classList.add('theme-night');
    document.documentElement.classList.remove('theme-day');
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'auto',
      activeTheme: getAutoTheme(),

      setMode: (mode: ThemeMode) => {
        const resolvedTheme: ActiveTheme = mode === 'auto' ? getAutoTheme() : mode;
        applyThemeToDocument(resolvedTheme);
        set({ mode, activeTheme: resolvedTheme });
      },

      toggleTheme: () => {
        const currentActive = get().activeTheme;
        const nextTheme: ActiveTheme = currentActive === 'night' ? 'day' : 'night';
        applyThemeToDocument(nextTheme);
        set({ mode: nextTheme, activeTheme: nextTheme });
      },
    }),
    {
      name: 'nexus-theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolvedTheme: ActiveTheme =
            state.mode === 'auto' ? getAutoTheme() : state.mode === 'day' ? 'day' : 'night';
          applyThemeToDocument(resolvedTheme);
          state.activeTheme = resolvedTheme;
        }
      },
    }
  )
);

// Initial application on script load
if (typeof window !== 'undefined') {
  const initialTheme = getAutoTheme();
  applyThemeToDocument(initialTheme);

  // Interval check every minute to update auto-theme smoothly if time crosses 6am/6pm
  setInterval(() => {
    const store = useThemeStore.getState();
    if (store.mode === 'auto') {
      const currentAuto = getAutoTheme();
      if (currentAuto !== store.activeTheme) {
        store.setMode('auto');
      }
    }
  }, 60000);
}
