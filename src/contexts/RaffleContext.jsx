import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { RAFFLE_CONTRACT_ADDRESS, RAFFLE_ABI } from '../lib/constants';

const RaffleContext = createContext();

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error('useRaffle must be used within RaffleProvider');
  }
  return context;
};

export const RaffleProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);

  // Celo Mainnet chainId is 42220
  const CELO_CHAIN_ID = 42220;

  // Initialize provider and check if wallet is already connected
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        // Check if already connected
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts.length > 0) {
            const web3Signer = await web3Provider.getSigner();
            setSigner(web3Signer);
            setAccount(accounts[0]);
            setIsConnected(true);

            // Create contract instance with signer
            const raffleContract = new ethers.Contract(
              RAFFLE_CONTRACT_ADDRESS,
              RAFFLE_ABI,
              web3Signer
            );
            setContract(raffleContract);

            // Get chain ID
            const network = await web3Provider.getNetwork();
            setChainId(Number(network.chainId));
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    init();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnect();
    } else {
      // Account changed
      setAccount(accounts[0]);
      window.location.reload(); // Reload to update signer
    }
  };

  const handleChainChanged = () => {
    // Reload the page when chain changes
    window.location.reload();
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask or another Web3 wallet');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();
      const currentChainId = Number(network.chainId);

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]);
      setChainId(currentChainId);
      setIsConnected(true);

      // Create contract instance with signer
      const raffleContract = new ethers.Contract(
        RAFFLE_CONTRACT_ADDRESS,
        RAFFLE_ABI,
        web3Signer
      );
      setContract(raffleContract);

      // Check if on correct network
      if (currentChainId !== CELO_CHAIN_ID) {
        await switchToCelo();
      }

      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setIsConnected(false);
    setChainId(null);
  };

  const switchToCelo = async () => {
    try {
      // Try to switch to Celo Mainnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${CELO_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${CELO_CHAIN_ID.toString(16)}`,
                chainName: 'Celo Mainnet',
                nativeCurrency: {
                  name: 'CELO',
                  symbol: 'CELO',
                  decimals: 18,
                },
                rpcUrls: ['https://forno.celo.org'],
                blockExplorerUrls: ['https://celoscan.io'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Celo network:', addError);
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  };

  // Contract interaction functions
  const createRaffle = async (maxParticipants) => {
    try {
      if (!contract || !signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await contract.createRaffle(maxParticipants);
      const receipt = await tx.wait();
      
      // Extract raffle ID from events
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'RaffleCreated'
      );
      
      const raffleId = event ? event.args[0] : null;
      
      return { success: true, raffleId, txHash: receipt.hash };
    } catch (error) {
      console.error('Error creating raffle:', error);
      throw error;
    }
  };

  const joinRaffle = async (raffleId) => {
    try {
      if (!contract || !signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await contract.joinRaffle(raffleId);
      const receipt = await tx.wait();
      
      return { success: true, txHash: receipt.hash };
    } catch (error) {
      console.error('Error joining raffle:', error);
      throw error;
    }
  };

  const drawWinner = async (raffleId) => {
    try {
      if (!contract || !signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await contract.drawWinner(raffleId);
      const receipt = await tx.wait();
      
      return { success: true, txHash: receipt.hash };
    } catch (error) {
      console.error('Error drawing winner:', error);
      throw error;
    }
  };

  const cancelRaffle = async (raffleId) => {
    try {
      if (!contract || !signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await contract.cancelRaffle(raffleId);
      const receipt = await tx.wait();
      
      return { success: true, txHash: receipt.hash };
    } catch (error) {
      console.error('Error cancelling raffle:', error);
      throw error;
    }
  };

  const getRaffle = async (raffleId) => {
    try {
      // Use provider for read-only calls (don't need signer)
      const readContract = contract || new ethers.Contract(
        RAFFLE_CONTRACT_ADDRESS,
        RAFFLE_ABI,
        provider || new ethers.JsonRpcProvider('https://forno.celo.org')
      );

      const raffle = await readContract.getRaffle(raffleId);
      
      return {
        owner: raffle[0],
        maxParticipants: Number(raffle[1]),
        currentParticipants: Number(raffle[2]),
        winner: raffle[3],
        isActive: raffle[4],
        isDrawn: raffle[5],
        createdAt: Number(raffle[6]),
        drawnAt: Number(raffle[7]),
      };
    } catch (error) {
      console.error('Error getting raffle:', error);
      throw error;
    }
  };

  const getParticipants = async (raffleId) => {
    try {
      const readContract = contract || new ethers.Contract(
        RAFFLE_CONTRACT_ADDRESS,
        RAFFLE_ABI,
        provider || new ethers.JsonRpcProvider('https://forno.celo.org')
      );

      const participants = await readContract.getParticipants(raffleId);
      return participants;
    } catch (error) {
      console.error('Error getting participants:', error);
      throw error;
    }
  };

  const getTotalRaffles = async () => {
    try {
      const readContract = contract || new ethers.Contract(
        RAFFLE_CONTRACT_ADDRESS,
        RAffle_ABI,
        provider || new ethers.JsonRpcProvider('https://forno.celo.org')
      );

      const total = await readContract.getTotalRaffles();
      return Number(total);
    } catch (error) {
      console.error('Error getting total raffles:', error);
      throw error;
    }
  };

  const hasUserJoined = async (raffleId, userAddress) => {
    try {
      const readContract = contract || new ethers.Contract(
        RAFFLE_CONTRACT_ADDRESS,
        RAFFLE_ABI,
        provider || new ethers.JsonRpcProvider('https://forno.celo.org')
      );

      const address = userAddress || account;
      if (!address) return false;

      const joined = await readContract.hasUserJoined(raffleId, address);
      return joined;
    } catch (error) {
      console.error('Error checking if user joined:', error);
      return false;
    }
  };

  const value = {
    provider,
    signer,
    contract,
    account,
    isConnected,
    chainId,
    connectWallet,
    disconnect,
    switchToCelo,
    createRaffle,
    joinRaffle,
    drawWinner,
    cancelRaffle,
    getRaffle,
    getParticipants,
    getTotalRaffles,
    hasUserJoined,
  };

  return (
    <RaffleContext.Provider value={value}>
      {children}
    </RaffleContext.Provider>
  );
};
