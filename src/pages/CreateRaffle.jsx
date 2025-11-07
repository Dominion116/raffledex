import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';

const CreateRaffle = () => {
  const { createRaffle, isConnected, connectWallet, account } = useRaffle();
  const navigate = useNavigate();
  const [maxParticipants, setMaxParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateRaffle = async () => {
    // Validate input
    if (!maxParticipants || Number(maxParticipants) < 2) {
      setError('Please enter at least 2 participants');
      return;
    }

    if (Number(maxParticipants) > 10000) {
      setError('Maximum 10,000 participants allowed');
      return;
    }

    // Check if wallet is connected
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createRaffle(maxParticipants);
      
      // Show success message and navigate
      alert(`Raffle created successfully! Raffle ID: ${result.raffleId}`);
      navigate(`/raffle/${result.raffleId}`);
    } catch (err) {
      console.error("Error creating raffle:", err);
      
      // Handle specific error cases
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

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (err) {
      setError(`Failed to connect wallet: ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Create a New Raffle</h1>
        <p className="text-gray-600 mb-6">Set up your raffle in seconds</p>

        {!isConnected ? (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 mb-3">
              Connect your wallet to create a raffle
            </p>
            <button
              onClick={handleConnectWallet}
              className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
            </p>
          </div>
        )}

        <div className="mb-6">
          <label 
            htmlFor="maxParticipants" 
            className="block text-gray-700 mb-2 font-semibold"
          >
            Max Participants
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            placeholder="e.g., 100"
            disabled={!isConnected || loading}
          />
          <p className="text-sm text-gray-500 mt-2">
            Minimum 2, maximum 10,000 participants
          </p>
        </div>

        <button
          onClick={handleCreateRaffle}
          disabled={!isConnected || loading || !maxParticipants}
          className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating Raffle...' : 'Create Raffle'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            You'll only pay gas fees (~$0.001 on Celo)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffle;