import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu-screen">
      <h1 className="menu-title">Бункер</h1>
      <div className="menu-buttons">
        {/* Кнопка Играть */}
        <button onClick={() => navigate("/story")}>
          Играть
        </button>

        {/* Кнопка Настройки */}
        <button onClick={() => navigate("/settings")}>
          Настройки
        </button>
      </div>
    </div>
  );
}

export default Menu;
