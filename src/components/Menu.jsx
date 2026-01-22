import React from "react";

function Menu({ state }) {
  const { setScreen } = state;

  return (
    <div className="menu-screen">
      <h1 className="menu-title">Бункер</h1>
      <div className="menu-buttons">
        {/* Кнопка Играть */}
        <button onClick={() => setScreen("story")}>Играть</button>

        {/* Кнопка Настройки */}
        <button onClick={() => setScreen("settings")}>Настройки</button>
      </div>
    </div>
  );
}

export default Menu;
