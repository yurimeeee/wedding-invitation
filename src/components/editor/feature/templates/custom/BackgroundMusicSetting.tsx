'use client';

import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

import MusicButton from './MusicButton';
import { storage } from '@lib/firebase';

const BackgroundMusicSetting = ({ setBgm, bgm }: { setBgm: (bgm: string) => void; bgm: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 (재생 중 / 일시정지)
  const [currentMusicPath, setCurrentMusicPath] = useState<string | null>(null); // 현재 선택된 음악 파일 경로
  const [loadingMusic, setLoadingMusic] = useState(false); // 음악 로딩 중 상태
  const [nowPlayingInButton, setNowPlayingInButton] = useState<string | null>(null); // 버튼에 표시되는 현재 재생 중인 음악 경로

  useEffect(() => {
    const loadAndPlayMusic = async () => {
      if (!currentMusicPath) {
        // 경로가 없으면 기존 오디오 중지 및 초기화
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = ''; // src 초기화
          audioRef.current = null;
        }
        setIsPlaying(false);
        setLoadingMusic(false);
        return;
      }
      setLoadingMusic(true); // 새 음악 로딩 시작
      try {
        // 1. Firebase Storage에서 URL 가져오기
        const fileRef = ref(storage, currentMusicPath);
        const url = await getDownloadURL(fileRef);

        // 2. Audio 객체 업데이트 또는 새로 생성
        if (audioRef.current) {
          // 기존 오디오가 있다면 중지하고 src 변경
          audioRef.current.pause();
          audioRef.current.src = url;
          audioRef.current.load(); // src 변경 후 로드
        } else {
          // 오디오 객체가 없으면 새로 생성
          const audio = new Audio(url);
          audio.loop = true;
          audio.volume = 0.5; // 필요에 따라 볼륨 설정
          audioRef.current = audio;

          // 오디오 로딩 완료 시점에 isPlaying 상태 업데이트
          // (선택 사항: 로딩 완료 후 바로 재생하고 싶다면 아래를 사용)
          audio.oncanplaythrough = () => {
            if (currentMusicPath === nowPlayingInButton) {
              // 현재 버튼이 선택한 음악인지 확인
              audioRef.current
                ?.play()
                .then(() => setIsPlaying(true))
                .catch((e) => {
                  console.warn('음악 자동 재생 실패:', e);
                  // 사용자에게 직접 재생하도록 안내할 수 있음
                  setIsPlaying(false); // 자동 재생 실패 시 일시정지 상태로
                });
            }
          };
        }

        // 새로운 음악이 로드되면 자동으로 재생 (현재 재생 중이 아니었다면)
        // audioRef.current?.play().then(() => setIsPlaying(true)).catch(e => {
        //   console.warn('음악 자동 재생 실패:', e);
        //   // 사용자에게 직접 재생하도록 안내할 수 있음
        //   setIsPlaying(false); // 자동 재생 실패 시 일시정지 상태로
        // });
        setIsPlaying(true); // 일단 isPlaying을 true로 설정 (아래 toggleMusic에서 실제로 제어)
      } catch (error) {
        console.error('음악 URL 가져오기 또는 로드 실패:', error);
        // 오류 처리: 사용자에게 알림
        setIsPlaying(false);
      } finally {
        setLoadingMusic(false); // 음악 로딩 완료
      }
    };
    loadAndPlayMusic();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // src 해제
        audioRef.current = null;
      }
    };
  }, [currentMusicPath]);

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
          setIsPlaying(false);
        });
    }
  };
  // 버튼 클릭 핸들러
  const handleMusicButtonClick = (path: string) => {
    // 만약 이미 이 음악이 선택되어 있다면, 재생/일시정지만 토글
    if (currentMusicPath === path) {
      toggleMusic();
    } else {
      // 다른 음악이 선택되었다면, 새로운 음악으로 변경하고 재생 시작
      if (audioRef.current) {
        setNowPlayingInButton(path);
        audioRef.current.pause(); // 기존 음악 중지
      }
      setCurrentMusicPath(path); // 새 음악 경로 설정
      setIsPlaying(true); // 새 음악으로 변경되면 일단 재생 시작 상태로
    }
  };

  const bgmList = [
    {
      name: 'calm at sea',
      path: 'bgm/calm-at-sea.mp3',
    },
    {
      name: 'classical',
      path: 'bgm/classical.mp3',
    },
    {
      name: 'jazzballad',
      path: 'bgm/jazz-ballad.mp3',
    },
    {
      name: 'me and you',
      path: 'bgm/me-and-you.mp3',
    },
    {
      name: 'my love',
      path: 'bgm/my-love.mp3',
    },
    {
      name: 'relaxing piano',
      path: 'bgm/relaxing-piano.mp3',
    },
    {
      name: 'soulful journey',
      path: 'bgm/soulful-journey.mp3',
    },
    {
      name: 'summer days',
      path: 'bgm/summer-days.mp3',
    },
    {
      name: 'sunset chillhop',
      path: 'bgm/sunset-chillhop.mp3',
    },
    {
      name: 'white reflection',
      path: 'bgm/white-reflection.mp3',
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {bgmList.map((item) => (
        <MusicButton
          key={item.path}
          name={item.name}
          path={item.path}
          onClick={handleMusicButtonClick}
          loadingMusic={loadingMusic}
          currentMusicPath={currentMusicPath}
          isPlaying={isPlaying}
          setChecked={() => {
            if (bgm === item.path) {
              setBgm('');
            } else {
              setBgm(item.path);
            }
          }}
          checked={bgm == item.path}
        />
      ))}
    </div>
  );
};

export default BackgroundMusicSetting;
