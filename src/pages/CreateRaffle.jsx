import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';

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
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-lg mx-auto">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">Create Raffle</h1>
            <p className="text-muted-foreground text-lg">
              Set up your raffle in seconds
            </p>
          </div>

          {!isConnected ? (
            <div className="alert-warning mb-6">
              <p className="text-sm font-medium text-center">
                Please connect your wallet using the button in the navigation bar to create a raffle.
              </p>
            </div>
          ) : (
            <div className="alert-success mb-6">
              <p className="text-sm font-semibold">
                🟢 Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          )}

          <div className="mb-6">
            <label 
              htmlFor="maxParticipants" 
              className="block text-foreground mb-3 font-semibold text-sm"
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
              className="input"
              placeholder="100"
              disabled={!isConnected || loading}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Minimum 2, maximum 10,000 participants
            </p>
          </div>

          <button
            onClick={handleCreateRaffle}
            disabled={!isConnected || loading || !maxParticipants}
            className="btn-primary w-full mb-4"
          >
            {loading ? 'Creating Raffle...' : 'Create Raffle'}
          </button>

          {error && (
            <div className="alert-danger">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              ⚡ Only gas fees apply (~$0.001 on Celo)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffle;