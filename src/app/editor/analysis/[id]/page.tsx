'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';

import AnalysisDetailModal from '@components/editor/feature/templates/custom/modal/AnalysisDetailModal';
import { AttendeeInfoData } from '@type/templates';
import BeatLoader from 'react-spinners/BeatLoader';
import { Button } from '@components/ui/button';
import { CSVLink } from 'react-csv';
import { CircleCheckBig } from 'lucide-react';
import { CustomButton } from '@components/ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomTooltip } from '@components/ui/tooltip';
import { db } from '@lib/firebase';
import { formatUnixTimestamp } from '@utils/func';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

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
  <div className={`${label === '참석' ? 'bg-pink-400' : 'bg-gray-200'} shadow-default w-full px-6 py-4 font-suite text-left text-sm font-medium rounded-md`}>
    <p className="text-muted-foreground mb-6">{label}</p>
    <p className="text-text-default text-lg">{value} 명</p>
  </div>
);

export default function AnalysisPage() {
  const params = useParams();
  const id = params.id;
  const csvLink = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [attendeesList, setAttendeesList] = useState<AttendeeInfoData[] | null>(null);
  const [excelData, setExcelData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>('groom');
  const [analysisDetailModal, setAnalysisDetailModal] = useState<boolean>(false);

  const tabList: { text: string; value: string }[] = [
    { text: '신랑측', value: 'groom' },
    { text: '신부측', value: 'bride' },
  ];

  const fetchAttendeesList = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, `invitations/${id}/attendees`));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAttendeesList(data as AttendeeInfoData[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const attending = useMemo(() => attendeesList?.filter((item) => item.attendance === true), [attendeesList]);
  const declined = useMemo(() => attendeesList?.filter((item) => item.attendance === false), [attendeesList]);

  const guestsByTab = useMemo(() => {
    return attendeesList?.filter((item) => item.whose_guest === activeTab);
  }, [attendeesList, activeTab]);

  const attendingByTab = guestsByTab?.filter((item) => item.attendance === true).length;
  const declinedByTab = guestsByTab?.filter((item) => item.attendance === false).length;
  console.log('attendeesList', attendeesList);
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
      attendeesList?.map((item: any) => {
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
    fetchAttendeesList();
  }, []);

  useEffect(() => {
    if (excelData?.length > 0) {
      csvLink?.current?.link.click();
      setExcelData([]);
    }
  }, [excelData]);
  return (
    <div className="flex h-screen">
      {loading ? (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="h-screen w-full flex justify-center items-center">
          <BeatLoader color={theme.color.pink300} loading={loading} />
        </motion.div>
      ) : (
        <Wrap className="scroll-container bg-[#F5F4F0] p-6 overflow-auto w-full h-full pb-20">
          <p className="text-[18px] font-suite-bold text-text-default mb-6">참석 의사 응답</p>
          <div className="flex flex-col gap-2 max-w-[640px]">
            <div>
              <Title className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium flex items-center gap-2">
                <CircleCheckBig size={18} color={theme.color.pink600} />
                <p className="text-gray-700">참석 의사 응답</p>
              </Title>
              <Content>
                <p className="text-[18px] font-suite-bold text-gray-600 mb-6">전체 요약</p>
                <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
                  <p className="text-muted-foreground mb-6">총 응답 수</p>
                  <p className="text-text-default text-lg">{attendeesList?.length} 명</p>
                </div>
                <div className="flex gap-4 mt-4 mb-6">
                  <InfoCard label="참석" value={attending?.length} />
                  <InfoCard label="불참" value={declined?.length} />
                  {/* <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
                    <p className="text-muted-foreground mb-6">참석</p>
                    <p className="text-text-default text-lg">{attending?.length} 명</p>
                  </div>
                  <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
                    <p className="text-muted-foreground mb-6">불참</p>
                    <p className="text-text-default text-lg">{declined?.length} 명</p>
                  </div> */}
                </div>
                <Button text="엑셀 다운로드" variant="pink" onClick={handleDownloadCSV} className="mb-10" />
                <CSVLink data={excelData} headers={headers} filename="참석여부.csv" className="hidden" ref={csvLink} target="_blank" />
                <p className="text-[18px] font-suite-bold text-gray-600 mb-6">상세 정보</p>

                <div className="flex">
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
                </div>
                <Button
                  text="상세 정보 확인하기"
                  variant="pink"
                  onClick={() => {
                    setAnalysisDetailModal(true);
                  }}
                  className="mb-10"
                />
              </Content>
            </div>
          </div>
          <AnalysisDetailModal
            open={analysisDetailModal}
            onOpenChange={setAnalysisDetailModal}
            attending={attending}
            declined={declined}
            type={activeTab}
            attendeesList={attendeesList}
          />
        </Wrap>
      )}
    </div>
  );
}
