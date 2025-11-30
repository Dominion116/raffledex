import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RaffleProvider } from './contexts/RaffleContext';
import { WalletProvider } from './contexts/WalletContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletProvider>
      <RaffleProvider>
        <App />
      </RaffleProvider>
    </WalletProvider>
  </React.StrictMode>
);
