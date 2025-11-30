import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

const CreateRaffle = () => {
  const { createRaffle, isConnected, address } = useRaffle();
  const navigate = useNavigate();
  const [maxParticipants, setMaxParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateRaffle = async () => {
    if (!maxParticipants || Number(maxParticipants) < 2) {
      setError('Please enter at least 2 participants');
      return;
    }

    if (Number(maxParticipants) > 10000) {
      setError('Maximum 10,000 participants allowed');
      return;
    }

    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createRaffle(Number(maxParticipants));
      alert(`Raffle created successfully! Raffle ID: ${result.raffleId}`);
      navigate(`/raffle/${result.raffleId}`);
    } catch (err) {
      console.error("Error creating raffle:", err);
      
      if (err.code === 'ACTION_REJECTED') {
        setError('Transaction was rejected');
      } else if (err.message.includes('insufficient funds')) {
        setError('Insufficient CELO for gas fees');
      } else {
        setError(`Failed to create raffle: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 md:py-20 lg:py-24">
      <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#bee800] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Create Raffle</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Launch your transparent on-chain raffle in seconds
          </p>
        </div>

        <div className="card">
          {/* Connection Status */}
          {!isConnected ? (
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 mb-4 sm:mb-6">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900 text-sm sm:text-base">Wallet not connected</p>
                <p className="text-xs sm:text-sm text-amber-700 mt-1">
                  Please connect your wallet using the button in the navigation to create a raffle.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#bee800]/10 border border-[#bee800]/20 mb-4 sm:mb-6">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#bee800] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm sm:text-base">Wallet connected</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label 
                htmlFor="maxParticipants" 
                className="block font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
              >
                Maximum Participants
              </label>
              <input
                id="maxParticipants"
                type="number"
                min="2"
                max="10000"
                value={maxParticipants}
                onChange={(e) => {
                  setMaxParticipants(e.target.value);
                  setError(null);
                }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-[#bee800] focus:outline-none transition-colors text-base sm:text-lg"
                placeholder="e.g., 100"
                disabled={!isConnected || loading}
              />
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Choose between 2 and 10,000 participants
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-medium text-red-900">{error}</p>
              </div>
            )}

            <button
              onClick={handleCreateRaffle}
              disabled={!isConnected || loading || !maxParticipants}
              className="btn-lime w-full text-sm sm:text-base">
            >
              {loading ? 'Creating Raffle...' : 'Create Raffle'}
            </button>

            {/* Info */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs sm:text-sm">m:text-sm">
                <span className="text-gray-600">Network</span>
                <span className="font-medium">Celo Mainnet</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm mt-2">
                <span className="text-gray-600">Estimated gas fee</span>
                <span className="font-medium">~$0.001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#bee800] mb-1">100%</div>
            <div className="text-xs sm:text-sm text-gray-600">Transparent</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#bee800] mb-1">On-chain</div>
            <div className="text-xs sm:text-sm text-gray-600">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#bee800] mb-1">Instant</div>
            <div className="text-xs sm:text-sm text-gray-600">Results</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffle;