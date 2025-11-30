import { Link } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';

const RaffleCard = ({ raffle }) => {
  if (!raffle) {
    return null;
  }

  const { id, name, maxParticipants, currentParticipants, owner, isActive } = raffle;

  const raffleId = id.toString();
  const isSoldOut = currentParticipants >= maxParticipants;
  const progress = (currentParticipants / maxParticipants) * 100;

  return (
    <Link
      to={`/raffles/${raffleId}`}
      className="card hover-scale block group"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold truncate pr-4 group-hover:text-primary transition-colors" title={name}>
            {name}
          </h3>
          {isActive && !isSoldOut ? (
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              Active
            </span>
          ) : isSoldOut ? (
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex-shrink-0">
              Full
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-muted border border-border text-muted-foreground flex-shrink-0">
              Ended
            </span>
          )}
        </div>

        {/* Owner */}
        <p className="text-sm text-muted-foreground truncate mb-6" title={owner}>
          {owner.slice(0, 6)}...{owner.slice(-4)}
        </p>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">
                {currentParticipants.toString()} / {maxParticipants.toString()}
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RaffleCard;
