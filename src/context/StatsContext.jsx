import React, { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({ total: 0, fake: 0, real: 0, suspicious: 0, history: [] });

  const addResult = (verdict, confidence) => {
    setStats(prev => {
      const key = verdict.toLowerCase();
      const newHistory = [...prev.history, { verdict, confidence, time: Date.now() }].slice(-20);
      return {
        total: prev.total + 1,
        fake: prev.fake + (key === 'fake' ? 1 : 0),
        real: prev.real + (key === 'real' ? 1 : 0),
        suspicious: prev.suspicious + (key === 'suspicious' ? 1 : 0),
        history: newHistory,
      };
    });
  };

  return <StatsContext.Provider value={{ stats, addResult }}>{children}</StatsContext.Provider>;
}

export const useStats = () => useContext(StatsContext);
