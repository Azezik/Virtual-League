import { useState } from "react";
import Layout from "@/components/Layout";
import GameCard from "@/components/GameCard";
import GameDetailsModal from "@/components/GameDetailsModal";
import { Helmet } from "react-helmet";
import { useGameStore } from "../stores/gameStore";
import { Game } from "../stores/gameStore";
import { useToast } from "@/hooks/use-toast";

export default function JoinGame() {
  const [filter, setFilter] = useState("all");
  const { games } = useGameStore();
  const { toast } = useToast();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredGames = filter === "all" 
    ? games 
    : games.filter(game => game.sport === filter);
  
  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleJoinGame = () => {
    // Here you would typically implement the join game functionality
    // For now, we'll just show a toast notification
    toast({
      title: "Success!",
      description: `You've joined ${selectedGame?.title}. The organizer has been notified.`,
    });
    setIsModalOpen(false);
  };
  
  return (
    <Layout title="Join a Game">
      <Helmet>
        <title>Join a Game - Virtual League</title>
        <meta name="description" content="Browse and join sports games in your area. Filter by sport type and find the perfect game to join." />
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <div className="filter text-center mb-8">
          <label htmlFor="sport-filter" className="mr-2">Filter by Sport:</label>
          <select 
            id="sport-filter" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">All</option>
            <option value="Hockey">Hockey</option>
            <option value="Soccer">Soccer</option>
            <option value="Mini Golf">Mini Golf</option>
            <option value="Tennis">Tennis</option>
            <option value="Pickleball">Pickleball</option>
          </select>
        </div>
        
        <div>
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id}
              title={game.title}
              sport={game.sport}
              location={game.location}
              onClick={() => handleGameClick(game)}
            />
          ))}
        </div>

        <GameDetailsModal
          game={selectedGame}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onJoin={handleJoinGame}
        />
      </div>
    </Layout>
  );
}
