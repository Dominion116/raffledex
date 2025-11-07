import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, CheckCircle, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-background text-text min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-extrabold text-primary mb-6">
          The Future of Raffles is Decentralized
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Experience unparalleled fairness and transparency. Create, join, and win raffles with the power of blockchain technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}>
          <Link 
            to="/raffles" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 py-4 px-10 rounded-full text-xl font-bold transition-transform transform hover:scale-105 shadow-xl">
            Explore Raffles
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose RaffleDex?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0}} className="flex flex-col items-center">
              <Shield size={64} className="text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Provably Fair</h3>
              <p className="text-muted-foreground">Each winner is selected by a smart contract, ensuring no manipulation is possible. The entire process is verifiable on the blockchain.</p>
            </motion.div>
            <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.2}} className="flex flex-col items-center">
              <BarChart size={64} className="text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Transparent</h3>
              <p className="text-muted-foreground">Every entry and the final winner selection are public record. Anyone can audit the results of a raffle at any time.</p>
            </motion.div>
            <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.4}} className="flex flex-col items-center">
              <CheckCircle size={64} className="text-primary mb-4" />
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
