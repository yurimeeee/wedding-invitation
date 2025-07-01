'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';

import { CustomButton } from '../../../../../ui/CustomButton';
import { GRAY_800 } from '@styles/colors';
import { QRCodeCanvas } from 'qrcode.react';

type QRcodeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
};

export default function QRcodeModal({ open, onOpenChange, url }: QRcodeModalProps) {
  const HEART_LOGO_URL = '/assets/img/logo-heart.png';

  const downloadQrcode = () => {
    const qrcode = document.getElementById('qrcode');
    const link = document.createElement('a');
    // @ts-ignore
    const url = qrcode.toDataURL('image/png');
    link.setAttribute('download', 'qrcode.png');
    link.setAttribute('href', url);
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-suite flex flex-col items-center">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default mt-5 mb-10">청첩장 QR코드 다운로드</p>
          {/* <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10 text-center" style={{ color: ` rgb(209, 146, 146)` }}>
            알파벳 / 숫자 / 하이픈(-)만 사용 가능해요
          </p> */}

          <QRCodeCanvas
            value={window.location.origin + url}
            size={120}
            fgColor={GRAY_800}
            id={'qrcode'}
            level="H"
            imageSettings={{
              src: HEART_LOGO_URL,
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
          <CustomButton text="이미지 저장하기" onClick={downloadQrcode} active={true} className="mt-10" />
        </div>

        <div></div>
      </DialogContent>
    </Dialog>
  );
}
