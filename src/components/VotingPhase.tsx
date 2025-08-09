import React from 'react';
import { Vote, Users, AlertTriangle } from 'lucide-react';
import { GameState } from '../types/game';

interface VotingPhaseProps {
  gameState: GameState;
  onVotePlayer: (playerId: string) => void;
  onEliminatePlayer: () => void;
}

export const VotingPhase: React.FC<VotingPhaseProps> = ({
  gameState,
  onVotePlayer,
  onEliminatePlayer,
}) => {
  const activePlayers = gameState.players.filter(p => !p.isEliminated);
  const totalVotes = activePlayers.reduce((sum, p) => sum + p.votes, 0);
  const maxVotes = Math.max(...activePlayers.map(p => p.votes));
  const playersWithMaxVotes = activePlayers.filter(p => p.votes === maxVotes);
  const canEliminate = totalVotes > 0 && playersWithMaxVotes.length === 1;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
          <Vote className="w-4 h-4" />
          Round {gameState.round} - Voting Phase
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Vote to Eliminate
        </h2>
        <p className="text-gray-600">
          Who do you think is the undercover agent?
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid gap-3">
          {activePlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{player.name}</h3>
                  <p className="text-sm text-gray-500">
                    {player.votes} vote{player.votes !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => onVotePlayer(player.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Vote className="w-4 h-4" />
                Vote
              </button>
            </div>
          ))}
        </div>

        {totalVotes > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Vote Summary</span>
            </div>
            <div className="text-sm text-gray-600">
              Total votes: {totalVotes}
            </div>
            {playersWithMaxVotes.length > 1 && (
              <div className="flex items-center gap-2 mt-2 text-yellow-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">
                  Tie between {playersWithMaxVotes.map(p => p.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onEliminatePlayer}
        disabled={!canEliminate}
        className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {!canEliminate 
          ? (totalVotes === 0 ? 'Cast votes to continue' : 'Resolve tie to continue')
          : `Eliminate ${playersWithMaxVotes[0]?.name}`
        }
      </button>
    </div>
  );
};