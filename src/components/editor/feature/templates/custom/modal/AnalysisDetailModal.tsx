'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';
import { useEffect, useRef, useState } from 'react';

import { AttendeeInfoData } from '@type/templates';
import { Button } from '@components/ui/button';
import { CSVLink } from 'react-csv';
import { formatUnixTimestamp } from '@utils/func';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { toast } from 'sonner';

const TabItem = styled.div<{ active: boolean }>`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;
  cursor: pointer;
  transition: all.3s;
  color: ${(props) => {
    return props.active ? theme.color.textDefault : theme.color.gray_400;
  }};
  border-bottom: ${(props) => {
    return props.active ? `2px solid ${theme.color.textDefault}` : `1px solid ${theme.color.gray_300}`;
  }};
`;
const InfoCard = ({ label, value }: { label: string; value?: number }) => (
  <div className={`${label === '참석' ? 'bg-pink-400' : 'bg-gray-100'} shadow-default w-full px-6 py-4 font-suite text-left text-sm font-medium rounded-md`}>
    <p className="text-muted-foreground mb-6">{label}</p>
    <p className="text-text-default text-lg">{value} 명</p>
  </div>
);
type AnalysisDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attendeesList: AttendeeInfoData[] | null;
  attending?: AttendeeInfoData[] | null;
  declined?: AttendeeInfoData[] | null;
  type: string;
};

export default function AnalysisDetailModal({ open, onOpenChange, attendeesList, attending, declined, type }: AnalysisDetailModalProps) {
  const csvLink = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('groom');
  const attendingByTab = attending?.filter((item) => item.whose_guest === activeTab).length;
  const declinedByTab = declined?.filter((item) => item.whose_guest === activeTab).length;
  const [excelData, setExcelData] = useState<any>([]);
  console.log('type', type);
  const headers = [
    { label: '구분', key: 'whose_guest' },
    { label: '참석여부', key: 'attendance' },
    { label: '식사여부', key: 'eat_or_not' },
    { label: '성함', key: 'name' },
    { label: '동행인원', key: 'number_of_accompany' },
    { label: '메시지', key: 'memo' },
    { label: '제출일시', key: 'createdAt' },
  ];

  const handleDownloadCSV = () => {
    const tmp: any[] =
      attendeesList
        ?.filter((item) => item.whose_guest === activeTab)
        ?.map((item: any) => {
          return {
            whose_guest: item.whose_guest === 'groom' ? '신랑측' : '신부측',
            attendance: item.attendance ? 'Y' : 'N',
            eat_or_not: item.eat_or_not ? 'Y' : 'N',
            name: item.name,
            number_of_accompany: item.number_of_accompany,
            memo: item.memo,
            createdAt: formatUnixTimestamp(item?.createdAt?.seconds, item?.createdAt?.nanoseconds),
            createdAtSort: item?.createdAt?.seconds ?? 0, // 정렬용 필드
          };
        }) ?? [];

    // createdAt 기준 오름차순 정렬
    const sorted = tmp.sort((a, b) => a.createdAtSort - b.createdAtSort);

    // 정렬용 필드 삭제
    const finalData = sorted.map(({ createdAtSort, ...rest }) => rest);

    setExcelData(finalData);
  };

  useEffect(() => {
    if (excelData?.length > 0) {
      csvLink?.current?.link.click();
      setExcelData([]);
    }
  }, [excelData]);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
      }}
    >
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-suite flex flex-col items-center">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5 mb-10">상세 정보 확인하기</p>

          <div className="flex w-full">
            {['groom', 'bride'].map((tab) => (
              <TabItem key={tab} active={tab === activeTab} onClick={() => setActiveTab(tab as any)}>
                {tab === 'groom' ? '신랑측' : '신부측'}
              </TabItem>
            ))}
          </div>
          <div className="flex gap-4 mt-4 mb-6 w-full">
            <InfoCard label="참석" value={attendingByTab} />
            <InfoCard label="불참" value={declinedByTab} />
          </div>
          <Button text="엑셀 다운로드" variant="pink" onClick={handleDownloadCSV} className="mb-10" />
          <CSVLink data={excelData} headers={headers} filename="참석여부.csv" className="hidden" ref={csvLink} target="_blank" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
