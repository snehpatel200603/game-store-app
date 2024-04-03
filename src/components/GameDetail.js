import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_KEY } from "../config";
import "./GameDetail.css"; // Make sure you have this CSS file for styling

const GameDetail = () => {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;
      try {
        const { data } = await axios.get(url);
        setGameDetails(data);
      } catch (error) {
        console.error("Error fetching game details: ", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div className="game-details">
      <h2>{gameDetails.name}</h2>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <p>Release Date: {gameDetails.released}</p>
      <p>Rating: {gameDetails.rating} / 5</p>
      <div>
        Description:{" "}
        <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
      </div>
      <p>Genres: {gameDetails.genres.map((genre) => genre.name).join(", ")}</p>
      <p>
        Platforms:{" "}
        {gameDetails.platforms
          .map((platform) => platform.platform.name)
          .join(", ")}
      </p>
      <p>
        Publishers:{" "}
        {gameDetails.publishers.map((publisher) => publisher.name).join(", ")}
      </p>
    </div>
  );
};

export default GameDetail;
