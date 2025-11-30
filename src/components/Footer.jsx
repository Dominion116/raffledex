import { Ticket, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t border-border/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-bold">RaffleDex</span>
            </div>
            <p className="text-sm opacity-75 max-w-sm mb-6">
              Transparent, fair, on-chain raffles powered by Celo blockchain. 
              Every entry verifiable, every draw transparent.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/raffles" className="opacity-75 hover:opacity-100 transition-opacity">
                  Browse Raffles
                </Link>
              </li>
              <li>
                <Link to="/create" className="opacity-75 hover:opacity-100 transition-opacity">
                  Create Raffle
                </Link>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Smart Contract
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} RaffleDex. All rights reserved.</p>
          <p>Built on Celo • Powered by blockchain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
