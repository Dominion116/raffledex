import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';

const CreateRaffle = () => {
  const { createRaffle } = useRaffle();
  const navigate = useNavigate();
  const [maxParticipants, setMaxParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateRaffle = async () => {
    if (!maxParticipants || Number(maxParticipants) <= 0) {
      setError('Please enter a valid number of participants.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createRaffle(maxParticipants);
      // On success, navigate to the browse page to see the new raffle
      navigate('/raffles');
    } catch (err) {
      console.error("Error creating raffle:", err);
      setError(`Failed to create raffle: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Create a New Raffle</h1>
        <div className="mb-6">
          <label htmlFor="maxParticipants" className="block text-muted-foreground mb-2 font-semibold">Max Participants</label>
          <input
            id="maxParticipants"
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary"
            placeholder="e.g., 100"
          />
        </div>
        <button
          onClick={handleCreateRaffle}
          disabled={loading}
          className="w-full bg-accent text-accent-foreground py-3 px-4 rounded-lg font-bold hover:bg-accent/90 disabled:bg-gray-400 transition-colors shadow-md"
        >
          {loading ? 'Creating Raffle...' : 'Create Raffle'}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CreateRaffle;
