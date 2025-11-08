import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RaffleProvider } from './contexts/RaffleContext';
import { Web3Provider } from './contexts/Web3Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Provider>
      <RaffleProvider>
        <App />
      </RaffleProvider>
    </Web3Provider>
  </React.StrictMode>
);
