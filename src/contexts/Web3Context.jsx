import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error("useWeb3 must be used within a Web3Provider");
    }
    return context;
};

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        
        const signer = await web3Provider.getSigner();
        const userAddress = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        setProvider(web3Provider);
        setAddress(userAddress);
        setChainId(network.chainId);
        setError(null);

      } catch (err) {
        console.error("Connection error:", err);
        setError(`Failed to connect wallet: ${err.message}`);
      }
    } else {
      setError("MetaMask not found. Please install it.");
    }
  }, []);

  const disconnectWallet = () => {
    setProvider(null);
    setAddress(null);
    setChainId(null);
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      window.location.reload(); // Recommended by MetaMask docs
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <Web3Context.Provider value={{ provider, address, chainId, error, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};
