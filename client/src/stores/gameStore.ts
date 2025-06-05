import { create } from 'zustand';

// Define our game type
export type Game = {
  id: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  maxPlayers: string;
  details: string;
};

// Initial games data
const initialGames: Game[] = [
  { id: '1', title: "Shinny at Bell Arena", sport: "Hockey", location: "Bell Arena", date: "", time: "", maxPlayers: "10", details: "" },
  { id: '2', title: "Sunday 5v5 at Mooney's", sport: "Soccer", location: "Mooney's Bay", date: "", time: "", maxPlayers: "10", details: "" },
  { id: '3', title: "Glow Golf Meetup", sport: "Mini Golf", location: "Putting Edge", date: "", time: "", maxPlayers: "10", details: "" },
  { id: '4', title: "Evening Rally at Public Courts", sport: "Tennis", location: "Lansdowne Courts", date: "", time: "", maxPlayers: "10", details: "" },
  { id: '5', title: "Beginner Doubles at Community Center", sport: "Pickleball", location: "Dovercourt Rec", date: "", time: "", maxPlayers: "10", details: "" }
];

// Store interface
interface GameStore {
  games: Game[];
  addGame: (game: Omit<Game, 'id'>) => void;
}

// Create the store
export const useGameStore = create<GameStore>((set) => ({
  games: initialGames,
  addGame: (game) => set((state) => ({
    games: [...state.games, { ...game, id: Date.now().toString() }]
  }))
}));