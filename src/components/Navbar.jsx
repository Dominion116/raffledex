import { Link } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';

const Navbar = () => {
  const { account, isConnected, connectWallet, disconnect, chainId, switchToCelo } = useRaffle();
  
  const CELO_CHAIN_ID = 42220; // Celo Mainnet
  const isCorrectNetwork = chainId === CELO_CHAIN_ID;

  const handleConnect = async () => {
    try {
      if (isConnected && !isCorrectNetwork) {
        await switchToCelo();
      } else {
        await connectWallet();
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      // You might want to show an error to the user
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">RaffleDex</Link>
          <div className="ml-10">
            <Link to="/raffles" className="mr-4">Browse</Link>
            <Link to="/create">Create</Link>
          </div>
        </div>
        <div className="flex items-center">
          {isConnected && isCorrectNetwork ? (
            <div className="flex items-center">
              <span className="mr-4">{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
              <button onClick={disconnect} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={handleConnect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isConnected && !isCorrectNetwork ? 'Switch to Celo' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
