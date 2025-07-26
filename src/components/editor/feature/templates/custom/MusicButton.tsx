import { CustomCheckbox } from '@components/ui/checkbox';

const MusicButton = ({
  name,
  path,
  onClick,
  loadingMusic,
  currentMusicPath,
  isPlaying,
  setChecked,
  checked,
}: {
  name: string;
  path: string;
  onClick: (path: string) => void;
  loadingMusic: boolean;
  currentMusicPath: string | null;
  isPlaying: boolean;
  setChecked: (checked: any) => void;
  checked: any;
}) => {
  const isActive = currentMusicPath === path;
  const isDisabled = loadingMusic && !isActive;
  return (
    <div className="flex items-center justify-between">
      <CustomCheckbox text={name} value={checked} onChange={setChecked} />
      {/* <span className="text-sm font-suite text-text-default">{name}</span> */}
      <button
        onClick={() => onClick(path)}
        // onClick={() => handleMusicButtonClick('bgm/classical.mp3')}
        className="h-8 w-8 flex items-center justify-center rounded-md p-1 text-sm font-suite transition-colors duration-200 shadow-default bg-pink-200 text-text-default border border-pink-500"
        // disabled={loadingMusic && currentMusicPath !== 'bgm/classical.mp3'} // 현재 선택된 음악이 아니면서 로딩중일때 비활성화
        disabled={isDisabled} // 현재 선택된 음악이 아니면서 로딩중일때 비활성화
        aria-label={`${name} 음악 ${isActive && isPlaying ? '일시정지' : '재생'}`}
      >
        {isActive && isPlaying ? '⏸' : '▶ '}
      </button>
    </div>
  );
};

export default MusicButton;
