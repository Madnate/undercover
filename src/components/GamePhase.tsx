import React from 'react';
import { Eye, EyeOff, ArrowRight, Clock } from 'lucide-react';
import { type  GameState } from '../types/game';

interface GamePhaseProps {
  gameState: GameState;
  onNextPlayer: () => void;
  showWord: boolean;
  onToggleWord: () => void;
}

export const GamePhase: React.FC<GamePhaseProps> = ({
  gameState,
  onNextPlayer,
  showWord,
  onToggleWord,
}) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const activePlayers = gameState.players.filter(p => !p.isEliminated);
  const currentActiveIndex = activePlayers.findIndex(p => p.id === currentPlayer?.id);
  const isLastPlayer = currentActiveIndex === activePlayers.length - 1;

  if (!currentPlayer) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
          <Clock className="w-4 h-4" />
          Round {gameState.round} - Description Phase
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {currentPlayer.name}'s Turn
        </h2>
        <p className="text-gray-600">
          Player {currentActiveIndex + 1} of {activePlayers.length}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your secret word is:
          </h3>
          
          <div className="relative">
            {showWord ? (
              <div className="text-4xl font-bold text-purple-600 mb-4 p-6 bg-purple-50 rounded-lg">
                {currentPlayer.word}
              </div>
            ) : (
              <div className="text-4xl font-bold text-gray-400 mb-4 p-6 bg-gray-50 rounded-lg">
                ••••••••
              </div>
            )}
            
            <button
              onClick={onToggleWord}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {showWord ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide Word
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show Word
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Instructions:</strong> Describe your word without saying it directly. 
            Be careful not to be too obvious or too vague!
          </p>
        </div>

        <button
          onClick={onNextPlayer}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
        >
          {isLastPlayer ? 'Start Voting' : 'Next Player'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Players</h3>
        <div className="grid grid-cols-2 gap-3">
          {activePlayers.map((player, index) => (
            <div
              key={player.id}
              className={`p-3 rounded-lg border-2 transition-all ${
                player.id === currentPlayer.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  player.id === currentPlayer.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {index + 1}
                </div>
                <span className="font-medium text-gray-800">{player.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};