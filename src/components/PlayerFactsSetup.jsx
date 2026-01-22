import React, { useState } from "react";

function PlayerFactsSetup({ state }) {
  const { players, setScreen } = state;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [chosenFact, setChosenFact] = useState("");

  const currentPlayer = players[currentPlayerIndex];

  const handleFactSelect = (fact) => {
    setChosenFact(fact);
  };

  const handleNextPlayer = () => {
    // сохраняем выбранный факт в отдельное поле (не мутируем props напрямую)
    const updatedPlayers = players.map((p, index) =>
      index === currentPlayerIndex ? { ...p, chosenFact } : p
    );

    state.setPlayers(updatedPlayers);

    // переходим к следующему игроку или к раунду
    if (currentPlayerIndex + 1 < players.length) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setChosenFact(""); // сбрасываем выбор для следующего игрока
    } else {
      setScreen("round"); // начинаем раунд игры
    }
  };

  return (
    <div className="player-facts-setup">
      <h2>Игрок: {currentPlayer.name}</h2>
      <h3>Ваша профессия: {currentPlayer.profession}</h3>

      <p>Выберите факт, который откроете другим игрокам:</p>
      <ul>
        {currentPlayer.facts.map((fact, index) => (
          <li key={index}>
            <button
              onClick={() => handleFactSelect(fact)}
              className={chosenFact === fact ? "selected" : ""}
            >
              {fact}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleNextPlayer}
        disabled={!chosenFact}
      >
        Далее
      </button>
    </div>
  );
}

export default PlayerFactsSetup;
