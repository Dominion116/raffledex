import { Link } from 'react-router-dom';
import { Shield, Eye, Zap, ChevronRight, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="text-sm font-medium">Powered by Celo blockchain</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transparent, fair,
              <br />
              <span className="text-primary">on-chain raffles</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Create and participate in provably fair raffles secured by blockchain technology. 
              Every entry is verifiable, every draw is transparent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/raffles" className="btn btn-primary text-base group">
                Browse raffles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/create" className="btn btn-outline text-base">
                Create raffle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Transparent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">0</div>
              <div className="text-sm text-muted-foreground">Hidden fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">Instant</div>
              <div className="text-sm text-muted-foreground">Results</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">On-chain</div>
              <div className="text-sm text-muted-foreground">Verification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why RaffleDex?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for transparency and fairness with blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover-scale text-center group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Shield className="w-6 h-6 text-primary group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Provably Fair</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every raffle is secured by smart contracts. Outcomes are verifiable on-chain, ensuring complete fairness.
              </p>
            </div>

            <div className="card hover-scale text-center group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Eye className="w-6 h-6 text-primary group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Transparent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track every entry and draw in real-time. All raffle data is publicly accessible on the Celo blockchain.
              </p>
            </div>

            <div className="card hover-scale text-center group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Zap className="w-6 h-6 text-primary group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast & Affordable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built on Celo for lightning-fast transactions with minimal fees. Create and enter raffles in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with RaffleDex is simple and transparent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-foreground mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your Web3 wallet to the Celo network. No sign-up required.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-foreground mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Browse or Create</h3>
              <p className="text-muted-foreground">
                Browse active raffles or create your own with custom parameters.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-foreground mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Win & Verify</h3>
              <p className="text-muted-foreground">
                Winners are selected randomly on-chain. Verify results on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card text-center bg-foreground text-background p-12 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join the future of transparent raffles on Celo blockchain. 
              Create your first raffle or participate in existing ones today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/raffles" className="btn bg-primary text-foreground hover:bg-primary/90 text-base group">
                Explore raffles
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/create" className="btn bg-background text-foreground hover:bg-muted text-base">
                Create raffle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
