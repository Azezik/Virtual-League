import { useState } from "react";
import Layout from "@/components/Layout";
import PlayerCard from "@/components/PlayerCard";
import { Helmet } from "react-helmet";

// Player data
const players = [
  { name: "Alex Johnson", sport: "Hockey", level: "Casual" },
  { name: "Maria Gomez", sport: "Soccer", level: "Competitive" },
  { name: "Ethan Chu", sport: "Mini Golf", level: "Beginner" },
  { name: "Samantha Lee", sport: "Tennis", level: "Beginner" },
  { name: "Jordan Kim", sport: "Pickleball", level: "Casual" }
];

export default function PlayerDatabase() {
  const [filter, setFilter] = useState("all");
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  const filteredPlayers = filter === "all" 
    ? players 
    : players.filter(player => player.sport.toLowerCase().replace(' ', '') === filter);
  
  return (
    <Layout title="Player Database">
      <Helmet>
        <title>Player Database - Virtual League</title>
        <meta name="description" content="Browse our database of players by sport and skill level. Find players for your game or team." />
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <div className="filter text-center mb-8">
          <label htmlFor="sport-select" className="mr-2">Filter by Sport:</label>
          <select 
            id="sport-select" 
            value={filter} 
            onChange={handleFilterChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">All</option>
            <option value="hockey">Hockey</option>
            <option value="soccer">Soccer</option>
            <option value="minigolf">Mini Golf</option>
            <option value="tennis">Tennis</option>
            <option value="pickleball">Pickleball</option>
          </select>
        </div>
        
        <div>
          {filteredPlayers.map((player, index) => (
            <PlayerCard 
              key={index}
              name={player.name}
              sport={player.sport}
              level={player.level}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
