'use client';

import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

import MusicButton from './MusicButton';
import { storage } from '@lib/firebase';

const BackgroundMusicSetting = ({ setBgm, bgm }: { setBgm: (bgm: string) => void; bgm: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 (재생 중 / 일시정지)
  const [currentMusicPath, setCurrentMusicPath] = useState<string | null>(null); // 현재 선택된 음악 파일 경로
  const [loadingMusic, setLoadingMusic] = useState(false); // 음악 로딩 중 상태
  const [nowPlayingInButton, setNowPlayingInButton] = useState<string | null>(null); // 버튼에 표시되는 현재 재생 중인 음악 경로

  // const fetchMusicPlay = async (path: string) => {
  //   setNowPlaying(path);
  //   const fileRef = ref(storage, path);
  //   const url = await getDownloadURL(fileRef);
  //   console.log(url);
  //   setMusicUrl(url);
  // };
  // console.log('musicUrl', musicUrl);
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
      // const fileRef = ref(storage, musicFilePath);
      // const url = await getDownloadURL(fileRef);
      // console.log(url);
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

  // useEffect(() => {
  //   if (!musicUrl) return;
  //   // const audio = new Audio('/assets/bgm/romantic-wedding-inspiring-piano-376014.mp3');
  //   const audio = new Audio(
  //     // 'https://firebasestorage.googleapis.com/v0/b/my-wedding-76cc0.firebasestorage.app/o/bgm%2Fcalm-at-sea.mp3?alt=media&token=3ee490a0-f3d0-4ebd-aece-3a94a40cb56f'
  //     musicUrl
  //   );
  //   audio.loop = true;
  //   audio.volume = 0.5;
  //   audioRef.current = audio;

  //   return () => {
  //     audio.pause();
  //   };
  // }, [musicUrl]);

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
    // 1. 만약 이미 이 음악이 선택되어 있다면, 재생/일시정지만 토글
    if (currentMusicPath === path) {
      toggleMusic();
    } else {
      // 2. 다른 음악이 선택되었다면, 새로운 음악으로 변경하고 재생 시작
      if (audioRef.current) {
        setNowPlayingInButton(path);
        audioRef.current.pause(); // 기존 음악 중지
      }
      setCurrentMusicPath(path); // 새 음악 경로 설정 (useEffect 트리거)
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
          checked={bgm === item.path}
        />
      ))}
      {/* <MusicButton
        name="calm-at-sea"
        path="bgm/calm-at-sea.mp3"
        onClick={handleMusicButtonClick}
        loadingMusic={loadingMusic}
        currentMusicPath={currentMusicPath}
        isPlaying={isPlaying}
        setChecked={() => {
          if (bgm === 'bgm/calm-at-sea.mp3') {
            setBgm('');
          } else {
            setBgm('bgm/calm-at-sea.mp3');
          }
        }}
        checked={bgm === 'bgm/calm-at-sea.mp3'}
      />
      <MusicButton
        name="classical"
        path="bgm/classical.mp3"
        onClick={handleMusicButtonClick}
        loadingMusic={loadingMusic}
        currentMusicPath={currentMusicPath}
        isPlaying={isPlaying}
        setChecked={() => {
          if (bgm === 'bgm/classical.mp3') {
            setBgm('');
          } else {
            setBgm('bgm/classical.mp3');
          }
        }}
        checked={bgm === 'bgm/calm-at-sea.mp3'}
      /> */}
      {/* <div>
        <span className="mr-2">calm-at-sea</span>
        <button
          onClick={() => handleMusicButtonClick('bgm/calm-at-sea.mp3')}
          className="h-10 w-10 flex items-center justify-center rounded-md p-1 text-sm font-suite transition-colors duration-200 shadow-default bg-pink-200 text-text-default border border-pink-500 max-w-[72px]"
          disabled={loadingMusic && currentMusicPath !== 'bgm/calm-at-sea.mp3'} // 현재 선택된 음악이 아니면서 로딩중일때 비활성화
          aria-label={currentMusicPath === 'bgm/calm-at-sea.mp3' && isPlaying ? 'calm-at-sea 음악 일시정지' : 'calm-at-sea 음악 재생'}
        >
          {currentMusicPath === 'bgm/calm-at-sea.mp3' && isPlaying ? '⏸' : '▶ '}
        </button>
      </div>

      <div>
        <span className="mr-2">classical</span>
        <button
          onClick={() => handleMusicButtonClick('bgm/classical.mp3')}
          className="h-10 w-10 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loadingMusic && currentMusicPath !== 'bgm/classical.mp3'} // 현재 선택된 음악이 아니면서 로딩중일때 비활성화
          aria-label={currentMusicPath === 'bgm/classical.mp3' && isPlaying ? 'classical 음악 일시정지' : 'classical 음악 재생'}
        >
          {currentMusicPath === 'bgm/classical.mp3' && isPlaying ? '⏸' : '▶ '}
        </button>
      </div> */}
    </div>
  );
};

export default BackgroundMusicSetting;
