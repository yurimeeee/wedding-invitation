'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      audio.play().catch((e) => {
        console.log('Autoplay failed. User interaction is required.');
      });
    };

    // 브라우저 정책 상 사용자 상호작용 후 재생
    document.addEventListener('click', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  return <audio ref={audioRef} src="/assets/bgm/romantic-wedding-inspiring-piano-376014.mp3" loop preload="auto" volume={0.5} />;
}
