import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Settings from "./components/Settings";
import AudioPlayer from "./components/AudioPlayer";
import StoryScreen from "./components/StoryScreen";
import PreGameSetup from "./components/PreGameSetup";
import PlayerFactsSetup from "./components/PlayerFactsSetup";
import Round from "./components/Round";
import EndScreen from "./components/EndScreen";

function App() {
  // глобальные настройки
  const [settings, setSettings] = useState({
    sound: true,
    musicVolume: 0.5,
    language: "ru",
  });

  // игровое состояние
  const [gameState, setGameState] = useState({
    players: [],
    numFacts: 3,
    discussionTime: 60,
    currentPlayerIndex: 0,
    roundNumber: 1,
  });

  const state = {
    settings,
    setSettings,
    gameState,
    setGameState,
  };

  return (
    <Router>
      <AudioPlayer play={settings.sound} volume={settings.musicVolume} />

      <Routes>
        <Route path="/" element={<Menu state={state} />} />
        <Route path="/settings" element={<Settings state={state} />} />
        <Route path="/story" element={<StoryScreen state={state} />} />
        <Route path="/pre-game" element={<PreGameSetup state={state} />} />
        <Route path="/player-facts" element={<PlayerFactsSetup state={state} />} />
        <Route path="/round" element={<Round state={state} />} />
        <Route path="/end" element={<EndScreen state={state} />} />
      </Routes>
    </Router>
  );
}

export default App;
