import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Dark is the default; a visitor's inverted choice is remembered per browser.
try {
  if (localStorage.getItem('jf-theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
} catch (e) {
  /* storage unavailable */
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
