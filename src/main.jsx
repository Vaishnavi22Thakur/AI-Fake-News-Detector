import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/i18n';   // ← add this line BEFORE App
import App from './App';
import './index.css';   // keep if you have it

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);