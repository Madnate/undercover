import React from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { GameState } from '../types/game';

interface ResultsPhaseProps {
  gameState: GameState;
  onNextRound: () => void;
  onResetGame: () => void;
}

export const ResultsPhase: React.FC<ResultsPhaseProps> = ({
  gameState,
  onNextRound,
  onResetGame,
}) => {
  const eliminatedPlayer = gameState.players.find(p => p.isEliminated && p.votes > 0);
  const activePlayers = gameState.players.filter(p => !p.isEliminated);
  const activeUndercover = activePlayers.filter(p => p.isUndercover);
  const activeCivilians = activePlayers.filter(p => !p.isUndercover);

  if (!eliminatedPlayer) return null;

  const isGameOver = activeUndercover.length === 0 || activeUndercover.length >= activeCivilians.length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Round {gameState.round} Results
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            eliminatedPlayer.isUndercover ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {eliminatedPlayer.isUndercover ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {eliminatedPlayer.name} was eliminated!
          </h3>
          
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            eliminatedPlayer.isUndercover 
              ? 'bg-red-100 text-red-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {eliminatedPlayer.isUndercover ? 'Undercover Agent' : 'Civilian'}
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Their word was:</p>
            <p className="text-lg font-bold text-purple-600">{eliminatedPlayer.word}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Remaining Players</h4>
          <div className="grid grid-cols-2 gap-3">
            {activePlayers.map((player) => (
              <div
                key={player.id}
                className={`p-3 rounded-lg border-2 ${
                  player.isUndercover 
                    ? 'border-red-200 bg-red-50' 
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    player.isUndercover ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-800">{player.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            {activeCivilians.length} Civilians • {activeUndercover.length} Undercover
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onResetGame}
          className="flex-1 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </button>
        
        {!isGameOver && (
          <button
            onClick={onNextRound}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            Next Round
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};