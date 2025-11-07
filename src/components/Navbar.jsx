import { Link } from 'react-router-dom';
import { Home, Ticket, PlusSquare, Wallet } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';

const Navbar = () => {
  const { connectWallet, address, disconnectWallet } = useWeb3();

  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-secondary">Raffle DApp</Link>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="flex items-center space-x-2 hover:text-secondary">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/raffles" className="flex items-center space-x-2 hover:text-secondary">
            <Ticket size={20} />
            <span>Browse</span>
          </Link>
          <Link to="/create" className="flex items-center space-x-2 hover:text-secondary">
            <PlusSquare size={20} />
            <span>Create</span>
          </Link>
          {address ? (
            <button 
              onClick={disconnectWallet}
              className="bg-accent text-accent-foreground hover:bg-accent/90 py-2 px-4 rounded-md flex items-center space-x-2">
              <Wallet size={20} />
              <span>Disconnect</span>
            </button>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-accent text-accent-foreground hover:bg-accent/90 py-2 px-4 rounded-md flex items-center space-x-2">
              <Wallet size={20} />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
