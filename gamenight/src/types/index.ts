export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  timezone: string;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface Game {
  id: string;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  duration?: number;
  complexity?: number;
  bggId?: number;
  imageUrl?: string;
  description?: string;
  bestWith?: string;
}

export interface GameEvent {
  id: string;
  title?: string;
  dateTime: string;
  location?: string;
  description?: string;
  status: 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED';
  game: Game;
  creator: User;
  commitments: Commitment[];
  commitmentDeadline?: string;
}

export interface Commitment {
  id: string;
  status: 'COMMITTED' | 'WAITLISTED' | 'DECLINED';
  joinedAt: string;
  notes?: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}