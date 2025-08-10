import React, { useState } from 'react';
import { Plus, Trash2, Users, Play } from 'lucide-react';
import { type  Player } from '../types/game';

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (playerId: string) => void;
  onStartGame: () => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame,
}) => {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName);
      setNewPlayerName('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Undercover</h1>
        <p className="text-gray-600">A social deduction game for 3-8 players</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Players</h2>
        
        <form onSubmit={handleAddPlayer} className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            maxLength={20}
          />
          <button
            type="submit"
            disabled={!newPlayerName.trim() || players.length >= 8}
            className="flex-1 sm:flex-none justify-center px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </form>

        <div className="space-y-2 mb-6">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-800">{player.name}</span>
              </div>
              <button
                onClick={() => onRemovePlayer(player.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No players added yet</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Game Rules</h3>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
          <li>• Most players get the same word (civilians)</li>
          <li>• 1-2 players get a similar but different word (undercover)</li>
          <li>• Each player describes their word without saying it</li>
          <li>• Vote to eliminate the undercover agent</li>
          <li>• Civilians win if all undercover are eliminated</li>
          <li>• Undercover wins if they equal or outnumber civilians</li>
        </ul>

        <button
          onClick={onStartGame}
          disabled={players.length < 3}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Start Game ({players.length}/8 players)
        </button>
        
        {players.length < 3 && (
          <p className="text-center text-sm text-red-500 mt-2">
            Need at least 3 players to start
          </p>
        )}
      </div>
    </div>
  );
};