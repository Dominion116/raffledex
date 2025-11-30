
import { motion } from 'framer-motion';

const RaffleCardSkeleton = () => {
  return (
    <motion.div
      className="bg-white text-[#0a0a0a] border border-[#e5e5e5] rounded-xl p-6 shadow-lg"
    >
      <div className="grow">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
      </div>

      <div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 animate-pulse"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse ml-auto"></div>
        <div className="h-3 w-1/5 bg-gray-200 rounded animate-pulse ml-auto mt-1"></div>
      </div>
    </motion.div>
  );
};

export default RaffleCardSkeleton;
