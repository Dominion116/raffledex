import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './Web3Context';
import RaffleContract from '../contracts/Raffle.json';

const RaffleContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRaffle = () => {
    const context = useContext(RaffleContext);
    if (!context) {
        throw new Error("useRaffle must be used within a RaffleProvider");
    }
    return context;
};

export const RaffleProvider = ({ children }) => {
  const { provider } = useWeb3();
  const [contract, setContract] = useState(null);
  const [totalRaffles, setTotalRaffles] = useState(0);
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      const raffleContract = new ethers.Contract(
        RaffleContract.address,
        RaffleContract.abi,
        signer
      );
      setContract(raffleContract);
    }
  }, [provider]);

  const fetchAllRaffles = useCallback(async () => {
    if (!contract) return;
    try {
      const count = await contract.raffleCounter();
      const total = Number(count);
      setTotalRaffles(total);
      const allRaffles = [];
      for (let i = 0; i < total; i++) {
        const raffle = await contract.raffles(i);
        allRaffles.push(raffle);
      }
      setRaffles(allRaffles.sort((a, b) => Number(b.id) - Number(a.id))); // Show newest first
    } catch (error) {
      console.error("Failed to fetch raffles:", error);
    }
  }, [contract]);

  useEffect(() => {
    if(contract) fetchAllRaffles();
  }, [contract, fetchAllRaffles]);

  const createRaffle = async (maxParticipants) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.createRaffle(maxParticipants);
    await tx.wait();
    await fetchAllRaffles();
  };

  const getRaffle = async (raffleId) => {
    if (!contract) return null;
    return await contract.getRaffle(raffleId);
  };

  const getParticipants = async (raffleId) => {
    if (!contract) return [];
    return await contract.getParticipants(raffleId);
  };

  const hasUserJoined = async (raffleId, userAddress) => {
    if (!contract || !userAddress) return false;
    return await contract.hasUserJoined(raffleId, userAddress);
  };

  const joinRaffle = async (raffleId) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.joinRaffle(raffleId);
    await tx.wait();
  };

  const drawWinner = async (raffleId) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.drawWinner(raffleId);
    await tx.wait();
  };

  const cancelRaffle = async (raffleId) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.cancelRaffle(raffleId);
    await tx.wait();
  };

  return (
    <RaffleContext.Provider value={{ 
      contract, 
      createRaffle, 
      getRaffle, 
      totalRaffles, 
      raffles, 
      fetchAllRaffles,
      getParticipants,
      hasUserJoined,
      joinRaffle,
      drawWinner,
      cancelRaffle
    }}>
      {children}
    </RaffleContext.Provider>
  );
};
