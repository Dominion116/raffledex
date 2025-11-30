import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Navbar = () => {
  return (
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
          <button className="btn-lime text-sm">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
