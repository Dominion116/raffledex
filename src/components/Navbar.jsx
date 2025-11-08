import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <appkit-button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
