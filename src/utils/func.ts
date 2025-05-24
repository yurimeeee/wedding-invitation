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
    try {
      document.execCommand('copy');
      alert('복사되었습니다');
    } catch (err) {
      alert('복사 실패');
    }
    document.body.removeChild(textarea);
  }
};