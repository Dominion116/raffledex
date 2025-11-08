import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRaffle } from '../contexts/RaffleContext';
import { Users, Ticket, Trophy, ArrowLeft } from 'lucide-react';

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
    address
  } = useRaffle();

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
      await fetchDetails();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading raffle details...</p>
        </div>
      </div>
    );
  }

  if (error && !raffle) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="alert-danger max-w-md">
          <p className="font-semibold mb-2">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!raffle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Raffle not found.</p>
      </div>
    );
  }

  const isOwner = address && raffle.owner && address.toLowerCase() === raffle.owner.toLowerCase();
  const canJoin = raffle.isActive && !raffle.isDrawn && !userJoined;
  const canDraw = isOwner && raffle.isActive && !raffle.isDrawn && participants.length > 0;
  const canCancel = isOwner && raffle.isActive && !raffle.isDrawn;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-4xl">
        <button 
          onClick={() => navigate('/raffles')} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back to Raffles
        </button>

        <div className="card p-8 mb-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">Raffle #{id}</h1>
              {raffle.isActive && !raffle.isDrawn && (
                <span className="badge-success">Active</span>
              )}
              {raffle.isDrawn && (
                <span className="badge-info">Completed</span>
              )}
              {!raffle.isActive && (
                <span className="badge-neutral">Cancelled</span>
              )}
            </div>
            <p className="text-muted-foreground text-sm break-words">
              Owner: {raffle.owner}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-primary" size={24} />
                <span className="text-sm font-medium text-muted-foreground">Participants</span>
              </div>
              <p className="text-2xl font-bold">
                {raffle.currentParticipants.toString()}/{raffle.maxParticipants.toString()}
              </p>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <Ticket className="text-primary" size={24} />
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </div>
              <p className="text-2xl font-bold">
                {raffle.isActive ? 'Open' : 'Closed'}
              </p>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-primary" size={24} />
                <span className="text-sm font-medium text-muted-foreground">Winner</span>
              </div>
              <p className="text-2xl font-bold">
                {raffle.isDrawn ? 'Selected' : 'Pending'}
              </p>
            </div>
          </div>

          {raffle.isDrawn && raffle.winner && (
            <div className="alert-success mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-success" size={24} />
                <h2 className="text-lg font-bold">Winner Selected!</h2>
              </div>
              <p className="text-sm break-words font-mono">{raffle.winner}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-3">
            {canJoin && (
              <button 
                onClick={handleJoin} 
                disabled={actionLoading} 
                className="btn-primary flex-1"
              >
                {actionLoading ? 'Joining...' : 'Join Raffle'}
              </button>
            )}
            {userJoined && (
              <div className="alert-success flex-1 text-center">
                <p className="font-semibold text-sm">✓ You've joined this raffle!</p>
              </div>
            )}
            {canDraw && (
              <button 
                onClick={handleDraw} 
                disabled={actionLoading} 
                className="btn-success flex-1"
              >
                {actionLoading ? 'Drawing...' : 'Draw Winner'}
              </button>
            )}
            {canCancel && (
              <button 
                onClick={handleCancel} 
                disabled={actionLoading} 
                className="btn-outline flex-1"
              >
                {actionLoading ? 'Cancelling...' : 'Cancel Raffle'}
              </button>
            )}
          </div>

          {error && (
            <div className="alert-danger mt-4">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">
            Participants ({participants.length})
          </h2>
          {participants.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {participants.map((p, i) => (
                <div key={i} className="bg-muted rounded-xl p-4 text-sm font-mono break-words">
                  {p}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto text-muted-foreground mb-3" size={48} />
              <p className="text-muted-foreground">No participants yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaffleDetailPage;
