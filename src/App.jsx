import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const BrowseRafflesPage = lazy(() => import('./pages/BrowseRafflesPage'));
const CreateRaffle = lazy(() => import('./pages/CreateRaffle'));
const RaffleDetailPage = lazy(() => import('./pages/RaffleDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Navbar */}
        <Navbar />

        <main className="flex-grow">
          <Suspense fallback={<div className="text-center text-lg p-8">Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/raffles" element={<BrowseRafflesPage />} />
              <Route path="/create" element={<CreateRaffle />} />
              <Route path="/raffles/:id" element={<RaffleDetailPage />} /> {/* Raffle Detail Page */}
              <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 */}
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
