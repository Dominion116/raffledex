import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RaffleProvider } from './contexts/RaffleContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RaffleProvider>
      <App />
    </RaffleProvider>
  </React.StrictMode>
);
