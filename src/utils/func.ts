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




