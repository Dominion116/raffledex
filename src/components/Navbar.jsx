import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="backdrop-blur-sm bg-card/75 text-card-foreground border-b border-border sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">RaffleDex</Link>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/raffles" className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-card-foreground transition">Browse</Link>
            <Link to="/create" className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-card-foreground transition">Create</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Link to="/raffles" className="btn btn-primary">Browse raffles</Link>
          </div>
          <div>
            <appkit-button />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
