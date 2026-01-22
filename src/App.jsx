import React, { useState } from "react";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import AudioPlayer from "./components/AudioPlayer";
import StoryScreen from "./components/StoryScreen";
import PreGameSetup from "./components/PreGameSetup";
import PlayerFactsSetup from "./components/PlayerFactsSetup";
import Round from "./components/Round";
import EndScreen from "./components/EndScreen";

function App() {
  // экран: menu, settings, story, preGame, playerFacts, round, end
  const [screen, setScreen] = useState("menu");

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
    screen,
    setScreen,
    settings,
    setSettings,
    gameState,
    setGameState,
  };

  return (
    <div>
      {screen === "menu" && <Menu state={state} />}
      {screen === "settings" && <Settings state={state} />}
      {screen === "story" && <StoryScreen state={state} />}
      {screen === "preGameSetup" && <PreGameSetup state={state} />}
      {screen === "playerFactsSetup" && <PlayerFactsSetup state={state} />}
      {screen === "round" && <Round state={state} />}
      {screen === "end" && <EndScreen state={state} />}

      <AudioPlayer play={settings.sound} volume={settings.musicVolume} />
    </div>
  );
}

export default App;
