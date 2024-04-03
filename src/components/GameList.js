import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PublisherSelector from "./PublisherSelector";
import { API_KEY } from "../config";
import "./GameList.css"; // Ensure you have this CSS file for styling

const GameList = () => {
  const [games, setGames] = useState([]);
  const [publisherId, setPublisherId] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchGames = async () => {
      let url = `https://api.rawg.io/api/games?key=${API_KEY}${
        publisherId ? `&publishers=${publisherId}` : ""
      }`;
      try {
        const { data } = await axios.get(url);
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchGames();
  }, [publisherId]);

  // Function to handle game item click, navigating to the GameDetail component
  const handleGameClick = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <div>
      <PublisherSelector onSelectPublisher={setPublisherId} />
      <div className="game-list">
        {games.map((game) => (
          <div
            key={game.id}
            className="game-item"
            onClick={() => handleGameClick(game.id)}
          >
            <img src={game.background_image} alt={game.name} />
            <h3>{game.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
