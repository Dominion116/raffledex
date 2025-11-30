import { Link } from 'react-router-dom';
import { Ticket, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import WalletConnectModal from './WalletConnectModal';

const Navbar = () => {
  const { address, isConnected, disconnectWallet } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold">RaffleDex</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-[#bee800] transition-colors">Home</Link>
            <Link to="/raffles" className="text-sm font-medium hover:text-[#bee800] transition-colors">Browse</Link>
            <Link to="/create" className="text-sm font-medium hover:text-[#bee800] transition-colors">Create</Link>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block px-3 py-1.5 bg-gray-100 rounded-lg">
                  <span className="text-xs font-mono font-medium">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Disconnect"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-lime text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      <WalletConnectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
