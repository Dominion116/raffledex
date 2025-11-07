import { createContext, useContext, useEffect, useState } from 'react';
import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { ethers } from 'ethers';

const web3Onboard = init({
  wallets: [injectedModule()],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.rpc.thirdweb.com'
    }
  ],
  appMetadata: {
    name: 'Raffle DApp',
    icon: '<svg>...</svg>',
    description: 'A decentralized raffle application.'
  }
});

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    const wallets = await web3Onboard.connectWallet();
    if (wallets[0]) {
      setConnectedWallet(wallets[0]);
      const addr = wallets[0].accounts[0].address;
      setAddress(addr);
    }
  };

  const disconnectWallet = async () => {
    if (connectedWallet) {
      await web3Onboard.disconnectWallet({ label: connectedWallet.label });
      setConnectedWallet(null);
      setProvider(null);
      setAddress(null);
    }
  };

  useEffect(() => {
    if (connectedWallet) {
      const ethersProvider = new ethers.BrowserProvider(connectedWallet.provider, 'any');
      setProvider(ethersProvider);
    } else {
      setProvider(null);
    }
  }, [connectedWallet]);

  return (
    <Web3Context.Provider value={{ connectWallet, connectedWallet, disconnect: disconnectWallet, provider, address }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
