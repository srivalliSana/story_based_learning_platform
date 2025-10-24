import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user data
      axios.get('/api/users/profile')
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        });
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/users/login', credentials);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/users/register', userData);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put('/api/users/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
  } catch (error) {
    console.error('Update user failed:', error);
    throw error;
  }
};


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    updateUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
