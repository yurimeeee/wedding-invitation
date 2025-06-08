import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@components/ui/dialog';

import { CustomInfoText } from '@components/ui/CustomInfoText';
import { GREETING_MESSAGES } from '@utils/greetingMsg';
import { TemplatesData } from '@type/templates';
import { useState } from 'react';

type GreetingCategory = { text: string; value: string };
type Category = 'long' | 'short' | 'love_poem' | 'quotes' | 'polite';

type SampleGreetingMessageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: TemplatesData;
  setData: any;
};

export default function SampleGreetingMessageModal({ open, onOpenChange, title, data, setData }: SampleGreetingMessageModalProps) {
  const category: GreetingCategory[] = [
    { text: '장문형', value: 'long' },
    { text: '간결한', value: 'short' },
    { text: '사랑시', value: 'love_poem' },
    { text: '명언', value: 'quotes' },
    { text: '정중한', value: 'polite' },
  ];
  const [activeTab, setActiveTab] = useState<Category>('long');
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
                setActiveTab(item.value as Category);
              }}
              className={`px-3 py-1 rounded-full text-text-defult text-sm transition-colors duration-200 shadow-default
              ${activeTab === item.value ? 'bg-pink-400 text-text-default border border-pink-500' : 'bg-pink-200 text-muted-foreground border border-pink-200'}`}
            >
              {item.text}
            </div>
          ))}
        </div>
        {GREETING_MESSAGES[activeTab]?.map((item: any, index: number) => (
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
