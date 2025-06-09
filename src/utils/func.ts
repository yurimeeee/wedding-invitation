import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('복사되었습니다!');
  } catch (err) {
    // fallback 방식
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // 화면 밖으로
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    console.log(err)
    try {
      document.execCommand('copy');
      alert('복사되었습니다');
    } catch (err) {
      alert('복사 실패');
      console.log(err)
    }
    document.body.removeChild(textarea);
  }
};

export const formattedDate = (date?: string) => {
  if (!date) return null;

  const parsedDate = new Date(date);
  return format(parsedDate, 'PPPP', { locale: ko });
};

export const formatTime = (time?: string) => {
  if (!time) return null;

  const [hour, minute] = time.split(':').map(Number);
  const isPM = hour >= 12;
  const displayHour = hour % 12 || 12;
  if (minute > 0) {
    return `${isPM ? '오후' : '오전'} ${displayHour}시 ${minute}분`;

  } else {
    return `${isPM ? '오후' : '오전'} ${displayHour}시`;
  }
};

export function formatUnixTimestamp(seconds?: number, nanoSeconds?: number): string {
  if (!seconds || !nanoSeconds) {
    return ''
  }
  // 밀리초 단위로 변환
  const timestampMs = seconds * 1000 + Math.floor(nanoSeconds / 1_000_000);

  // Date 객체 생성 (로컬 시간 기준, 한국 기준이면 자동으로 KST)
  const date = new Date(timestampMs);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}



