import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import { useWeb3 } from '../contexts/Web3Context';
import { Users, Ticket, Trophy, XCircle, ArrowLeft } from 'lucide-react';

const RaffleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getRaffle, 
    getParticipants, 
    hasUserJoined, 
    joinRaffle, 
    drawWinner, 
    cancelRaffle
  } = useRaffle();
  const { address } = useWeb3();

  const [raffle, setRaffle] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [userJoined, setUserJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raffleId = Number(id);
      const [raffleDetails, participantsList] = await Promise.all([
        getRaffle(raffleId),
        getParticipants(raffleId),
      ]);

      setRaffle(raffleDetails);
      setParticipants(participantsList);

      if (address) {
        const joined = await hasUserJoined(raffleId, address);
        setUserJoined(joined);
      }
    } catch (err) {
      console.error("Error fetching raffle details:", err);
      setError(`Failed to fetch raffle details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [id, getRaffle, getParticipants, hasUserJoined, address]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleJoin = async () => {
    setActionLoading(true);
    try {
      await joinRaffle(Number(id));
      await fetchDetails(); // Refresh details
    } catch (err) {
      console.error('Error joining raffle:', err);
      setError(`Failed to join raffle: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleDraw = async () => {
    setActionLoading(true);
    try {
      await drawWinner(Number(id));
      await fetchDetails();
    } catch (err) {
      console.error('Error drawing winner:', err);
      setError(`Failed to draw winner: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await cancelRaffle(Number(id));
      await fetchDetails();
    } catch (err) {
      console.error('Error cancelling raffle:', err);
      setError(`Failed to cancel raffle: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading raffle details...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!raffle) return <div className="text-center py-10">Raffle not found.</div>;

  const isOwner = address && raffle.owner && address.toLowerCase() === raffle.owner.toLowerCase();
  const canJoin = raffle.isActive && !raffle.isDrawn && !userJoined;
  const canDraw = isOwner && raffle.isActive && !raffle.isDrawn && participants.length > 0;
  const canCancel = isOwner && raffle.isActive && !raffle.isDrawn;

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate('/raffles')} 
        className="flex items-center gap-2 text-primary mb-6 font-semibold"
        whileHover={{ x: -5 }}>
        <ArrowLeft size={20} /> Back to Raffles
      </button>

      <div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="bg-card rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Raffle #{id}</h1>
          <p className="text-muted-foreground break-words">Owned by: {raffle.owner}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-background/50">
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-inner">
            <Users className="text-accent" size={40} />
            <div>
              <p className="font-bold text-2xl">{raffle.currentParticipants.toString()}/{raffle.maxParticipants.toString()}</p>
              <p className="text-muted-foreground">Participants</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-inner">
            <Ticket className="text-accent" size={40} />
            <p className={`font-bold text-2xl ${raffle.isActive ? 'text-green-500' : 'text-red-500'}`}>{raffle.isActive ? 'Active' : 'Inactive'}</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-inner">
            <Trophy className="text-accent" size={40} />
            <p className={`font-bold text-2xl ${raffle.isDrawn ? 'text-blue-500' : 'text-gray-500'}`}>{raffle.isDrawn ? 'Drawn' : 'Not Drawn'}</p>
          </div>
        </div>

        {raffle.isDrawn && raffle.winner && (
          <div className="p-8 text-center bg-accent/20">
            <h2 className="text-2xl font-bold text-accent">Winner</h2>
            <p className="text-xl break-words">{raffle.winner}</p>
          </div>
        )}

        <div className="p-8 flex flex-col md:flex-row gap-4">
          {canJoin && <button onClick={handleJoin} disabled={actionLoading} className="btn-primary w-full">Join Raffle</button>}
          {userJoined && <p className="text-green-500 font-semibold text-center w-full">You have joined this raffle!</p>}
          {canDraw && <button onClick={handleDraw} disabled={actionLoading} className="btn-secondary w-full">Draw Winner</button>}
          {canCancel && <button onClick={handleCancel} disabled={actionLoading} className="btn-danger w-full">Cancel Raffle</button>}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Participants ({participants.length})</h2>
        {participants.length > 0 ? (
          <ul className="bg-card rounded-lg shadow-inner p-4 space-y-2">
            {participants.map((p, i) => <li key={i} className="text-muted-foreground break-words">{p}</li>)}
          </ul>
        ) : (
          <p>No one has joined yet.</p>
        )}
      </div>
    </div>
  );
};

export default RaffleDetailPage;
