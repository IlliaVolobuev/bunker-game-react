import React from "react";

function EndScreen({ state }) {
  const { players, setScreen } = state;

  // Игроки, которые остались в бункере (например, последние два)
  const remainingPlayers = players.filter(p => !p.eliminated);

  const handleRestart = () => {
    // Сброс состояния игры
    setScreen("menu");
  };

  return (
    <div className="end-screen">
      <h2>Игра окончена!</h2>
      <p>В бункере остались:</p>
      <ul>
        {remainingPlayers.map((player, index) => (
          <li key={index}>
            {player.name} ({player.profession})
          </li>
        ))}
      </ul>

      <h3>Все игроки и их факты:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name} ({player.profession}):{" "}
            {player.facts.join(", ")}
          </li>
        ))}
      </ul>

      <button onClick={handleRestart}>Вернуться в меню</button>
    </div>
  );
}

export default EndScreen;
