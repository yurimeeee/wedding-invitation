'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { CustomButton } from '../../../../../ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { Label } from '@components/ui/label';
import { TemplatesData } from '@type/templates';
import { Textarea } from '@components/ui/textarea';
import { db } from '@lib/firebase';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { toast } from 'sonner';
import { useState } from 'react';

type AttendeesInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: TemplatesData;
};

export default function AttendeesInfoModal({ open, onOpenChange, data }: AttendeesInfoModalProps) {
  // const [dataModel, setDataModel] = useState<{ name: string; password: string; contents: string }>({
  const [dataModel, setDataModel] = useState<any>({
    whose_guest: '',
    attendance: true,
    eat_or_not: true,
    name: '',
    number_of_accompany: '',
    memo: '',
  });
  const save = async () => {
    if (dataModel?.whose_guest.trim() === '') {
      toast('어느 분의 하객이신가요?');
      return;
    }
    if (dataModel?.attendance.trim() === '') {
      toast('참석 여부를 선택해주세요.');
      return;
    }
    if (dataModel?.name.trim() === '') {
      toast('성함을 입력해주세요.');
      return;
    }
    // try {
    //   // @ts-ignore
    //   await addDoc(collection(db, 'invitation', data?.id, 'message'), {
    //     name: msgModel.name.trim(),
    //     password: msgModel.password.trim(),
    //     contents: msgModel.contents.trim(),
    //     createdAt: serverTimestamp(),
    //   });

    //   toast.success('메시지가 저장되었습니다!');
    //   setMsgModel({ name: '', password: '', contents: '' });
    //   onOpenChange(false);
    // } catch (error) {
    //   console.error(error);
    //   toast.error('메시지 저장 중 오류가 발생했습니다.');
    // }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-chosun">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">참석 의사 체크하기</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10 text-center" style={{ color: ` rgb(209, 146, 146)` }}>
            축하해 주시는 한 분 한 분을 소중히 모실 수 있도록 참석 의사를 사전에 전달해 주시길 부탁드립니다.
          </p>
          <div className="font-suite">
            <Label text="어느 분의 하객이신가요?" required={true} className="mb-2" />
            <div className="flex gap-2 mb-5">
              <CustomButton text="신랑" onClick={() => setDataModel({ ...dataModel, whose_guest: 'groom' })} active={dataModel?.whose_guest === 'groom'} />
              <CustomButton text="신부" onClick={() => setDataModel({ ...dataModel, whose_guest: 'bride' })} active={dataModel?.whose_guest === 'bride'} />
            </div>
            <Label text="참석하실 수 있나요?" required={true} className="mb-2" />
            <div className="flex gap-2 mb-5 ">
              <CustomButton text="참석" onClick={() => setDataModel({ ...dataModel, attendance: true })} active={dataModel?.attendance === true} />
              <CustomButton text="불참" onClick={() => setDataModel({ ...dataModel, attendance: false })} active={dataModel?.attendance === false} />
            </div>
            <Label text="식사를 하실 예정인가요?" required={false} className="mb-2" />
            <div className="flex gap-2 mb-5">
              <CustomButton text="예" onClick={() => setDataModel({ ...dataModel, eat_or_not: true })} active={dataModel?.eat_or_not === true} />
              <CustomButton text="아니오" onClick={() => setDataModel({ ...dataModel, eat_or_not: false })} active={dataModel?.eat_or_not === false} />
            </div>
            <Label text="성함" required={true} className="mb-2" />
            <CustomInput
              type="text"
              placeholder="성함을 입력해주세요"
              value={dataModel?.name}
              onChange={(e) => setDataModel({ ...dataModel, name: e.target.value })}
              className="mb-5"
              // className={`${msgModel?.name.trim() === '' ? 'mb-2' : 'mb-5'}`}
            />
            <Label text="메모" required={false} className="mb-2" />
            {/* {msgModel?.name.trim() === '' && <CustomInfoText text="성함을 입력해주세요" color={'#EF665B'} className="mb-5" />} */}
            <Textarea
              placeholder="추가로 전달하실 내용이 있다면 알려주세요"
              value={dataModel?.memo}
              onChange={(e) => setDataModel({ ...dataModel, memo: e.target.value })}
              className="mb-5"
            />

            <CustomButton text="작성 완료" onClick={save} active={true} />
          </div>
        </div>

        <div></div>
        {/* <div className="font-chosun">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">축하 연락하기</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-5" style={{ color: ` rgb(209, 146, 146)` }}>
            직접 축하의 마음을 전해보세요
          </p>
          <div className="flex">
            {tabList?.map((item, idx) => (
              <TabItem key={idx} active={item.value === activeTab} onClick={() => setActiveTab(item.value)}>
                {item.text}
              </TabItem>
            ))}
          </div>
          {activeTab === 'groom' ? (
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
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
