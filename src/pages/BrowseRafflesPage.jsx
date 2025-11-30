import { Link } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import RaffleCard from '../components/RaffleCard';
import RaffleCardSkeleton from '../components/RaffleCardSkeleton';
import { Ticket, Search } from 'lucide-react';

const BrowseRafflesPage = () => {
  const { raffles, loading } = useRaffle();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 md:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">Browse Raffles</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">
              Discover active raffles or create your own transparent on-chain draw
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search raffles..."
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-full bg-white focus:border-[#bee800] focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Raffles Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <RaffleCardSkeleton key={i} />
              ))}
            </div>
          ) : raffles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {raffles.map((raffle, index) => (
                <RaffleCard key={index} raffle={raffle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Ticket className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 px-4">No raffles yet</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Be the first to create a transparent on-chain raffle on RaffleDex
              </p>
              <Link to="/create" className="btn btn-primary">
                Create First Raffle
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrowseRafflesPage;
