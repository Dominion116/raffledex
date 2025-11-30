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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary mb-4"></div>
          <p className="text-muted-foreground">Loading raffle details...</p>
        </div>
      </div>
    );
  }

  if (error && !raffle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="card max-w-md border-2 border-red-200 bg-red-50">
          <p className="font-semibold mb-2 text-red-900">Error</p>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!raffle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Raffle not found.</p>
      </div>
    );
  }

  const isOwner = address && raffle.owner && address.toLowerCase() === raffle.owner.toLowerCase();
  const canJoin = raffle.isActive && !raffle.isDrawn && !userJoined;
  const canDraw = isOwner && raffle.isActive && !raffle.isDrawn && participants.length > 0;
  const canCancel = isOwner && raffle.isActive && !raffle.isDrawn;

  return (
    <div className="min-h-screen bg-background py-12 md:py-16 px-4">
      <div className="container max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/raffles')} 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back to Raffles
        </button>

        {/* Main Card */}
        <div className="card mb-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">Raffle #{id}</h1>
              <div>
                {raffle.isActive && !raffle.isDrawn && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
                    Active
                  </span>
                )}
                {raffle.isDrawn && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium">
                    Completed
                  </span>
                )}
                {!raffle.isActive && !raffle.isDrawn && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-sm font-medium">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-mono break-all">
              Owner: {raffle.owner}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Participants</span>
              </div>
              <p className="text-3xl font-bold">
                {raffle.currentParticipants.toString()}<span className="text-xl text-muted-foreground">/{raffle.maxParticipants.toString()}</span>
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </div>
              <p className="text-3xl font-bold">
                {raffle.isActive ? 'Open' : 'Closed'}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Winner</span>
              </div>
              <p className="text-3xl font-bold">
                {raffle.isDrawn ? 'Selected' : 'Pending'}
              </p>
            </div>
          </div>

          {/* Winner Announcement */}
          {raffle.isDrawn && raffle.winner && (
            <div className="p-6 rounded-xl bg-primary/10 border-2 border-primary/20 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-bold">Winner Selected!</h2>
              </div>
              <p className="text-sm font-mono break-all bg-background px-4 py-3 rounded-lg">{raffle.winner}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            {canJoin && (
              <button 
                onClick={handleJoin} 
                disabled={actionLoading} 
                className="btn btn-primary flex-1"
              >
                {actionLoading ? 'Joining...' : 'Join Raffle'}
              </button>
            )}
            {userJoined && !raffle.isDrawn && (
              <div className="flex-1 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                <p className="font-semibold">✓ You've joined this raffle!</p>
              </div>
            )}
            {canDraw && (
              <button 
                onClick={handleDraw} 
                disabled={actionLoading} 
                className="btn bg-primary text-foreground hover:bg-primary/90 flex-1"
              >
                {actionLoading ? 'Drawing...' : 'Draw Winner'}
              </button>
            )}
            {canCancel && (
              <button 
                onClick={handleCancel} 
                disabled={actionLoading} 
                className="btn btn-outline flex-1"
              >
                {actionLoading ? 'Cancelling...' : 'Cancel Raffle'}
              </button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-900">{error}</p>
            </div>
          )}
        </div>

        {/* Participants List */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">
            Participants ({participants.length})
          </h2>
          {participants.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {participants.map((p, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-muted/30 text-sm font-mono break-all hover:bg-muted/50 transition-colors">
                  {p}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No participants yet</p>
              <p className="text-sm text-muted-foreground mt-1">Be the first to join!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaffleDetailPage;
