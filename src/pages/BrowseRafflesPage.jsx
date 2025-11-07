import { useRaffle } from '../contexts/RaffleContext';
import RaffleCard from '../components/RaffleCard';

const BrowseRafflesPage = () => {
  const { raffles, isLoading } = useRaffle();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Explore Active Raffles</h1>
        
        {isLoading ? (
          <div className="text-center text-lg">Loading raffles...</div>
        ) : raffles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {raffles.map((raffle, index) => (
              <RaffleCard key={index} raffle={raffle} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground text-xl py-16">
            <p>No active raffles at the moment.</p>
            <p>Why not be the first to create one?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRafflesPage;
