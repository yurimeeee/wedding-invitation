'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';

import { CustomButton } from '../../../../../ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { Label } from '@components/ui/label';
import { TemplatesData } from '@type/templates';
import { Textarea } from '@components/ui/textarea';
import { db } from '@lib/firebase';
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

  // domain 중복 확인
  const checkInvitationId = async (id: string) => {
    try {
      const docRef = doc(db, 'invitation', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUrlValidationMessage(false);
      } else {
        setUrlValidationMessage(true);
      }
    } catch (error) {
      toast('확인 중 오류가 발생했습니다.');
    }
  };

  // const save = async () => {
  //   if (dataModel?.whose_guest.trim() === '') {
  //     toast('어느 분의 하객이신가요?');
  //     return;
  //   }
  //   if (dataModel?.attendance.trim() === '') {
  //     toast('참석 여부를 선택해주세요.');
  //     return;
  //   }
  //   if (dataModel?.name.trim() === '') {
  //     toast('성함을 입력해주세요.');
  //     return;
  //   }
  //   try {
  //     // @ts-ignore
  //     await addDoc(collection(db, 'invitation', data?.id, 'attendees'), {
  //       whose_guest: dataModel.whose_guest.trim(),
  //       attendance: dataModel.attendance,
  //       eat_or_not: dataModel.eat_or_not,
  //       name: dataModel.name.trim(),
  //       number_of_accompany: dataModel.number_of_accompany.trim(),
  //       memo: dataModel.memo.trim(),
  //       createdAt: serverTimestamp(),
  //     });

  //     toast.success('참석의사가 전달되었습니다!');
  //     setDataModel({
  //       whose_guest: '',
  //       attendance: true,
  //       eat_or_not: true,
  //       name: '',
  //       number_of_accompany: '',
  //       memo: '',
  //     });
  //     onOpenChange(false);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('저장 중 오류가 발생했습니다.');
  //   }
  // };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-suite flex flex-col items-center">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">특별한 청첩장 도메인을 만들어 주세요</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10 text-center" style={{ color: ` rgb(209, 146, 146)` }}>
            알파벳 / 숫자 / 하이픈(-)만 사용 가능해요
          </p>
          <div className="flex gap-3 max-w-[360px] mx-auto">
            <CustomInput
              type="text"
              placeholder="ex) couplename"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mb-5 mx-auto w-full flex"
              // className={`${msgModel?.name.trim() === '' ? 'mb-2' : 'mb-5'}`}
            />
            <CustomButton
              text="선택"
              onClick={() => {
                router.push('/editor/create/type1');
              }}
              active={true}
              className="max-w-[60px]"
            />
          </div>
          {/* {domain?.trim() === '' && <CustomInfoText text="이미 사용 중인 주소입니다" color={'#EF665B'} className="my-2 mx-auto text-center" />}
          <CustomInfoText text={'사용가능한 주소입니다'} color={'#17d287'} className="my-2" /> */}
        </div>

        <div></div>
      </DialogContent>
    </Dialog>
  );
}
