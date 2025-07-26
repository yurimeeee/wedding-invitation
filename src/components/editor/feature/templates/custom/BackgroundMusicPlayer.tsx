'use client';

import { FaPause, FaPlay } from 'react-icons/fa';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

import { storage } from '@lib/firebase';

const BackgroundMusicPlayer = ({ bgm, display }: { bgm?: string; display?: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  useEffect(() => {
    let audio: HTMLAudioElement;

    const setupAudio = async () => {
      if (!bgm) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
        audioRef.current = null;
        setCurrentAudioUrl(null);
        setIsPlaying(false);
        return;
      }

      let urlToPlay = bgm;
      if (!bgm.startsWith('http')) {
        try {
          const fileRef = ref(storage, bgm);
          urlToPlay = await getDownloadURL(fileRef);
          setCurrentAudioUrl(urlToPlay);
        } catch (error) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
          }
          audioRef.current = null;
          setCurrentAudioUrl(null);
          setIsPlaying(false);
          return;
        }
      } else {
        setCurrentAudioUrl(bgm);
      }

      if (audioRef.current) {
        audio = audioRef.current;
        audio.pause();
        audio.src = urlToPlay;
        audio.load();
      } else {
        audio = new Audio(urlToPlay);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;
      }

      if (display) {
        if (!isPlaying || audio.src !== urlToPlay) {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (e: any) {
            setIsPlaying(false);
          }
        }
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    setupAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      setIsPlaying(false);
      setCurrentAudioUrl(null);
    };
  }, [bgm, display]);

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
  if (!display) {
    return null;
  }
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-pink">
      <button
        onClick={toggleMusic}
        className={`w-10 h-10 flex items-center justify-center ${isPlaying ? 'bg-gray-500/60' : 'bg-gray-500/40'} transition-all duration-300 text-white rounded-lg shadow-md`}
      >
        {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
      </button>
    </div>
  );
};

export default BackgroundMusicPlayer;
