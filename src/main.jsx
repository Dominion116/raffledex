import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RaffleProvider } from './contexts/RaffleContext';
import { AppKitProvider } from '@reown/appkit/react';
import './config.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppKitProvider>
      <RaffleProvider>
        <App />
      </RaffleProvider>
    </AppKitProvider>
  </React.StrictMode>
);
