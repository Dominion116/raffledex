import { Link } from 'react-router-dom';
import { BarChart, CheckCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 py-24 text-center"        
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold text-primary mb-6">
          The Future of Raffles is Decentralized
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Experience unparalleled fairness and transparency. Create, join, and win raffles with the power of blockchain technology.
        </p>
        <div>
          <Link 
            to="/raffles" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 py-4 px-10 rounded-full text-xl font-bold transition-transform transform hover:scale-105 shadow-lg"
          >
            Explore Raffles
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-card/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose RaffleDex?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md"              
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield size={64} className="text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Provably Fair</h3>
              <p className="text-muted-foreground">Each winner is selected by a smart contract, ensuring no manipulation is possible. The entire process is verifiable on the blockchain.</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BarChart size={64} className="text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Transparent</h3>
              <p className="text-muted-foreground">Every entry and the final winner selection are public record. Anyone can audit the results of a raffle at any time.</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CheckCircle size={64} className="text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-muted-foreground">Connect your wallet, browse existing raffles, or create your own in just a few clicks. It's that simple.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
