import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { PlayerSetup } from './components/PlayerSetup';
import { GamePhase } from './components/GamePhase';
import { VotingPhase } from './components/VotingPhase';
import { ResultsPhase } from './components/ResultsPhase';
import { GameOver } from './components/GameOver';

function App() {
  const {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    nextPlayer,
    votePlayer,
    eliminatePlayer,
    nextRound,
    resetGame,
  } = useGame();

  const [showWord, setShowWord] = useState(false);

  const handleNextPlayer = () => {
    setShowWord(false);
    nextPlayer();
  };

  const renderCurrentPhase = () => {
    switch (gameState.currentPhase) {
      case 'setup':
        return (
          <PlayerSetup
            players={gameState.players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onStartGame={startGame}
          />
        );
      case 'description':
        return (
          <GamePhase
            gameState={gameState}
            onNextPlayer={handleNextPlayer}
            showWord={showWord}
            onToggleWord={() => setShowWord(!showWord)}
          />
        );
      case 'voting':
        return (
          <VotingPhase
            gameState={gameState}
            onVotePlayer={votePlayer}
            onEliminatePlayer={eliminatePlayer}
          />
        );
      case 'results':
        return (
          <ResultsPhase
            gameState={gameState}
            onNextRound={nextRound}
            onResetGame={resetGame}
          />
        );
      case 'gameOver':
        return (
          <GameOver
            gameState={gameState}
            onResetGame={resetGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {renderCurrentPhase()}
    </div>
  );
}

export default App;