import React from "react";

function Settings({ state }) {
  const { settings, setSettings, setScreen } = state;

  const handleSoundToggle = () => {
    setSettings({ ...settings, sound: !settings.sound });
  };

  const handleVolumeChange = (e) => {
    setSettings({ ...settings, musicVolume: parseFloat(e.target.value) });
  };

  const handleLanguageChange = (e) => {
    setSettings({ ...settings, language: e.target.value });
  };

  return (
    <div className="settings-screen">
      <h2>Настройки</h2>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={handleSoundToggle}
          />
          Звук
        </label>
      </div>

      <div className="setting-item">
        <label>
          Громкость музыки: {Math.round(settings.musicVolume * 100)}%
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.musicVolume}
            onChange={handleVolumeChange}
          />
        </label>
      </div>

      <div className="setting-item">
        <label>
          Язык:
          <select value={settings.language} onChange={handleLanguageChange}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="pl">Polski</option>
            <option value="de">Deutsch</option>
            <option value="ua">Українська</option>
          </select>
        </label>
      </div>

      <button onClick={() => setScreen("menu")}>Назад в меню</button>
    </div>
  );
}

export default Settings;
