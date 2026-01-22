import React, { useEffect, useRef } from "react";
import musicFile from "../assets/music.mp3"; // путь к вашей музыке

function AudioPlayer({ play, volume }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true; // зацикливаем музыку
    audio.volume = volume;

    if (play) {
      audio.play().catch((err) => {
        console.log("Ошибка воспроизведения музыки:", err);
      });
    } else {
      audio.pause();
    }
  }, [play, volume]);

  return <audio ref={audioRef} src={musicFile} />;
}

export default AudioPlayer;
