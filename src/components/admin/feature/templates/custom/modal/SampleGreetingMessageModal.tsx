import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@components/ui/dialog';
import { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import { CiSquarePlus } from 'react-icons/ci';
import { CustomBox } from '@components/ui/CustomBox';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { GRAY_400 } from '@styles/colors';
import { GREETING_MESSAGES } from '@utils/greetingMsg';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';

type GreetingCategory = { text: string; value: string };
type Category = 'long' | 'short' | 'love_poem' | 'quotes' | 'polite';

type SampleGreetingMessageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: 'KAKAO' | 'LINK';
  data: TemplatesData;
  setData: any;
};

const ShareBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbfbfb;
  width: 240px;
  aspect-ratio: 1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export default function SampleGreetingMessageModal({ open, onOpenChange, title, type, data, setData }: SampleGreetingMessageModalProps) {
  // const category: GreetingCategory[] = ['long', 'short', 'love_poem', 'quotes', 'polite'];
  const category: GreetingCategory[] = [
    { text: '장문형', value: 'long' },
    { text: '간결한', value: 'short' },
    { text: '사랑시', value: 'love_poem' },
    { text: '명언', value: 'quotes' },
    { text: '정중한', value: 'polite' },
  ];
  const [activeTap, setActiveTap] = useState<Category>('long');
  const handleSave = (value: string) => {
    setData({
      ...data,
      main: {
        ...data.main,
        intro_content: value,
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <CustomInfoText text="설레는 마음으로 두 분의 사랑을 전해보세요" className="mb-5" />
        <div className="flex flex-wrap gap-2 items-center">
          {category?.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveTap(item.value as Category);
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        {GREETING_MESSAGES[activeTap]?.map((item: any, index: number) => (
          <button key={index} onClick={() => handleSave(item.msg)} className="text-[#666666] text-center text-sm border rounded-md p-6 shadow-md whitespace-pre-wrap w-full">
            {item.msg.split('\n').map((line: string, idx: number) => (
              <p key={`${index}-${idx}`} style={{ textAlign: 'center' }}>
                <span>{line}</span>
                <br />
              </p>
            ))}
          </button>
        ))}

        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
