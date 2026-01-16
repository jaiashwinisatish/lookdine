import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppMode = 'teen' | 'adult';

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isTeenMode: boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('adult');

  return (
    <AppModeContext.Provider value={{ mode, setMode, isTeenMode: mode === 'teen' }}>
      <div className={mode === 'teen' ? 'teen-mode' : ''}>
        {children}
      </div>
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
}
