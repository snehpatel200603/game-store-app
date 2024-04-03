// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameList from "./components/GameList";
import GameDetail from "./components/GameDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/game/:gameId" element={<GameDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
