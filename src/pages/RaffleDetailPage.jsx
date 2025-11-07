import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import { Users, Ticket, Trophy, XCircle, ArrowLeft, Loader2, PartyPopper, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RaffleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getRaffle, 
    getParticipants, 
    hasUserJoined, 
    joinRaffle, 
    drawWinner, 
    cancelRaffle,
    account,
  } = useRaffle();

  const [raffle, setRaffle] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [userJoined, setUserJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // Can be 'join', 'draw', 'cancel'

  const fetchDetails = useCallback(async () => {
    try {
      const raffleId = BigInt(id);
      const [raffleDetails, participantsList] = await Promise.all([
        getRaffle(raffleId),
        getParticipants(raffleId),
      ]);

      setRaffle(raffleDetails);
      setParticipants(participantsList);

      if (account) {
        const joined = await hasUserJoined(raffleId, account);
        setUserJoined(joined);
      }
    } catch (err) {
      console.error("Error fetching raffle details:", err);
      setError("Failed to fetch raffle details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id, getRaffle, getParticipants, hasUserJoined, account]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleAction = async (action, actionName) => {
    setActionLoading(actionName);
    setError(null);
    try {
      await action(BigInt(id));
      await fetchDetails();
    } catch (err) {
      console.error(`Error with ${actionName}:`, err);
      setError(`Failed to ${actionName.toLowerCase()} raffle: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const isOwner = account && raffle && raffle.owner && account.toLowerCase() === raffle.owner.toLowerCase();
  const isSoldOut = raffle && raffle.currentParticipants >= raffle.maxParticipants;
  const canJoin = raffle && raffle.isActive && !raffle.isDrawn && !userJoined && !isSoldOut;
  const canDraw = isOwner && raffle.isActive && !raffle.isDrawn && isSoldOut;
  const canCancel = isOwner && raffle.isActive && !raffle.isDrawn;

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="animate-spin" size={48} /></div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!raffle) return <div className="text-center py-10">Raffle not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.button 
        onClick={() => navigate('/raffles')} 
        className="flex items-center gap-2 text-primary mb-6 font-semibold"
        whileHover={{ x: -5 }}>
        <ArrowLeft size={20} /> Back to Raffles
      </motion.button>

      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-primary mb-2 truncate" title={raffle.name}>{raffle.name}</h1>
          <p className="text-muted-foreground break-words">Created by: {raffle.owner}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-background/50">
          {/* Stats Cards */}
          <StatCard icon={<Users size={32} />} label="Participants" value={`${raffle.currentParticipants.toString()}/${raffle.maxParticipants.toString()}`} />
          <StatCard icon={<Ticket size={32} />} label="Status" value={raffle.isActive ? 'Active' : 'Inactive'} color={raffle.isActive ? 'text-green-400' : 'text-red-400'} />
          <StatCard icon={<Trophy size={32} />} label="Winner" value={raffle.isDrawn ? 'Drawn' : 'Not Drawn'} color={raffle.isDrawn ? 'text-blue-400' : 'text-gray-500'} />
        </div>

        {raffle.isDrawn && raffle.winner && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="p-8 text-center bg-accent/20 border-t border-border">
            <h2 className="text-2xl font-bold text-accent inline-flex items-center gap-2"><PartyPopper /> Winner <PartyPopper /></h2>
            <p className="text-xl break-words font-mono mt-2">{raffle.winner}</p>
          </motion.div>
        )}

        <div className="p-8 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Action Buttons */}
          <AnimatePresence mode="wait">
            {canJoin && <ActionButton onClick={() => handleAction(joinRaffle, 'Join')} text="Join Raffle" loading={actionLoading === 'Join'} />}          
            {userJoined && !raffle.isDrawn && <p className="text-green-500 font-semibold text-center w-full">You have joined this raffle!</p>}
            {canDraw && <ActionButton onClick={() => handleAction(drawWinner, 'Draw')} text="Draw Winner" loading={actionLoading === 'Draw'} variant="secondary" />} 
            {canCancel && <ActionButton onClick={() => handleAction(cancelRaffle, 'Cancel')} text="Cancel Raffle" loading={actionLoading === 'Cancel'} variant="destructive" />}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.2}}} className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Participants ({participants.length})</h2>
        {participants.length > 0 ? (
          <div className="bg-card rounded-lg shadow-inner border border-border p-4 max-h-96 overflow-y-auto">
            <ul className="space-y-2">
              {participants.map((p, i) => <li key={i} className="text-muted-foreground break-words font-mono text-sm bg-background/50 p-2 rounded-md">{p}</li>)}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground bg-card/50 rounded-lg border border-border">
            <Info size={32} className="mx-auto mb-2" />
            <p>No one has joined this raffle yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Helper components for UI consistency
const StatCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-inner border border-border">
    <div className="text-accent">{icon}</div>
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className={`font-bold text-2xl ${color}`}>{value}</p>
    </div>
  </div>
);

const ActionButton = ({ onClick, text, loading, variant = 'primary' }) => {
  const baseClasses = "w-full md:w-auto font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      className={`${baseClasses} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
    >
      {loading ? <Loader2 className="animate-spin" /> : text}
    </motion.button>
  )
}

export default RaffleDetailPage;
