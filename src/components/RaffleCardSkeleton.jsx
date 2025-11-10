
import { motion } from 'framer-motion';

const RaffleCardSkeleton = () => {
  return (
    <motion.div
      className="bg-card text-card-foreground border border-border rounded-xl p-6 shadow-lg"
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="h-8 w-3/4 bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
        </div>
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse mb-4"></div>
      </div>

      <div>
        <div className="w-full bg-muted rounded-full h-2.5 mb-2 animate-pulse"></div>
        <div className="h-4 w-1/4 bg-muted rounded animate-pulse ml-auto"></div>
        <div className="h-3 w-1/5 bg-muted rounded animate-pulse ml-auto mt-1"></div>
      </div>
    </motion.div>
  );
};

export default RaffleCardSkeleton;
