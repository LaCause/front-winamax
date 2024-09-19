import React, { createContext, useState, ReactNode } from 'react';
import { ThemeContextType } from './contextTheme.model';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkmode, setDarkmode] = useState(false);

  const toggleDarkMode = () => {
    setDarkmode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkmode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};