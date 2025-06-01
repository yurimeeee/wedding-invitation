import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@components/ui/dialog';

import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { ReactNode } from 'react';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';

type ShareSettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: 'KAKAO' | 'LINK';
  data: TemplatesData;
  setData: any;
};

const ShareBox = styled.div`
  background: #fbfbfb;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const Trigger = styled(AccordionTrigger)`
  background: white;
  padding: 16px 24px;
  box-shadow: 0 3px 4px -2px rgb(0 0 0 / 0.2);
`;
const Content = styled(AccordionContent)`
  background: #fbfbfb;
  padding: 24px 36px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 3px 4px -2px rgb(0 0 0 / 0.2);
`;

export default function ShareSettingsModal({ open, onOpenChange, title, type, data, setData }: ShareSettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          <CustomInfoText text="공유 썸네일 이미지의 권장 비율은 가로 1 : 세로 1 입니다." className="mb-1" />
          <CustomInfoText text="기기 및 브라우저 캐시 정책에 따라 최대 24시간 뒤에 반영될 수 있습니다." className="mb-1" />
          <CustomInfoText text="직접 캐시 초기화를 하면 바로 반영됩니다." className="mb-5" />
          {type === 'KAKAO' ? (
            <div>
              <ShareBox className="shadow-md md p-4 rounded-lg">최대 20MB 이하 JPEG / JPG / PNG 파일만 가능</ShareBox>
              <CustomInput
                type="text"
                placeholder="타이틀"
                value={data?.groom_parents?.mom?.name}
                onChange={(e) => setData('groom_parents', 'mom', 'name', e.target.value)}
                className="w-full sm:max-w-[270px]"
              />
            </div>
          ) : (
            <div>
              <ShareBox className="shadow-md md p-4 rounded-lg">최대 20MB 이하 JPEG / JPG / PNG 파일만 가능</ShareBox>
              <CustomInput
                type="text"
                placeholder="타이틀"
                value={data?.groom_parents?.mom?.name}
                onChange={(e) => setData('groom_parents', 'mom', 'name', e.target.value)}
                className="w-full sm:max-w-[270px]"
              />
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
