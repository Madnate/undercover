import { useState, useCallback } from 'react';
import { type GameState, type Player } from '../types/game';
import { wordPairs } from '../data/wordPairs';

const initialGameState: GameState = {
  players: [],
  currentPhase: 'setup',
  currentPlayerIndex: 0,
  round: 1,
  gameStarted: false,
  winner: null,
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const addPlayer = useCallback((name: string) => {
    if (name.trim() && gameState.players.length < 8) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: name.trim(),
        word: '',
        isUndercover: false,
        isEliminated: false,
        votes: 0,
      };
      setGameState(prev => ({
        ...prev,
        players: [...prev.players, newPlayer],
      }));
    }
  }, [gameState.players.length]);

  const removePlayer = useCallback((playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId),
    }));
  }, []);

  const startGame = useCallback(() => {
    if (gameState.players.length < 3) return;

    const randomWordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const undercoverCount = Math.max(1, Math.floor(gameState.players.length / 4));
    const undercoverIndices = new Set<number>();
    
    while (undercoverIndices.size < undercoverCount) {
      undercoverIndices.add(Math.floor(Math.random() * gameState.players.length));
    }

    const updatedPlayers = gameState.players.map((player, index) => ({
      ...player,
      isUndercover: undercoverIndices.has(index),
      word: undercoverIndices.has(index) ? randomWordPair.undercover : randomWordPair.civilian,
      votes: 0,
      isEliminated: false,
    }));

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
      gameStarted: true,
      currentPhase: 'description',
      currentPlayerIndex: 0,
      round: 1,
      winner: null,
    }));
  }, [gameState.players]);

  const nextPlayer = useCallback(() => {
    const activePlayers = gameState.players.filter(p => !p.isEliminated);
    const currentActiveIndex = activePlayers.findIndex(p => p.id === gameState.players[gameState.currentPlayerIndex]?.id);
    
    if (currentActiveIndex < activePlayers.length - 1) {
      const nextActivePlayer = activePlayers[currentActiveIndex + 1];
      const nextPlayerIndex = gameState.players.findIndex(p => p.id === nextActivePlayer.id);
      setGameState(prev => ({
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentPhase: 'voting',
        currentPlayerIndex: 0,
      }));
    }
  }, [gameState.players, gameState.currentPlayerIndex]);

  const votePlayer = useCallback((playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(p =>
        p.id === playerId ? { ...p, votes: p.votes + 1 } : p
      ),
    }));
  }, []);

  const eliminatePlayer = useCallback(() => {
    const activePlayers = gameState.players.filter(p => !p.isEliminated);
    const maxVotes = Math.max(...activePlayers.map(p => p.votes));
    const playersWithMaxVotes = activePlayers.filter(p => p.votes === maxVotes);
    
    if (playersWithMaxVotes.length === 1) {
      const eliminatedPlayer = playersWithMaxVotes[0];
      setGameState(prev => ({
        ...prev,
        players: prev.players.map(p =>
          p.id === eliminatedPlayer.id ? { ...p, isEliminated: true } : { ...p, votes: 0 }
        ),
        currentPhase: 'results',
      }));
    } else {
      // Tie - reset votes and continue
      setGameState(prev => ({
        ...prev,
        players: prev.players.map(p => ({ ...p, votes: 0 })),
        currentPhase: 'description',
        currentPlayerIndex: 0,
      }));
    }
  }, [gameState.players]);

  const nextRound = useCallback(() => {
    const activePlayers = gameState.players.filter(p => !p.isEliminated);
    const activeUndercover = activePlayers.filter(p => p.isUndercover);
    const activeCivilians = activePlayers.filter(p => !p.isUndercover);

    if (activeUndercover.length === 0) {
      setGameState(prev => ({ ...prev, winner: 'civilians', currentPhase: 'gameOver' }));
    } else if (activeUndercover.length >= activeCivilians.length) {
      setGameState(prev => ({ ...prev, winner: 'undercover', currentPhase: 'gameOver' }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentPhase: 'description',
        currentPlayerIndex: 0,
        round: prev.round + 1,
      }));
    }
  }, [gameState.players]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  return {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    nextPlayer,
    votePlayer,
    eliminatePlayer,
    nextRound,
    resetGame,
  };
};