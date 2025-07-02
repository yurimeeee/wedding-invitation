'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { CustomButton } from '../../../../../ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { TemplatesData } from '@type/templates';
import { Textarea } from '@components/ui/textarea';
import { db } from '@lib/firebase';
import { toast } from 'sonner';
import { useState } from 'react';

type GuestMessageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: TemplatesData;
  fetchInvitationsList: any;
};

export default function GuestMessageModal({ open, onOpenChange, data, fetchInvitationsList }: GuestMessageModalProps) {
  const [msgModel, setMsgModel] = useState<{ name: string; password: string; contents: string }>({
    name: '',
    password: '',
    contents: '',
  });
  const save = async () => {
    if (msgModel?.name.trim() === '') {
      toast('성함을 입력해주세요');
      return;
    }
    if (msgModel?.password.trim() === '') {
      toast('비밀번호를 입력해주세요');
      return;
    }
    if (msgModel?.contents.trim() === '') {
      toast('내용을 입력해주세요');
      return;
    }
    try {
      // @ts-ignore
      await addDoc(collection(db, 'invitations', data?.id, 'message'), {
        name: msgModel.name.trim(),
        password: msgModel.password.trim(),
        contents: msgModel.contents.trim(),
        createdAt: serverTimestamp(),
      });

      toast.success('메시지가 저장되었습니다!');
      setMsgModel({ name: '', password: '', contents: '' });
      onOpenChange(false);
      fetchInvitationsList();
    } catch (error) {
      console.error(error);
      toast.error('메시지 저장 중 오류가 발생했습니다.');
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-chosun">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">축하 메시지 작성하기</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10" style={{ color: ` rgb(209, 146, 146)` }}>
            저희 둘의 결혼을 함께 축하해 주세요
          </p>
          <div className="font-suite">
            <CustomInput
              type="text"
              placeholder="성함을 입력해주세요"
              value={msgModel?.name}
              onChange={(e) => setMsgModel({ ...msgModel, name: e.target.value })}
              className={`${msgModel?.name.trim() === '' ? 'mb-2' : 'mb-5'}`}
            />
            {msgModel?.name.trim() === '' && <CustomInfoText text="성함을 입력해주세요" color={'#EF665B'} className="mb-5" />}
            <CustomInput
              type="text"
              placeholder="비밀번호를 입력해주세요"
              value={msgModel?.password}
              onChange={(e) => setMsgModel({ ...msgModel, password: e.target.value })}
              className={`${msgModel?.password.trim() === '' ? 'mb-2' : 'mb-5'}`}
            />
            {msgModel?.password.trim() === '' && <CustomInfoText text="비밀번호를 입력해주세요" color={'#EF665B'} className="mb-5" />}
            <Textarea
              placeholder="200자 이내로 작성해 주세요"
              value={msgModel?.contents}
              onChange={(e) => setMsgModel({ ...msgModel, contents: e.target.value })}
              className={`${msgModel?.contents.trim() === '' ? 'mb-2' : 'mb-5'}`}
            />
            {msgModel?.contents.trim() === '' && <CustomInfoText text="내용을 입력해주세요" color={'#EF665B'} className="mb-5" />}

            <CustomButton text="작성 완료" onClick={save} active={true} />
          </div>
        </div>

        <div></div>
      </DialogContent>
    </Dialog>
  );
}
