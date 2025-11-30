import { Link } from 'react-router-dom';
import { Shield, Eye, Zap, ChevronRight, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#bee800]/10 border border-[#bee800]/20 mb-8">
              <span className="text-sm font-medium">Powered by Celo blockchain</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1]">
              Transparent, fair,
              <br />
              <span className="text-[#bee800]">on-chain raffles</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create and participate in provably fair raffles secured by blockchain technology. 
              Every entry is verifiable, every draw is transparent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/raffles" className="btn-lime text-base px-8 py-4 w-full sm:w-auto inline-flex items-center justify-center gap-2">
                Browse raffles
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/create" className="btn-outline text-base px-8 py-4 w-full sm:w-auto inline-flex items-center justify-center">
                Create raffle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">100%</div>
              <div className="text-base md:text-lg text-gray-600">Transparent</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">0</div>
              <div className="text-base md:text-lg text-gray-600">Hidden fees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">Instant</div>
              <div className="text-base md:text-lg text-gray-600">Results</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">On-chain</div>
              <div className="text-base md:text-lg text-gray-600">Verification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Why RaffleDex?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Built for transparency and fairness with blockchain technology
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center group hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#bee800]/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#bee800] group-hover:scale-110 transition-all duration-300">
                <Shield className="w-8 h-8 text-[#bee800] group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Provably Fair</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Every raffle is secured by smart contracts. Outcomes are verifiable on-chain, ensuring complete fairness.
              </p>
            </div>

            <div className="card text-center group hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#bee800]/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#bee800] group-hover:scale-110 transition-all duration-300">
                <Eye className="w-8 h-8 text-[#bee800] group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Fully Transparent</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Track every entry and draw in real-time. All raffle data is publicly accessible on the Celo blockchain.
              </p>
            </div>

            <div className="card text-center group hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#bee800]/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#bee800] group-hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8 text-[#bee800] group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Fast & Affordable</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Built on Celo for lightning-fast transactions with minimal fees. Create and enter raffles in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">How it works</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with RaffleDex is simple and transparent
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#bee800] flex items-center justify-center text-3xl font-bold text-black mb-8 shadow-lg">
                1
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Connect Wallet</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Connect your Web3 wallet to the Celo network. No sign-up required.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#bee800] flex items-center justify-center text-3xl font-bold text-black mb-8 shadow-lg">
                2
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Browse or Create</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Browse active raffles or create your own with custom parameters.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#bee800] flex items-center justify-center text-3xl font-bold text-black mb-8 shadow-lg">
                3
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Win & Verify</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Winners are selected randomly on-chain. Verify results on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join the future of transparent raffles on Celo blockchain. 
              Create your first raffle or participate in existing ones today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/raffles" className="bg-[#bee800] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#d4ff00] transition-colors w-full sm:w-auto text-center text-sm sm:text-base inline-flex items-center justify-center gap-2">
                Explore raffles
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/create" className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto text-center text-sm sm:text-base">
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