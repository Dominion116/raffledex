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
    <nav className="bg-card text-card-foreground shadow-md border-b border-border">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary">RaffleDex</Link>
          <div className="ml-10 space-x-4">
            <Link to="/raffles" className="hover:text-primary transition-colors">Browse</Link>
            <Link to="/create" className="hover:text-primary transition-colors">Create</Link>
          </div>
        </div>
        <div className="flex items-center">
          {isConnected && isCorrectNetwork ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-mono bg-muted text-muted-foreground px-3 py-1 rounded-md">
                {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
              </span>
              <button 
                onClick={disconnect} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold py-2 px-4 rounded-md transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={handleConnect} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded-md transition-colors"
            >
              {isConnected && !isCorrectNetwork ? 'Switch to Celo' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
