import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { RAFFLE_CONTRACT_ADDRESS, RAFFLE_ABI } from '../lib/constants';
import { useWallet } from './WalletContext';

const RaffleContext = createContext();

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error('useRaffle must be used within RaffleProvider');
  }
  return context;
};

export const RaffleProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useWallet();

  // Initialize provider and contract
  useEffect(() => {
    const initProvider = async () => {
      try {
        // Use Celo mainnet RPC
        const rpcProvider = new ethers.JsonRpcProvider('https://forno.celo.org');
        setProvider(rpcProvider);

        // Create contract instance (read-only for now)
        const raffleContract = new ethers.Contract(
          RAFFLE_CONTRACT_ADDRESS,
          RAFFLE_ABI,
          rpcProvider
        );
        setContract(raffleContract);
      } catch (error) {
        console.error('Failed to initialize provider:', error);
      }
    };

    initProvider();
  }, []);

  // Fetch raffles when contract is ready
  useEffect(() => {
    if (contract) {
      getAllRaffles();
    }
  }, [contract]);

  const createRaffle = async (maxParticipants) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    // TODO: Get signer from connected wallet
    // For now, this will throw an error until wallet signing is implemented
    throw new Error('Transaction signing not yet implemented. Please implement wallet signing in WalletContext.');
    
    // Example implementation once wallet signing is ready:
    // const signer = await getSigner();
    // const contractWithSigner = contract.connect(signer);
    // const tx = await contractWithSigner.createRaffle(maxParticipants);
    // const receipt = await tx.wait();
    // return { success: true, raffleId: receipt.logs[0].args[0], txHash: receipt.hash };
  };

  const joinRaffle = async (raffleId) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    // TODO: Get signer from connected wallet
    throw new Error('Transaction signing not yet implemented. Please implement wallet signing in WalletContext.');
  };

  const drawWinner = async (raffleId) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    // TODO: Get signer from connected wallet
    throw new Error('Transaction signing not yet implemented. Please implement wallet signing in WalletContext.');
  };

  const cancelRaffle = async (raffleId) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    // TODO: Get signer from connected wallet
    throw new Error('Transaction signing not yet implemented. Please implement wallet signing in WalletContext.');
  };

  const getRaffle = async (raffleId) => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    const raffle = await contract.getRaffle(raffleId);
    return {
      id: raffleId,
      owner: raffle[0],
      maxParticipants: Number(raffle[1]),
      currentParticipants: Number(raffle[2]),
      winner: raffle[3],
      isActive: raffle[4],
      isDrawn: raffle[5],
      createdAt: Number(raffle[6]),
      drawnAt: Number(raffle[7]),
    };
  };

  const getParticipants = async (raffleId) => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }
    return await contract.getParticipants(raffleId);
  };

  const getTotalRaffles = async () => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }
    return Number(await contract.getTotalRaffles());
  };

  const getAllRaffles = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const totalRaffles = await contract.getTotalRaffles();
      const promises = [];
      for (let i = 0; i < totalRaffles; i++) {
        promises.push(contract.getRaffle(i));
      }
      const results = await Promise.all(promises);
      const rafflesData = results.map((raffle, index) => ({
        id: index,
        owner: raffle[0],
        maxParticipants: Number(raffle[1]),
        currentParticipants: Number(raffle[2]),
        winner: raffle[3],
        isActive: raffle[4],
        isDrawn: raffle[5],
        createdAt: Number(raffle[6]),
        drawnAt: Number(raffle[7]),
      }));
      setRaffles(rafflesData);
    } catch (error) {
      console.error('Failed to fetch raffles:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasUserJoined = async (raffleId, userAddress) => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }
    
    const addressToCheck = userAddress || address;
    if (!addressToCheck) return false;
    return await contract.hasUserJoined(raffleId, addressToCheck);
  };

  const value = {
    contract,
    provider,
    raffles,
    loading,
    createRaffle,
    joinRaffle,
    drawWinner,
    cancelRaffle,
    getRaffle,
    getAllRaffles,
    getParticipants,
    getTotalRaffles,
    hasUserJoined,
    address,
    isConnected,
  };

  return (
    <RaffleContext.Provider value={value}>
      {children}
    </RaffleContext.Provider>
  );
};
