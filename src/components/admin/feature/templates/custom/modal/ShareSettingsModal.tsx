import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import { GRAY_300, GRAY_400 } from '@styles/colors';
import { ReactNode, useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import { CiSquarePlus } from 'react-icons/ci';
import { CustomBox } from '@components/ui/CustomBox';
import { CustomButton } from '@components/ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';
import theme from '@styles/theme';

type ShareSettingsModalProps = {
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
  /* border: 1px solid ${theme.color.gray_300}; */
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
  const [localData, setLocalData] = useState<TemplatesData>({
    ...data,
  });
  useEffect(() => {
    if (open) {
      setLocalData({ ...data });
    }
  }, [open, data]);
  const handleChange = (key: keyof TemplatesData, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setData(localData); // 부모의 setFormData 호출
    onOpenChange(false); // 모달 닫기
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <CustomInfoText text="공유 썸네일 이미지의 권장 비율은 가로 1 : 세로 1 입니다." />
        <CustomInfoText text="기기 및 브라우저 캐시 정책에 따라 최대 24시간 뒤에 반영될 수 있습니다." />
        <CustomInfoText text="직접 캐시 초기화를 하면 바로 반영됩니다." className="mb-5" />

        {type === 'KAKAO' ? (
          <div className="max-w-[320px] mx-auto shadow-xl rounded-md">
            <div className="flex flex-col gap-3">
              <ShareBox className="flex flex-col gap-3">
                <CiSquarePlus size={30} color={GRAY_400} />
                <p className="text-[12px] font-suite text-gray-400 text-center">
                  최대 20MB 이하
                  <br /> JPEG / JPG / PNG 파일만 가능
                </p>
              </ShareBox>
              <div className="bg-gray-300 flex flex-col gap-3 p-3">
                <CustomInput
                  type="text"
                  placeholder="제목"
                  value={localData?.share_kakao_title || ''}
                  onChange={(e) => handleChange('share_kakao_title', e.target.value)}
                  className="w-full"
                />
                <CustomInput
                  type="text"
                  placeholder="설명"
                  value={localData?.share_kakao_desc || ''}
                  onChange={(e) => handleChange('share_kakao_desc', e.target.value)}
                  className="w-full"
                />
                <Button text="모바일 청첩장 보기" onClick={() => {}} disabled variant={'outline'} className="!bg-white rounded-md shadow-md h-12" />
              </div>
            </div>
          </div>
        ) : (
          <CustomBox type="box">
            <div className="flex flex-col gap-3">
              <ShareBox className="flex flex-col gap-3">
                <CiSquarePlus size={30} color={GRAY_400} />
                <p className="text-[12px] font-suite text-gray-400 text-center">
                  최대 20MB 이하
                  <br /> JPEG / JPG / PNG 파일만 가능
                </p>
              </ShareBox>
              <CustomInput
                type="text"
                placeholder="제목"
                value={localData?.share_link_title || ''}
                onChange={(e) => handleChange('share_link_title', e.target.value)}
                className="w-full"
              />
              <CustomInput
                type="text"
                placeholder="설명"
                value={localData?.share_link_desc || ''}
                onChange={(e) => handleChange('share_link_desc', e.target.value)}
                className="w-full"
              />
              <Button text="모바일 청첩장 보기" onClick={() => {}} disabled variant={'outline'} className="!bg-white rounded-md shadow-md h-12" />
            </div>
          </CustomBox>
        )}

        <Button text="저장하기" onClick={handleSave} className="mt-4" />
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
