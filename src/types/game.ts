export interface Player {
  id: string;
  name: string;
  word: string;
  isUndercover: boolean;
  isEliminated: boolean;
  votes: number;
}

export interface GameState {
  players: Player[];
  currentPhase: 'setup' | 'description' | 'voting' | 'results' | 'gameOver';
  currentPlayerIndex: number;
  round: number;
  gameStarted: boolean;
  winner: 'civilians' | 'undercover' | null;
}

export interface WordPair {
  civilian: string;
  undercover: string;
  category: string;
}