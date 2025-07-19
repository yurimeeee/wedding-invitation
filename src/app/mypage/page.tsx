'use client';

import { User, signInWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@components/ui/button';
import { FaRegUser } from 'react-icons/fa';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import { auth } from '@lib/firebase';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserStore } from '@stores/useUserStore';

const Title = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 3px 4px -2px rgb(0 0 0 / 0.2);
`;

const Content = styled.div`
  background: #fbfbfb;
  padding: 24px 36px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 3px 4px -2px rgb(0 0 0 / 0.2);
`;

const Wrap = styled.div`
  width: 100%;
`;

export default function MyPage() {
  const { user } = useUserStore();

  // useEffect(() => {
  //   if (user) {
  //     router.push('/admin');
  //   }
  // }, [user]);
  return (
    <Wrap className="scroll-container bg-[#F5F4F0] p-10 overflow-auto w-full h-full pb-20">
      <div className="flex flex-col gap-2 max-w-[640px] mx-auto">
        <div>
          <Title className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium flex items-center gap-2">
            <FaRegUser size={18} color={theme.color.pink600} />
            <p className="text-gray-700">마이 페이지</p>
          </Title>
          <Content>
            <p className="text-[18px] font-suite-bold text-gray-600 mb-6">내 정보</p>
            {/* <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
              <p className="text-muted-foreground mb-6">총 응답 수</p>
              <p className="text-text-default text-lg">{attendeesList?.length} 명</p>
            </div> */}
            {/* <div className="flex gap-4 mt-4 mb-6">
              <InfoCard label="참석" value={attending?.length} />
              <InfoCard label="불참" value={declined?.length} />
             
            </div> */}
            {/* <Button text="엑셀 다운로드" variant="pink" onClick={handleDownloadCSV} className="mb-10" />
            <CSVLink data={excelData} headers={headers} filename="참석여부.csv" className="hidden" ref={csvLink} target="_blank" />
            <p className="text-[18px] font-suite-bold text-gray-600 mb-6">상세 정보</p> */}

            {/* <div className="flex">
              {tabList?.map((item, idx) => (
                <TabItem key={idx} active={item.value === activeTab} onClick={() => setActiveTab(item.value)}>
                  {item.text}
                </TabItem>
              ))}
            </div>

            <div>
              <div className="flex gap-4 mt-4 mb-6">
                <InfoCard label="참석" value={attendingByTab} />
                <InfoCard label="불참" value={declinedByTab} />
              </div>
            </div> */}
            <Button
              text="상세 정보 확인하기"
              variant="pink"
              onClick={() => {
                // setAnalysisDetailModal(true);
              }}
              className="mb-10"
            />
          </Content>
        </div>
      </div>
      {/* <AnalysisDetailModal
        open={analysisDetailModal}
        onOpenChange={setAnalysisDetailModal}
        attending={attending}
        declined={declined}
        type={activeTab}
        attendeesList={attendeesList}
      /> */}
    </Wrap>
  );
}
