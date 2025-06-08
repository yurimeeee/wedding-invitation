'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { useEffect, useState } from 'react';

import AOS from 'aos';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';
import theme from '@styles/theme';

const TabItem = styled.div<{ active: boolean }>`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;

  transition: all.3s;
  color: ${(props) => {
    return props.active ? theme.color.textDefault : theme.color.gray_400;
  }};
  border-bottom: ${(props) => {
    return props.active ? `2px solid ${theme.color.textDefault}` : `1px solid ${theme.color.gray_300}`;
  }};
`;

type FamilyInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: string;
  data: TemplatesData;
  setData?: any;
};

export default function FamilyInfoModal({ open, onOpenChange, type, data, setData }: FamilyInfoModalProps) {
  const tabList: { text: string; value: string }[] = [
    { text: '신랑에게', value: 'groom' },
    { text: '신부에게', value: 'bride' },
  ];
  const [activeTap, setActiveTap] = useState<string>('groom');
  useEffect(() => {
    AOS.init(); // 최초 초기화
  }, []);

  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [activeTap]);

  const renderItem = (type: string, name: string, phone: string) => {
    return (
      <div className="text-[#666666] text-center text-sm border rounded-md p-6 shadow-md whitespace-pre-wrap w-full">
        <div className="flex justify-between w-full">
          <p>{type}</p>
          <p className="text-text-default">{name}</p>
        </div>
        <div className="flex justify-center mt-6 gap-x-3 text-white text-center *:h-10 *:align-baseline *:flex *:items-center *:justify-center">
          <a href={`sms:${phone}`} className="w-1/2 rounded-lg" style={{ backgroundColor: ` rgb(235, 173, 173)` }}>
            문자 보내기
          </a>
          <a href={`sms:${phone}`} className="w-1/2 rounded-lg" style={{ backgroundColor: ` rgb(17, 17, 17)`, opacity: `0.7` }}>
            전화하기
          </a>
        </div>
      </div>
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-chosun">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">축하 연락하기</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-5" style={{ color: ` rgb(209, 146, 146)` }}>
            직접 축하의 마음을 전해보세요
          </p>
          <div className="flex">
            {tabList?.map((item, idx) => (
              <TabItem key={idx} active={item.value === activeTap} onClick={() => setActiveTap(item.value)}>
                {item.text}
              </TabItem>
            ))}
          </div>
          {activeTap === 'groom' ? (
            <div className="flex flex-col gap-4 mt-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="false">
              {renderItem('신랑', (data?.full_name_display && data?.groom_first_name && data?.groom_first_name + data?.groom_last_name) || '철수', data?.groom_phone)}
              {data?.groom_dad_phone && renderItem('신랑 아버지', data?.groom_parents?.dad?.name || 'OOO', data?.groom_dad_phone)}
              {data?.groom_mom_phone && renderItem('신랑 어머니', data?.groom_parents?.mom?.name || 'OOO', data?.groom_mom_phone)}
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="false">
              {renderItem('신부', (data?.full_name_display && data?.bride_first_name && data?.bride_first_name + data?.bride_last_name) || '영희', data?.bride_phone)}
              {data?.bride_dad_phone && renderItem('신부 아버지', data?.bride_parents?.dad?.name || 'OOO', data?.bride_dad_phone)}
              {data?.bride_mom_phone && renderItem('신부 어머니', data?.bride_parents?.dad?.name || 'OOO', data?.bride_mom_phone)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
