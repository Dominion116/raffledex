import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <Ticket className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-bold">RaffleDex</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/raffles" className="text-sm font-medium hover:text-primary transition-colors">Browse</Link>
          <Link to="/create" className="text-sm font-medium hover:text-primary transition-colors">Create</Link>
        </div>

        <div className="flex items-center gap-3">
          <appkit-button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
