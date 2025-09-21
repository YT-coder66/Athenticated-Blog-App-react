
import React, { createContext, useContext, useState, useEffect } from 'react';

const USERS_KEY = 'fake_users_db';

function fakeApiDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getUsersFromStorage() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsersToStorage(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  async function register({ username, email, password }) {
    setLoading(true);
    await fakeApiDelay(1500);
    const users = getUsersFromStorage();

    if (users.find(u => u.email === email)) {
      setLoading(false);
      throw new Error('Email already in use');
    }

    const newUser = { id: Date.now(), username, email, password };
    users.push(newUser);
    saveUsersToStorage(users);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
  }

  async function login({ email, password }) {
    setLoading(true);
    await fakeApiDelay(1500);
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      setLoading(false);
      throw new Error('Invalid credentials');
    }
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
    setUser(foundUser);
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
