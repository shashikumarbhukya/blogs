import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded.user, token, favorites: [] });
        fetchUserFavorites(token);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const fetchUserFavorites = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/favorites`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({
        ...prev,
        favorites: response.data.map((blog) => blog._id),
      }));
    } catch (error) {
      console.error('Error fetching favorites:', error.response?.data || error.message);
    }
  };

  const updateFavorites = (updatedFavorites) => {
    setUser((prev) => ({
      ...prev,
      favorites: updatedFavorites.map((blog) => blog._id),
    }));
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const newUser = { ...decoded.user, token, favorites: [] };
      setUser(newUser);
      await fetchUserFavorites(token);
      return newUser;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const newUser = { ...decoded.user, token, favorites: [] };
      setUser(newUser);
      await fetchUserFavorites(token);
      return newUser;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};