import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from './ThemeSelector';

import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>StoryScape</h1>
      <div className="actions">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/profile">Profile</Link>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <ThemeSelector />
      </div>
    </header>
  );
};

export default Navbar;
