'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { deleteDoc, doc } from 'firebase/firestore';

import { CustomButton } from '../../../../../ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { db } from '@lib/firebase';
import { toast } from 'sonner';
import { useState } from 'react';

type GuestMessageDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId?: string;
  msgId?: string;
  password?: string;
  fetchInvitationsList?: any;
};

export default function GuestMessageDeleteModal({ open, onOpenChange, invitationId, msgId, password, fetchInvitationsList }: GuestMessageDeleteModalProps) {
  const [inputPassword, setInputPassword] = useState<string>('');
  const save = async () => {
    // if (inputPassword.trim() === '') {
    //   toast('비밀번호를 입력해주세요');
    //   return;
    // }
    if (inputPassword.trim() !== password) {
      toast('비밀번호가 일치하지 않습니다');
      return;
    }
    try {
      // @ts-ignore
      const messageRef = doc(db, 'invitation', invitationId, 'message', msgId);
      await deleteDoc(messageRef);
      toast.success('메시지가 삭제되었습니다!');
      onOpenChange(false);
      setInputPassword('');
      fetchInvitationsList();
    } catch (error) {
      console.error(error);
      toast.error('메시지 삭제 중 오류가 발생했습니다.');
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-chosun">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">글 삭제</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10" style={{ color: ` rgb(209, 146, 146)` }}>
            관리자 및 작성자만 글을 삭제하실 수 있습니다
          </p>
          <div className="font-suite">
            <CustomInput
              type="text"
              placeholder="비밀번호를 입력해주세요"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className={`${inputPassword.trim() === '' ? 'mb-2' : 'mb-5'}`}
            />
            {inputPassword.trim() === '' && <CustomInfoText text="비밀번호를 입력해주세요" color={'#EF665B'} className="mb-5" />}

            <CustomButton text="삭제하기" onClick={save} active={true} />
          </div>
        </div>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
