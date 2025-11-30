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
    <div className="min-h-screen bg-background py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Raffle</h1>
          <p className="text-lg text-muted-foreground">
            Launch your transparent on-chain raffle in seconds
          </p>
        </div>

        <div className="card">
          {/* Connection Status */}
          {!isConnected ? (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Wallet not connected</p>
                <p className="text-sm text-amber-700 mt-1">
                  Please connect your wallet using the button in the navigation to create a raffle.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Wallet connected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="maxParticipants" 
                className="block font-semibold mb-3"
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
                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background focus:border-primary focus:outline-none transition-colors text-lg"
                placeholder="e.g., 100"
                disabled={!isConnected || loading}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Choose between 2 and 10,000 participants
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-900">{error}</p>
              </div>
            )}

            <button
              onClick={handleCreateRaffle}
              disabled={!isConnected || loading || !maxParticipants}
              className="btn btn-primary w-full text-base"
            >
              {loading ? 'Creating Raffle...' : 'Create Raffle'}
            </button>

            {/* Info */}
            <div className="pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">Celo Mainnet</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Estimated gas fee</span>
                <span className="font-medium">~$0.001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Transparent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">On-chain</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">Instant</div>
            <div className="text-sm text-muted-foreground">Results</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffle;