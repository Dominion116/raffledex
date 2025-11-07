import { Link } from 'react-router-dom';
import { Shield, Eye, Zap, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Decentralized
            <span className="text-gradient"> Raffles</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Create, join, and win raffles with complete transparency on the blockchain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/raffles" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore Raffles <ArrowRight size={20} />
            </Link>
            <Link to="/create" className="btn-outline inline-flex items-center justify-center">
              Create Raffle
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-24">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why RaffleDex?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card p-8 text-center hover-scale">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Provably Fair</h3>
              <p className="text-muted-foreground">
                Smart contracts ensure winners are selected randomly with no possibility of manipulation
              </p>
            </div>

            <div className="card p-8 text-center hover-scale">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Transparent</h3>
              <p className="text-muted-foreground">
                Every entry and winner selection is recorded on-chain and publicly verifiable
              </p>
            </div>

            <div className="card p-8 text-center hover-scale">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built on Celo for instant transactions and minimal gas fees
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 py-24">
        <div className="card p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Connect your wallet and create your first raffle in seconds
          </p>
          <Link to="/create" className="btn-primary inline-flex items-center justify-center gap-2">
            Create Your Raffle <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
