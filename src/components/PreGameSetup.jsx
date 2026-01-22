import React, { useState } from "react";

function PreGameSetup({ state }) {
  const { setScreen, gameState, setGameState } = state;

  // Локальные состояния для формы
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(["", ""]);
  const [numFacts, setNumFacts] = useState(3);
  const [discussionTime, setDiscussionTime] = useState(60); // в секундах

  // Обновление имени игрока
  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  // Добавление нового игрока
  const addPlayer = () => {
    setPlayerNames([...playerNames, ""]);
    setNumPlayers(numPlayers + 1);
  };

  // Удаление игрока
  const removePlayer = (index) => {
    if (numPlayers <= 2) return; // минимум 2 игрока
    const newNames = playerNames.filter((_, i) => i !== index);
    setPlayerNames(newNames);
    setNumPlayers(numPlayers - 1);
  };

  const handleStartGame = () => {
    // Сохраняем игроков и настройки в глобальном состоянии через setGameState
    const players = playerNames.map(name => ({
      name: name || "Игрок",
      profession: null,
      facts: [],
      chosenFact: null,
    }));

    setGameState(prev => ({
      ...prev,
      players,
      numFacts,
      discussionTime
    }));

    // Переходим к следующему экрану
    setScreen("playerFactsSetup");
  };

  return (
    <div className="pre-game-setup">
      <h2>Предигровая настройка</h2>

      <div className="players">
        <h3>Игроки:</h3>
        {playerNames.map((name, index) => (
          <div key={index} className="player-input">
            <input
              type="text"
              placeholder={`Игрок ${index + 1}`}
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
            {numPlayers > 2 && (
              <button onClick={() => removePlayer(index)}>Удалить</button>
            )}
          </div>
        ))}
        <button onClick={addPlayer}>Добавить игрока</button>
      </div>

      <div className="settings">
        <label>
          Количество фактов на игрока:
          <input
            type="number"
            min="1"
            value={numFacts}
            onChange={(e) => setNumFacts(parseInt(e.target.value))}
          />
        </label>

        <label>
          Время обсуждения (сек):
          <input
            type="number"
            min="10"
            value={discussionTime}
            onChange={(e) => setDiscussionTime(parseInt(e.target.value))}
          />
        </label>
      </div>

      <button onClick={handleStartGame}>Начать игру</button>
      <button onClick={() => setScreen("menu")}>Назад в меню</button>
    </div>
  );
}

export default PreGameSetup;
