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
      className="card hover-lift block group"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold truncate pr-4 group-hover:text-[#bee800] transition-colors" title={name}>
            {name}
          </h3>
          {isActive && !isSoldOut ? (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-[#bee800]/10 border border-[#bee800]/20 shrink-0">
              Active
            </span>
          ) : isSoldOut ? (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
              Full
            </span>
          ) : (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-gray-100 border border-gray-200 text-gray-600 shrink-0">
              Ended
            </span>
          )}
        </div>

        {/* Owner */}
        <p className="text-xs sm:text-sm text-gray-600 truncate mb-4 sm:mb-6" title={owner}>
          {owner.slice(0, 6)}...{owner.slice(-4)}
        </p>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              <span className="text-xs sm:text-sm font-semibold">
                {currentParticipants.toString()} / {maxParticipants.toString()}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
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
