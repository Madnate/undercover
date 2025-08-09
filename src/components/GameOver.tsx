import React from 'react';
import { Trophy, RotateCcw, Users } from 'lucide-react';
import { type GameState } from '../types/game';

interface GameOverProps {
  gameState: GameState;
  onResetGame: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  gameState,
  onResetGame,
}) => {
  const activePlayers = gameState.players.filter(p => !p.isEliminated);
  const winners = activePlayers.filter(p => 
    gameState.winner === 'civilians' ? !p.isUndercover : p.isUndercover
  );
  const losers = activePlayers.filter(p => 
    gameState.winner === 'civilians' ? p.isUndercover : !p.isUndercover
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Game Over!</h1>
        
        <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${
          gameState.winner === 'civilians' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {gameState.winner === 'civilians' ? 'Civilians Win!' : 'Undercover Wins!'}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Winners
            </h3>
            <div className="space-y-3">
              {winners.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{player.name}</h4>
                    <p className="text-sm text-gray-600">
                      {player.isUndercover ? 'Undercover Agent' : 'Civilian'}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      Word: {player.word}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {losers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Eliminated
              </h3>
              <div className="space-y-3">
                {gameState.players.filter(p => p.isEliminated).map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{player.name}</h4>
                      <p className="text-sm text-gray-600">
                        {player.isUndercover ? 'Undercover Agent' : 'Civilian'}
                      </p>
                      <p className="text-xs text-red-600 font-medium">
                        Word: {player.word}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Game Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{gameState.round}</div>
            <div className="text-sm text-gray-600">Rounds Played</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{gameState.players.length}</div>
            <div className="text-sm text-gray-600">Total Players</div>
          </div>
        </div>
      </div>

      <button
        onClick={onResetGame}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 text-lg"
      >
        <RotateCcw className="w-6 h-6" />
        Play Again
      </button>
    </div>
  );
};