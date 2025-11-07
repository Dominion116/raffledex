import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';
import RaffleContract from '../contracts/Raffle.json';

const RaffleDetailPage = () => {
  const { id } = useParams();
  const { provider, address } = useWeb3();
  const [raffle, setRaffle] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [owner, setOwner] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaffleDetails = async () => {
      if (!provider) return;

      setLoading(true);
      setError(null);

      try {
        const contract = new ethers.Contract(id, RaffleContract.abi, provider);
        const maxParticipants = await contract.maxParticipants();
        const participantsCount = await contract.participantsCount();
        const ownerAddress = await contract.owner();
        const winnerAddress = await contract.winner();

        const participantAddresses = [];
        for (let i = 0; i < participantsCount; i++) {
          const address = await contract.participants(i);
          participantAddresses.push(address);
        }

        setRaffle({ address: id, maxParticipants: Number(maxParticipants) });
        setParticipants(participantAddresses);
        setOwner(ownerAddress);
        if (winnerAddress !== ethers.ZeroAddress) {
          setWinner(winnerAddress);
        }

      } catch (err) {
        console.error("Error fetching raffle details:", err);
        setError(`Failed to fetch raffle details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffleDetails();
  }, [id, provider]);

  const handleEnterRaffle = async () => {
    if (!provider) {
      setError('Provider not found. Please connect your wallet.');
      return;
    }

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(id, RaffleContract.abi, signer);
      const tx = await contract.enter();
      await tx.wait();
      window.location.reload();
    } catch (err) {
      console.error("Error entering raffle:", err);
      setError(`Failed to enter raffle: ${err.message}`);
    }
  };

  const handlePickWinner = async () => {
    if (!provider) {
      setError('Provider not found. Please connect your wallet.');
      return;
    }

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(id, RaffleContract.abi, signer);
      const tx = await contract.pickWinner();
      await tx.wait();
      window.location.reload();
    } catch (err) {
      console.error("Error picking winner:", err);
      setError(`Failed to pick winner: ${err.message}`);
    }
  };

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  if (!raffle) return <div className="container mx-auto p-4">Raffle not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Raffle Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-lg"><span className="font-bold">Contract Address:</span> {raffle.address}</p>
        <p className="text-lg"><span className="font-bold">Max Participants:</span> {raffle.maxParticipants}</p>
        <p className="text-lg"><span className="font-bold">Current Participants:</span> {participants.length}</p>
        {winner && <p className="text-lg font-bold text-green-600"><span className="font-bold">Winner:</span> {winner}</p>}
      </div>

      <div className="mb-6">
        {!winner && (
          <button 
            onClick={handleEnterRaffle}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-4"
          >
            Enter Raffle
          </button>
        )}
        {isOwner && !winner && (
          <button 
            onClick={handlePickWinner}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Pick Winner
          </button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Participants</h2>
        {participants.length > 0 ? (
          <ul className="list-disc pl-5">
            {participants.map((participant, index) => (
              <li key={index} className="text-gray-700">{participant}</li>
            ))}
          </ul>
        ) : (
          <p>No participants yet.</p>
        )}
      </div>
    </div>
  );
};

export default RaffleDetailPage;