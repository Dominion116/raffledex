import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { RAFFLE_CONTRACT_ADDRESS, RAFFLE_ABI } from '../lib/constants';
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

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
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { walletProvider } = useAppKitProvider('eip155');
  const { address, isConnected, chainId } = useAppKitAccount();

  useEffect(() => {
    const init = async () => {
      if (walletProvider) {
        const web3Provider = new ethers.BrowserProvider(walletProvider);
        const signer = await web3Provider.getSigner();
        const raffleContract = new ethers.Contract(
          RAFFLE_CONTRACT_ADDRESS,
          RAFFLE_ABI,
          signer
        );
        setContract(raffleContract);
      }
    };
    init();
  }, [walletProvider]);

  useEffect(() => {
    if (contract) {
      getAllRaffles();
    }
  }, [contract]);

  const createRaffle = async (maxParticipants) => {
    const tx = await contract.createRaffle(maxParticipants);
    const receipt = await tx.wait();
    const event = receipt.logs.find(
      log => log.fragment && log.fragment.name === 'RaffleCreated'
    );
    const raffleId = event ? event.args[0] : null;
    return { success: true, raffleId, txHash: receipt.hash };
  };

  const joinRaffle = async (raffleId) => {
    const tx = await contract.joinRaffle(raffleId);
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.hash };
  };

  const drawWinner = async (raffleId) => {
    const tx = await contract.drawWinner(raffleId);
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.hash };
  };

  const cancelRaffle = async (raffleId) => {
    const tx = await contract.cancelRaffle(raffleId);
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.hash };
  };

  const getRaffle = async (raffleId) => {
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
    return await contract.getParticipants(raffleId);
  };

  const getTotalRaffles = async () => {
    return Number(await contract.getTotalRaffles());
  };

  const getAllRaffles = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const hasUserJoined = async (raffleId, userAddress) => {
    const addressToCheck = userAddress || address;
    if (!addressToCheck) return false;
    return await contract.hasUserJoined(raffleId, addressToCheck);
  };

  const value = {
    contract,
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
    chainId,
  };

  return (
    <RaffleContext.Provider value={value}>
      {children}
    </RaffleContext.Provider>
  );
};
