'use client';

import { useEffect, useRef, useState } from 'react';

const BackgroundMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // const audio = new Audio('/assets/bgm/romantic-wedding-inspiring-piano-376014.mp3');
    const audio = new Audio(
      'https://firebasestorage.googleapis.com/v0/b/my-wedding-76cc0.firebasestorage.app/o/bgm%2Fcalm-at-sea.mp3?alt=media&token=3ee490a0-f3d0-4ebd-aece-3a94a40cb56f'
    );
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
    // <div className="fixed bottom-4 right-4 z-50 bg-pink">
    <div className="fixed bottom-4 right-4 z-50 bg-pink">
      <button onClick={toggleMusic} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
        {isPlaying ? '⏸' : '▶ '}
      </button>
    </div>
  );
};

export default BackgroundMusicPlayer;
