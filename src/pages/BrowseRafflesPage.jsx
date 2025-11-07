import { useRaffle } from '../contexts/RaffleContext';
import RaffleCard from '../components/RaffleCard';
import { Ticket } from 'lucide-react';

const BrowseRafflesPage = () => {
  const { raffles } = useRaffle();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Browse Raffles</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join active raffles or create your own
          </p>
        </div>

        {raffles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {raffles.map((raffle, index) => (
              <RaffleCard key={index} raffle={raffle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Ticket className="mx-auto text-muted-foreground mb-4" size={64} />
            <p className="text-muted-foreground text-lg mb-6">No raffles available</p>
            <button 
              onClick={() => window.location.href = '/create'}
              className="btn-primary"
            >
              Create First Raffle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRafflesPage;