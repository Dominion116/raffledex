import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';
import RaffleContract from '../contracts/Raffle.json';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RaffleCard = ({ raffle }) => {
  const { provider } = useWeb3();
  const [participants, setParticipants] = useState(0);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaffleInfo = async () => {
      if (!provider) return;
      setLoading(true);
      try {
        const contract = new ethers.Contract(raffle.address, RaffleContract.abi, provider);
        const numParticipants = await contract.participantsCount();
        const winnerAddress = await contract.winner();

        setParticipants(Number(numParticipants));
        if (winnerAddress !== ethers.ZeroAddress) {
          setWinner(winnerAddress);
        }
      } catch (error) {
        console.error("Error fetching raffle info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffleInfo();
  }, [provider, raffle.address]);

  const progress = (participants / raffle.maxParticipants) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-card-foreground">Raffle #{raffle.address.substring(0, 6)}...</h2>
          {winner && <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Winner Picked</span>}
        </div>
        
        {loading ? (
          <div className="animate-pulse h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        ) : (
          <div className="mb-4">
            <div className="flex justify-between text-muted-foreground mb-1">
              <span>Participants</span>
              <span>{participants} / {raffle.maxParticipants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
      </div>

      <Link to={`/raffles/${raffle.address}`} className="mt-4">
        <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out">
          View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default RaffleCard;
