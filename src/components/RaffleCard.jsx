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
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to={`/raffles/${raffleId}`}
        className="card-modern border border-border p-6 hover:shadow-xl transition-shadow flex flex-col h-full"
      >
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl md:text-2xl font-semibold truncate pr-4 text-primary" title={name}>{name}</h2>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${isActive && !isSoldOut ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {isActive && !isSoldOut ? 'Active' : (isSoldOut ? 'Sold Out' : 'Ended')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate mb-4" title={owner}>Created by: {owner}</p>
        </div>

        <div>
          <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentParticipants / maxParticipants) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold">{currentParticipants.toString()} / {maxParticipants.toString()}</p>
              <p className="text-xs text-muted-foreground">Participants</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">{isActive ? 'Ends soon' : 'Closed'}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RaffleCard;
