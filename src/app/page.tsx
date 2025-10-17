"use client";

import { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen";
import EmotionSelection from "./components/EmotionSelection";
import MainDashboard from "./components/MainDashboard";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

export default function Home() {
  const [user, setUser] = useState<User>(null);
  const [currentView, setCurrentView] = useState<'login' | 'emotion-selection' | 'dashboard'>('login');

  useEffect(() => {
    // Verificar si hay un usuario logueado en localStorage
    const savedUser = localStorage.getItem('emocionario-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('emotion-selection');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('emocionario-user', JSON.stringify(userData));
    setCurrentView('emotion-selection');
  };

  const handleEmotionSelected = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('emocionario-user');
    setCurrentView('login');
  };

  if (currentView === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentView === 'emotion-selection') {
    return <EmotionSelection onEmotionSelected={handleEmotionSelected} />;
  }

  return <MainDashboard user={user} onLogout={handleLogout} />;
}
