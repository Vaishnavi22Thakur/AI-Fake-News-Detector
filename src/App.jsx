import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { StatsProvider, useStats } from './context/StatsContext';
import TrafficLight from './components/TrafficLight';
import VeraAssistant from './components/VeraAssistant';
import StatsPanel from './components/StatsPanel';
import IntroScreen from './components/IntroScreen';

import './App.css';
import './i18n/i18n';
const API_URL = 'http://localhost:5000';
const API_URL = 'https://ai-fake-news-detector-r4cz.onrender.com';
function AppInner() {
  const { t, i18n } = useTranslation();
  const { addResult } = useStats();

  const [showIntro, setShowIntro] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await axios.post(`${API_URL}/analyze`, { text, url });
      setResult(data);
      addResult(data.verdict, data.confidence);
    } catch (err) {
      console.error(err);
      setError("Server not responding. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>

      {/* INTRO SCREEN */}
      <AnimatePresence>
        {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="app-nav">
        <div className="nav-brand">🔍 VERA AI</div>

        <div className="nav-controls">
          <button
            className={i18n.language === 'en' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>

          <button
            className={i18n.language === 'hi' ? 'active' : ''}
            onClick={() => i18n.changeLanguage('hi')}
          >
            HI
          </button>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="app-main">
        <div className="app-layout">

          {/* LEFT PANEL */}
          <motion.div className="panel">

            <textarea
              className="news-textarea"
              placeholder={t('inputPlaceholder')}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              className="url-input"
              placeholder="Optional URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            {error && <div className="error-msg">{error}</div>}

            <button
              className="analyze-btn"
              onClick={analyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze →"}
            </button>

          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div className="panel result-panel">

            {!result && (
              <div className="result-empty">
                <p>Paste text & click Analyze</p>
              </div>
            )}

            {result && (
              <>
                <div className="verdict-hero">

                  <TrafficLight
                    verdict={result.verdict}
                    confidence={result.confidence}
                  />

                  <div className="verdict-info">

                    <div className={`verdict-badge ${result.verdict.toLowerCase()}`}>
                      {result.verdict}
                    </div>

                    {/* ✅ UPDATED CONFIDENCE UI */}
                    <div className="confidence-section">
                      <div className="conf-row">
                        <span>Confidence</span>
                        <span className="conf-separator">—</span>
                        <span>{result.confidence}%</span>
                      </div>

                      <div className="confidence-bar-track">
                        <div
                          className={`confidence-bar-fill ${result.verdict.toLowerCase()}`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* ✅ ONLY VERA EXPLANATION */}
                <VeraAssistant
                  verdict={result.verdict}
                  explanation={result.explanation}
                />
              </>
            )}

          </motion.div>
        </div>

        <StatsPanel />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StatsProvider>
      <AppInner />
    </StatsProvider>
  );
}