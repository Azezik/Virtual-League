import { useState } from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { useGameStore } from "../stores/gameStore";
import { useLocation } from "wouter";

export default function OrganizeGame() {
  const [formData, setFormData] = useState({
    title: "",
    sport: "Hockey",
    location: "",
    date: "",
    time: "",
    maxPlayers: "10",
    details: ""
  });
  const { addGame } = useGameStore();
  const [, setLocation] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the new game to the store
    addGame(formData);
    
    console.log("Game added to store:", formData);
    alert("Game created successfully! You can view it in the Join a Game page.");
    
    // Reset form
    setFormData({
      title: "",
      sport: "Hockey",
      location: "",
      date: "",
      time: "",
      maxPlayers: "10",
      details: ""
    });
    
    // Redirect to the Join a Game page
    setLocation("/join-a-game");
  };

  return (
    <Layout title="Organize a Game">
      <Helmet>
        <title>Organize a Game - Virtual League</title>
        <meta name="description" content="Create and organize sports games. Specify game details, location and recruit players for your event." />
      </Helmet>
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-1">Ad Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a title for your game ad"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="sport" className="block font-bold mb-1">Sport</label>
            <select 
              id="sport" 
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Hockey">Hockey</option>
              <option value="Soccer">Soccer</option>
              <option value="Mini Golf">Mini Golf</option>
              <option value="Tennis">Tennis</option>
              <option value="Pickleball">Pickleball</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block font-bold mb-1">Location</label>
            <input 
              type="text" 
              id="location" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter location"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block font-bold mb-1">Date</label>
            <input 
              type="date" 
              id="date" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="time" className="block font-bold mb-1">Time</label>
            <input 
              type="time" 
              id="time" 
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="maxPlayers" className="block font-bold mb-1">Maximum Players</label>
            <input 
              type="number" 
              id="maxPlayers" 
              name="maxPlayers"
              value={formData.maxPlayers}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="2"
              max="50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="details" className="block font-bold mb-1">Details</label>
            <textarea 
              id="details" 
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded h-32 resize-vertical"
              placeholder="Provide any additional details about your game"
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-black text-white py-3 px-5 rounded font-bold"
          >
            Create Game
          </button>
        </form>
      </div>
    </Layout>
  );
}
