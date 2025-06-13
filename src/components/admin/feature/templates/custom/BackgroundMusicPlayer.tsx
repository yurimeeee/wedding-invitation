'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/Sounds/AVES - Matchal Latte.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('재생 실패:', e);
        });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-pink">
      <button onClick={toggleMusic} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
        {isPlaying ? '⏸ 배경음악 끄기' : '▶ 배경음악 켜기'}
      </button>
    </div>
  );
}
