import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  PURPLE: 'purple',
  TEAL: 'teal'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.DARK);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // For backward compatibility
  const toggleTheme = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    changeTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
