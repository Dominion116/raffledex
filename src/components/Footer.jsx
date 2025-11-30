import { Ticket, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 sm:py-14 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#bee800] rounded-lg flex items-center justify-center">
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <span className="text-lg sm:text-xl font-bold">RaffleDex</span>
            </div>
            <p className="text-xs sm:text-sm opacity-75 max-w-sm mb-4 sm:mb-6">
              Transparent, fair, on-chain raffles powered by Celo blockchain. 
              Every entry verifiable, every draw transparent.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
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
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
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

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} RaffleDex. All rights reserved.</p>
          <p>Built on Celo • Powered by blockchain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
