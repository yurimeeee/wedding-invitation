'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { doc, getDoc } from 'firebase/firestore';

import BounceLoader from 'react-spinners/BounceLoader';
import { CustomButton } from '../../../../../ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { db } from '@lib/firebase';
import theme from '@styles/theme';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AddInvitationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddInvitationModal({ open, onOpenChange }: AddInvitationModalProps) {
  const router = useRouter();
  const [domain, setDomain] = useState<string>('');
  const [urlValidationMessage, setUrlValidationMessage] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // domain 중복 확인
  const checkInvitationId = async (id: string) => {
    if (!id || id.length < 5) {
      setUrlValidationMessage(null);
      return;
    }
    setIsLoading(true);
    try {
      const docRef = doc(db, 'invitations', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUrlValidationMessage(false);
      } else {
        setUrlValidationMessage(true);
      }
    } catch (error) {
      toast('확인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        setDomain('');
        setUrlValidationMessage(null);
        setIsLoading(false);
      }}
    >
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-suite flex flex-col items-center">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">특별한 청첩장 도메인을 만들어 주세요</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10 text-center" style={{ color: ` rgb(209, 146, 146)` }}>
            알파벳 / 숫자 / 하이픈(-)만 사용 가능해요
          </p>
          <div className="flex gap-3 max-w-[360px] mx-auto mb-2">
            <CustomInput
              type="text"
              placeholder="ex) couplename"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mx-auto w-full flex"
              onBlur={(e) => {
                const val = e.target.value.trim();
                if (val.length < 5) {
                  setUrlValidationMessage(null);
                  return;
                }
                checkInvitationId(val);
              }}
            />
            <CustomButton
              text="선택"
              onClick={() => {
                router.push('/editor/create/type1');
              }}
              disabled={!urlValidationMessage}
              active={true}
              className="max-w-[60px]"
            />
          </div>

          {domain.trim() === '' ? null : domain.trim().length < 5 ? (
            <CustomInfoText text="5자 이상 입력해주세요" color="#EF665B" className="my-2 mx-auto text-center" />
          ) : urlValidationMessage === true ? (
            <CustomInfoText text="사용 가능한 주소입니다" color="#17d287" className="my-2" />
          ) : urlValidationMessage === false ? (
            <CustomInfoText text="이미 사용 중인 주소입니다" color="#EF665B" className="my-2 mx-auto text-center" />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
