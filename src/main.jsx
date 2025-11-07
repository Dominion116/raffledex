import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3Provider } from './contexts/Web3Context';
import { RaffleProvider } from './contexts/RaffleContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <RaffleProvider>
          <App />
        </RaffleProvider>
      </Web3Provider>
    </QueryClientProvider>
  </StrictMode>
);
