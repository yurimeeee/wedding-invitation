import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@components/ui/dialog';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@components/ui/button';
import { CiSquarePlus } from 'react-icons/ci';
import { CustomBox } from '@components/ui/CustomBox';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { GRAY_400 } from '@styles/colors';
import Image from 'next/image';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';

type ShareSettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: 'KAKAO' | 'LINK';
  data: TemplatesData;
  setData: any;
  setShareKakaoImg: React.Dispatch<React.SetStateAction<File | null>>;
  setShareLinkImg: React.Dispatch<React.SetStateAction<File | null>>;
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
const ImageBox = styled(Image)`
  width: 100%;
  height: 100%;
  max-width: 240px;
  max-height: 240px;
  object-fit: cover;
`;

export default function ShareSettingsModal({ open, onOpenChange, title, type, data, setData, setShareKakaoImg, setShareLinkImg }: ShareSettingsModalProps) {
  const [localData, setLocalData] = useState<TemplatesData>({
    ...data,
  });
  const kakaoInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    kakaoInputRef.current?.click();
  };
  useEffect(() => {
    if (open) {
      setLocalData({ ...data });
    }
  }, [open, data]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, setState: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setState(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLocalData((prev: any) => ({
        ...prev,
        [key]: reader.result, // Data URL 저장
      }));
    };
    reader.readAsDataURL(file); // base64 형식으로 변환
  };
  const handleChange = (key: keyof TemplatesData, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setData(localData);
    onOpenChange(false);
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImgChange(e, 'share_kakao_img', setShareKakaoImg);
                }}
                hidden
                ref={kakaoInputRef}
                value={''}
              />
              {localData?.share_kakao_img ? (
                <ShareBox onClick={handleClick} className="cursor-pointer">
                  <ImageBox src={localData?.share_kakao_img} alt="main image" width={120} height={120} className="mt-2 rounded" />
                </ShareBox>
              ) : (
                // 이미지 없을 경우 아이콘 클릭
                <ShareBox className="flex flex-col gap-3" onClick={() => kakaoInputRef.current?.click()}>
                  <CiSquarePlus size={30} color={GRAY_400} />
                  <p className="text-[12px] font-suite text-gray-400 text-center">
                    최대 20MB 이하
                    <br /> JPEG / JPG / PNG 파일만 가능
                  </p>
                </ShareBox>
              )}
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImgChange(e, 'share_link_img', setShareLinkImg);
                }}
                hidden
                ref={linkInputRef}
                value={''}
              />
              {localData?.share_link_img ? (
                <ShareBox onClick={handleClick} className="cursor-pointer">
                  <ImageBox src={localData?.share_link_img} alt="main image" width={120} height={120} className="mt-2 rounded" />
                </ShareBox>
              ) : (
                // 이미지 없을 경우 아이콘 클릭
                <ShareBox className="flex flex-col gap-3" onClick={() => linkInputRef.current?.click()}>
                  <CiSquarePlus size={30} color={GRAY_400} />
                  <p className="text-[12px] font-suite text-gray-400 text-center">
                    최대 20MB 이하
                    <br /> JPEG / JPG / PNG 파일만 가능
                  </p>
                </ShareBox>
              )}
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
