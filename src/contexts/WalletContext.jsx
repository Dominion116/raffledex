import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initWalletKit, getWalletKit } from '../config/walletkit';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [walletKit, setWalletKit] = useState(null);
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeSessions, setActiveSessions] = useState({});
  const [currentChainId, setCurrentChainId] = useState('eip155:42220'); // Celo mainnet

  // Initialize WalletKit
  useEffect(() => {
    const init = async () => {
      try {
        const kit = await initWalletKit();
        setWalletKit(kit);

        // Get existing sessions
        const sessions = kit.getActiveSessions();
        setActiveSessions(sessions);

        // Check if already connected
        if (Object.keys(sessions).length > 0) {
          const session = Object.values(sessions)[0];
          const accounts = session.namespaces.eip155?.accounts || [];
          if (accounts.length > 0) {
            const addr = accounts[0].split(':')[2];
            setAddress(addr);
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize WalletKit:', error);
      }
    };

    init();
  }, []);

  // Setup event listeners
  useEffect(() => {
    if (!walletKit) return;

    // Handle session proposals
    const onSessionProposal = async (proposal) => {
      try {
        console.log('Session proposal received:', proposal);

        // Build approved namespaces
        const approvedNamespaces = buildApprovedNamespaces({
          proposal: proposal.params,
          supportedNamespaces: {
            eip155: {
              chains: ['eip155:42220'], // Celo mainnet
              methods: [
                'eth_sendTransaction',
                'eth_signTransaction',
                'eth_sign',
                'personal_sign',
                'eth_signTypedData',
                'eth_signTypedData_v4',
                'wallet_switchEthereumChain',
                'wallet_addEthereumChain',
              ],
              events: ['chainChanged', 'accountsChanged'],
              accounts: address 
                ? [`eip155:42220:${address}`]
                : [],
            },
          },
        });

        // Approve session
        const session = await walletKit.approveSession({
          id: proposal.id,
          namespaces: approvedNamespaces,
        });

        setActiveSessions((prev) => ({
          ...prev,
          [session.topic]: session,
        }));

        console.log('Session approved:', session);
      } catch (error) {
        console.error('Failed to approve session:', error);
        
        // Reject session on error
        await walletKit.rejectSession({
          id: proposal.id,
          reason: getSdkError('USER_REJECTED'),
        });
      }
    };

    // Handle session requests
    const onSessionRequest = async (event) => {
      const { topic, params, id } = event;
      const { request } = params;

      console.log('Session request received:', request);

      try {
        // Handle different request methods
        let result;

        switch (request.method) {
          case 'personal_sign':
          case 'eth_sign':
            // TODO: Implement signing logic
            result = '0x'; // Placeholder
            break;

          case 'eth_sendTransaction':
          case 'eth_signTransaction':
            // TODO: Implement transaction signing
            result = '0x'; // Placeholder
            break;

          default:
            throw new Error(`Unsupported method: ${request.method}`);
        }

        // Send response
        const response = { id, result, jsonrpc: '2.0' };
        await walletKit.respondSessionRequest({ topic, response });
      } catch (error) {
        console.error('Failed to handle session request:', error);

        // Send error response
        const response = {
          id,
          jsonrpc: '2.0',
          error: {
            code: 5000,
            message: error.message || 'User rejected',
          },
        };
        await walletKit.respondSessionRequest({ topic, response });
      }
    };

    // Handle session delete
    const onSessionDelete = (event) => {
      console.log('Session deleted:', event);
      setActiveSessions((prev) => {
        const newSessions = { ...prev };
        delete newSessions[event.topic];
        return newSessions;
      });
    };

    walletKit.on('session_proposal', onSessionProposal);
    walletKit.on('session_request', onSessionRequest);
    walletKit.on('session_delete', onSessionDelete);

    return () => {
      walletKit.off('session_proposal', onSessionProposal);
      walletKit.off('session_request', onSessionRequest);
      walletKit.off('session_delete', onSessionDelete);
    };
  }, [walletKit, address]);

  // Connect wallet via URI
  const connectWallet = useCallback(async (uri) => {
    if (!walletKit) {
      throw new Error('WalletKit not initialized');
    }

    try {
      await walletKit.pair({ uri });
    } catch (error) {
      console.error('Failed to pair:', error);
      throw error;
    }
  }, [walletKit]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    if (!walletKit || Object.keys(activeSessions).length === 0) return;

    try {
      const sessionTopics = Object.keys(activeSessions);
      
      for (const topic of sessionTopics) {
        await walletKit.disconnectSession({
          topic,
          reason: getSdkError('USER_DISCONNECTED'),
        });
      }

      setActiveSessions({});
      setAddress(null);
      setIsConnected(false);
    } catch (error) {
      console.error('Failed to disconnect:', error);
      throw error;
    }
  }, [walletKit, activeSessions]);

  // Switch chain
  const switchChain = useCallback(async (chainId) => {
    if (!walletKit || Object.keys(activeSessions).length === 0) return;

    try {
      const session = Object.values(activeSessions)[0];
      
      await walletKit.emitSessionEvent({
        topic: session.topic,
        event: {
          name: 'chainChanged',
          data: parseInt(chainId.split(':')[1]),
        },
        chainId,
      });

      setCurrentChainId(chainId);
    } catch (error) {
      console.error('Failed to switch chain:', error);
      throw error;
    }
  }, [walletKit, activeSessions]);

  const value = {
    address,
    isConnected,
    activeSessions,
    currentChainId,
    connectWallet,
    disconnectWallet,
    switchChain,
    setAddress,
    setIsConnected,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
