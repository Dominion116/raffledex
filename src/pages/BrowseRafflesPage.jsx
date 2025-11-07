import { useRaffle } from '../contexts/RaffleContext';
import RaffleCard from '../components/RaffleCard';

const BrowseRafflesPage = () => {
  const { raffles } = useRaffle();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Browse Raffles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffles.map((raffle, index) => (
          <RaffleCard key={index} raffle={raffle} />
        ))}
      </div>
    </div>
  );
};

export default BrowseRafflesPage;
