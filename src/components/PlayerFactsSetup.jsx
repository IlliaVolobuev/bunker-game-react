import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { facts } from '../data/data.js';


function PlayerFactsSetup({ state }) {
  const { gameState, setGameState } = state;
  const navigate = useNavigate();

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [chosenFact, setChosenFact] = useState("");
  const [factCategories, setFactCategories] = useState([]);

  const currentPlayer = gameState.players[currentPlayerIndex];

  // Генерация категорий фактов при первой загрузке
  useEffect(() => {
    if (factCategories.length === 0) {
      const categories = generateFactCategories(gameState.numFacts);
      setFactCategories(categories);
      
      // Генерируем факты для всех игроков
      const updatedPlayers = gameState.players.map(player => ({
        ...player,
        facts: generatePlayerFacts(categories)
      }));
      
      setGameState(prev => ({
        ...prev,
        players: updatedPlayers
      }));
    }
  }, []);

  // Функция для выбора случайных категорий
  const generateFactCategories = (numFacts) => {
    const mandatory = ['personalityTrait', 'specialAbility'];
    const optional = Object.keys(facts).filter(
      key => !mandatory.includes(key) && facts[key].length > 0
    );

    const numOptional = numFacts - mandatory.length;
    const selectedOptional = [];

    // Выбираем случайные опциональные категории
    const shuffled = [...optional].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numOptional && i < shuffled.length; i++) {
      selectedOptional.push(shuffled[i]);
    }

    return [...mandatory, ...selectedOptional];
  };

  // Функция для генерации фактов для одного игрока
  const generatePlayerFacts = (categories) => {
    const playerFacts = [];
    
    categories.forEach(category => {
      const categoryFacts = facts[category];
      if (categoryFacts && categoryFacts.length > 0) {
        const randomFact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
        playerFacts.push(`${getCategoryDisplayName(category)}: ${randomFact.name}`);
      }
    });

    return playerFacts;
  };

  // Функция для отображения названия категории
  const getCategoryDisplayName = (category) => {
    const displayNames = {
      gender: "Пол",
      age: "Возраст",
      bodyType: "Телосложение",
      personalityTrait: "Черта характера",
      profession: "Профессия",
      health: "Здоровье",
      hobby: "Хобби",
      phobia: "Фобия",
      backpack: "В рюкзаке",
      largeInventory: "Крупный предмет",
      additionalInfo: "Доп. информация",
      specialAbility: "Особая способность"
    };
    return displayNames[category] || category;
  };

  const handleFactSelect = (fact) => {
    setChosenFact(fact);
  };

  const handleNextPlayer = () => {
    // Сохраняем выбранный факт
    const updatedPlayers = gameState.players.map((p, index) =>
      index === currentPlayerIndex ? { ...p, chosenFact } : p
    );

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers
    }));

    // Переходим к следующему игроку или к раунду
    if (currentPlayerIndex + 1 < gameState.players.length) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setChosenFact("");
    } else {
      navigate("/round");
    }
  };

  if (!currentPlayer || !currentPlayer.facts || currentPlayer.facts.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Игрок: {currentPlayer.name}</h2>
      <h3>Ваша профессия: {currentPlayer.profession || "Не выбрана"}</h3>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Выберите факт, который откроете другим игрокам:
      </p>
      
      <div style={{ marginTop: '15px' }}>
        {currentPlayer.facts.map((fact, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => handleFactSelect(fact)}
              style={{
                padding: '12px 20px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: chosenFact === fact ? '#4CAF50' : '#f0f0f0',
                color: chosenFact === fact ? 'white' : 'black',
                border: '2px solid ' + (chosenFact === fact ? '#45a049' : '#ddd'),
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
            >
              {fact}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleNextPlayer}
        disabled={!chosenFact}
        style={{
          marginTop: '30px',
          padding: '15px 30px',
          backgroundColor: chosenFact ? '#2196F3' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: chosenFact ? 'pointer' : 'not-allowed',
          width: '100%'
        }}
      >
        {currentPlayerIndex + 1 < gameState.players.length ? 'Далее' : 'Начать игру'}
      </button>
      
      <p style={{ marginTop: '15px', textAlign: 'center', color: '#666' }}>
        Игрок {currentPlayerIndex + 1} из {gameState.players.length}
      </p>
    </div>
  );
}

export default PlayerFactsSetup;