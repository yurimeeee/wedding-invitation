'use client';

import { GRAY_500, PINK_300 } from '@styles/colors';

import { ArrowRight } from 'lucide-react';
import FamilyInfoModal from './modal/FamilyInfoModal';
import { PiFlowerFill } from 'react-icons/pi';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useState } from 'react';

// const CallButton = styled.a`
//   width: 28px;
//   height: 28px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0dfd8;
// `;
const CallButton = styled.a`
  width: 100%;
  height: 48px;
  border-radius: 999px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.color.pink500};
  cursor: pointer;
  color: white;
`;

type FamilyInfoProps = {
  data: TemplatesData;
};

const FamilyInfo = ({ data }: FamilyInfoProps) => {
  const [familyInfoModal, setFamilyInfoModal] = useState<any>({ open: false, title: '', type: '' });

  const renderDeceasedMark = (mark?: string) => {
    switch (mark) {
      case 'text':
        return <span style={{ color: GRAY_500 }}>故</span>;
      case 'icon':
        return <PiFlowerFill color={GRAY_500} size={16} />;
      default:
        return null;
    }
  };
  const renderComponentByType = () => {
    const { groom_parents, bride_parents } = data;

    switch (data?.family_display_type) {
      case 'row':
        return (
          <div className="flex flex-col items-center w-full gap-6">
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex gap-5 items-center">
                <p className="flex gap-1 items-center">
                  <span>{groom_parents?.dad?.isDeceased && renderDeceasedMark(groom_parents?.dad?.isDeceased_mark)}</span>
                  <span>{groom_parents?.dad?.name || 'OOO'}</span>
                  <span className="text-gray-400"> · </span>
                  <span>{groom_parents?.mom?.isDeceased && renderDeceasedMark(groom_parents?.mom?.isDeceased_mark)}</span>
                  <span>{groom_parents?.mom?.name || 'OOO'}</span>
                </p>
                <span>
                  <span className="text-gray-600 mr-1">의</span>
                  아들
                </span>
              </div>
              <div className="flex gap-4">
                <span>신랑</span>
                <span>
                  {data?.full_name_display && data?.groom_first_name && data?.groom_first_name}
                  {data?.groom_last_name || '철수'}
                </span>
              </div>
            </div>
            <hr style={{ border: `1px solid ${PINK_300}`, width: '100%' }} />
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex gap-5 items-center">
                <p className="flex gap-1 items-center">
                  <span>{bride_parents?.dad?.isDeceased && renderDeceasedMark(bride_parents?.dad?.isDeceased_mark)}</span>
                  <span>{bride_parents?.dad?.name || 'OOO'}</span>
                  <span className="text-gray-400"> · </span>
                  <span>{bride_parents?.mom?.isDeceased && renderDeceasedMark(bride_parents?.mom?.isDeceased_mark)}</span>
                  <span>{bride_parents?.mom?.name || 'OOO'}</span>
                </p>
                <span>
                  <span className="text-gray-600 mr-1">의</span>딸
                </span>
              </div>
              <div className="flex gap-4">
                <span>신부</span>
                <span>
                  {data?.full_name_display && data?.bride_first_name && data?.bride_first_name}
                  {data?.bride_last_name || '영희'}
                </span>
              </div>
            </div>
          </div>
        );
      case 'center':
        return (
          <div className="flex flex-col items-center w-full gap-6">
            <div className="flex flex-col gap-4 items-center w-full">
              <span className={`px-3 py-1 rounded-full text-white text-sm bg-pink-500 text-text-default'}`}>신랑</span>
              <span>
                {data?.full_name_display && data?.groom_first_name && data?.groom_first_name}
                {data?.groom_last_name || '철수'}
              </span>
              <div className="flex gap-2 items-center">
                <p className="flex gap-1 items-center">
                  <span>{groom_parents?.dad?.isDeceased && renderDeceasedMark(groom_parents?.dad?.isDeceased_mark)}</span>
                  <span>{groom_parents?.dad?.name || 'OOO'}</span>
                  <span className="text-gray-400"> | </span>
                  <span>{groom_parents?.mom?.isDeceased && renderDeceasedMark(groom_parents?.mom?.isDeceased_mark)}</span>
                  <span>{groom_parents?.mom?.name || 'OOO'}</span>
                </p>
                <span>
                  <span>
                    <span className="text-gray-600 mr-1">의</span>
                    아들
                  </span>
                </span>
              </div>
              <div className="flex gap-4"></div>
            </div>
            <hr style={{ border: `1px solid ${PINK_300}`, width: '100%' }} />
            <div className="flex flex-col gap-4 items-center w-full">
              <span className={`px-3 py-1 rounded-full text-white text-sm bg-pink-500 text-text-default'}`}>신부</span>
              <span>
                {data?.full_name_display && data?.bride_first_name && data?.bride_first_name}
                {data?.bride_last_name || '영희'}
              </span>
              <div className="flex gap-2 items-center">
                <p className="flex gap-1 items-center">
                  <span>{bride_parents?.dad?.isDeceased && renderDeceasedMark(bride_parents?.dad?.isDeceased_mark)}</span>
                  <span>{bride_parents?.dad?.name || 'OOO'}</span>
                  <span className="text-gray-400"> | </span>
                  <span>{bride_parents?.mom?.isDeceased && renderDeceasedMark(bride_parents?.mom?.isDeceased_mark)}</span>
                  <span>{bride_parents?.mom?.name || 'OOO'}</span>
                </p>
                <span>
                  <span className="text-gray-600 mr-1">의</span>딸
                </span>
              </div>
            </div>
          </div>
        );
      case 'brief':
        return (
          <div className="flex flex-col items-center w-full  gap-6">
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex gap-5 items-center">
                <p className="flex gap-1 items-center">
                  <span>{groom_parents?.dad?.isDeceased && renderDeceasedMark(groom_parents?.dad?.isDeceased_mark)}</span>
                  <span>{groom_parents?.dad?.name || 'OOO'}</span>
                  <span> · </span>
                  <span>{groom_parents?.mom?.isDeceased && renderDeceasedMark(groom_parents?.mom?.isDeceased_mark)}</span>
                  <span>{groom_parents?.mom?.name || 'OOO'}</span>
                  <span>
                    <span className="text-gray-600 mr-1">의</span>
                    아들
                  </span>
                </p>
                <span>
                  {data?.full_name_display && data?.groom_first_name && data?.groom_first_name}
                  {data?.groom_last_name || '철수'}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex gap-5 items-center">
                <p className="flex gap-1 items-center">
                  <span>{bride_parents?.dad?.isDeceased && renderDeceasedMark(bride_parents?.dad?.isDeceased_mark)}</span>
                  <span>{bride_parents?.dad?.name || 'OOO'}</span>
                  <span> · </span>
                  <span>{bride_parents?.mom?.isDeceased && renderDeceasedMark(bride_parents?.mom?.isDeceased_mark)}</span>
                  <span>{bride_parents?.mom?.name || 'OOO'}</span>
                  <span>
                    <span className="text-gray-600 mr-1">의</span>딸
                  </span>
                </p>
                <span>
                  {data?.full_name_display && data?.bride_first_name && data?.bride_first_name}
                  {data?.bride_last_name || '영희'}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center font-chosun my-6 px-8 border-t border-gray-300 pt-6 font-chosun">
      {renderComponentByType()}
      <CallButton
        className="mt-10"
        onClick={() => {
          setFamilyInfoModal({ ...familyInfoModal, open: true });
        }}
      >
        축하 연락하기
        <ArrowRight size={16} />
      </CallButton>
      <FamilyInfoModal
        open={familyInfoModal.open}
        onOpenChange={setFamilyInfoModal}
        type={familyInfoModal.type}
        // setData={(newData: any) => setFormData({ ...formData, ...newData })}
        data={data}
      />
    </div>
  );
};

export default FamilyInfo;
