import { Link } from 'react-router-dom';

const RaffleCard = ({ raffle }) => {
  if (!raffle) {
    return null;
  }

  const { id, maxParticipants, currentParticipants, owner, isActive } = raffle;

  // Since raffle.id is a BigInt, it needs to be converted to a string for the URL.
  const raffleId = id.toString();

  return (
    <Link to={`/raffles/${raffleId}`} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold">Raffle #{raffleId}</h2>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>Participants: {currentParticipants.toString()}/{maxParticipants.toString()}</p>
      <p className="text-sm text-gray-500 truncate">Owner: {owner}</p>
    </Link>
  );
};

export default RaffleCard;
