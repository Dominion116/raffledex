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
      <section className="py-16 md:py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Raffles</h1>
            <p className="text-lg text-muted-foreground">
              Discover active raffles or create your own transparent on-chain draw
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search raffles..."
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-full bg-background focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Raffles Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
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
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Ticket className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-3">No raffles yet</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
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
