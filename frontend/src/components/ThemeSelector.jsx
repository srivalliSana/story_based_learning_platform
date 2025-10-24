import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { FaPalette, FaSun, FaMoon, FaLeaf, FaMagic } from 'react-icons/fa';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();

  const themeOptions = [
    { id: THEMES.LIGHT, name: 'Light', icon: <FaSun /> },
    { id: THEMES.DARK, name: 'Dark', icon: <FaMoon /> },
    { id: THEMES.PURPLE, name: 'Purple', icon: <FaMagic /> },
    { id: THEMES.TEAL, name: 'Teal', icon: <FaLeaf /> }
  ];

  return (
    <div className="theme-selector">
      <div className="theme-selector-toggle">
        <FaPalette className="theme-icon" />
        <span>Theme</span>
      </div>
      
      <div className="theme-options">
        {themeOptions.map((option) => (
          <button
            key={option.id}
            className={`theme-option ${theme === option.id ? 'active' : ''}`}
            onClick={() => changeTheme(option.id)}
            aria-label={`Switch to ${option.name} theme`}
          >
            <div className="theme-option-icon">{option.icon}</div>
            <span className="theme-option-name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;