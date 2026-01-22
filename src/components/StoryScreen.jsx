import React, { useEffect, useRef } from "react";
import storyAudio from "../assets/story.mp3"; // <- импорт mp3 через ES-модуль

function StoryScreen({ state }) {
  const { setScreen } = state;
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(err => console.log("Ошибка воспроизведения:", err));

      // Переход к предигровой настройке после окончания аудио
      audio.onended = () => {
        setScreen("preGameSetup");
      };
    }
  }, [setScreen]);

  return (
    <div className="story-screen">
      <h2>История мира</h2>
      <p>
        В 2054 году человечество столкнулось с глобальной катастрофой. 
        На Земле произошла серия экологических катаклизмов, которые разрушили города и инфраструктуру. 
        Люди были вынуждены искать укрытия в подземных бункерах, 
        чтобы выжить в новом опасном мире. Каждый бункер стал небольшим обществом со своими законами, правилами и тайнами. 
        Теперь вы — один из выживших, и ваша цель — сохранить жизнь и раскрыть секреты других игроков, чтобы остаться последними в бункере.
      </p>

      <p>
        Слушайте внимательно: выбор действий, раскрытие фактов и стратегия обсуждений будут определять вашу судьбу. 
        Помните: не все игроки расскажут правду.
      </p>

      {/* Аудио озвучка истории */}
      <audio ref={audioRef} src={storyAudio} />
    </div>
  );
}

export default StoryScreen;
