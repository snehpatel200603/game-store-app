import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../config";
import "./PublisherSelector.css";

const PublisherSelector = ({ onSelectPublisher }) => {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const { data } = await axios.get(
          `https://api.rawg.io/api/publishers?key=${API_KEY}`
        );
        setPublishers(data.results);
      } catch (error) {
        console.error("Error fetching publishers: ", error);
      }
    };

    fetchPublishers();
  }, []);

  return (
    <div className="publisher-selector">
      <select
        onChange={(e) => onSelectPublisher(e.target.value)}
        defaultValue=""
      >
        <option value="">Select a Publisher</option>
        {publishers.map((publisher) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PublisherSelector;
