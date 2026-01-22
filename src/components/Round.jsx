import React, { useState } from "react";

function Round({ state }) {
  const { players, setScreen } = state;
  const [revealedFacts, setRevealedFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const handleRevealFact = () => {
    if (currentFactIndex < players.length) {
      const newFact = {
        player: players[currentFactIndex].name,
        fact: players[currentFactIndex].chosenFact,
      };
      setRevealedFacts([...revealedFacts, newFact]);
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      // Все факты раскрыты, переход к голосованию или следующему этапу
      setScreen("end"); // Для примера сразу конец игры
    }
  };

  return (
    <div className="round-screen">
      <h2>Раунд игры</h2>

      {currentFactIndex < players.length ? (
        <>
          <p>Игрок {players[currentFactIndex].name}, готовьтесь раскрыть факт.</p>
          <button onClick={handleRevealFact}>Показать выбранный факт</button>
        </>
      ) : (
        <p>Все факты раскрыты.</p>
      )}

      <h3>Раскрытые факты:</h3>
      <ul>
        {revealedFacts.map((item, index) => (
          <li key={index}>
            {item.player}: {item.fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Round;
