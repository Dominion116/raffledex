import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RaffleCard = ({ raffle }) => {
  if (!raffle) {
    return null;
  }

  const { id, name, maxParticipants, currentParticipants, owner, isActive } = raffle;

  const raffleId = id.toString();
  const isSoldOut = currentParticipants >= maxParticipants;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link 
        to={`/raffles/${raffleId}`} 
        className="bg-card text-card-foreground border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
      >
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-primary truncate pr-4" title={name}>{name}</h2>
            <span 
              className={`px-3 py-1 text-xs font-semibold rounded-full ${isActive && !isSoldOut ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {isActive && !isSoldOut ? 'Active' : (isSoldOut ? 'Sold Out' : 'Ended')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate mb-4" title={owner}>Created by: {owner}</p>
        </div>

        <div>
          <div className="w-full bg-muted rounded-full h-2.5 mb-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentParticipants / maxParticipants) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-right font-semibold">{currentParticipants.toString()} / {maxParticipants.toString()}</p>
          <p className="text-xs text-muted-foreground text-right">Participants</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default RaffleCard;
