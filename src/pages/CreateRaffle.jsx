import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { useRaffles } from '../contexts/RaffleContext';
import { ethers } from 'ethers';
import RaffleContract from '../contracts/Raffle.json';

const CreateRaffle = () => {
  const { provider } = useWeb3();
  const { addRaffle } = useRaffles();
  const [maxParticipants, setMaxParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [raffleAddress, setRaffleAddress] = useState(null);

  const handleCreateRaffle = async () => {
    if (!provider) {
      setError('Provider not found. Please connect your wallet.');
      return;
    }

    setLoading(true);
    setError(null);
    setRaffleAddress(null);

    try {
      const signer = await provider.getSigner();
      const factory = new ethers.ContractFactory(
        RaffleContract.abi,
        RaffleContract.bytecode,
        signer
      );
      const contract = await factory.deploy(maxParticipants);
      await contract.waitForDeployment();
      const newRaffleAddress = contract.target;
      setRaffleAddress(newRaffleAddress);
      addRaffle({ address: newRaffleAddress, maxParticipants: maxParticipants });
    } catch (err) {
      console.error("Error creating raffle:", err);
      setError(`Failed to create raffle: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create a New Raffle</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Max Participants</label>
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={handleCreateRaffle}
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:bg-gray-400"
        >
          {loading ? 'Creating Raffle...' : 'Create Raffle'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {raffleAddress && (
          <div className="mt-4 p-4 bg-green-100 rounded-md">
            <p className="font-bold">Raffle created successfully!</p>
            <p>Contract Address: {raffleAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRaffle;
