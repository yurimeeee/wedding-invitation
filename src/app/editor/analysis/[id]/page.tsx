'use client';

import { CustomDialog, DialogTrigger } from '@components/ui/dialog';
import { GRAY_500, GRAY_600 } from '@styles/colors';
import { ReactNode, useEffect, useState } from 'react';
import { auth, db } from '@lib/firebase';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useParams, useSearchParams } from 'next/navigation';

import { AttendeeInfoData } from '@type/templates';
import BeatLoader from 'react-spinners/BeatLoader';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Button } from '@components/ui/button';
import CustomAccordion from '@components/editor/feature/templates/custom/Accordion';
import { CustomButton } from '@components/ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomTooltip } from '@components/ui/tooltip';
import KakaoMap from '@components/editor/feature/KakaoMap';
import SampleGreetingMessageModal from '@components/editor/feature/templates/custom/modal/SampleGreetingMessageModal';
import ShareSettingsModal from '@components/editor/feature/templates/custom/modal/ShareSettingsModal';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { toast } from 'sonner';

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
  /* max-width: 720px; */
`;

export default function AnalysisPage() {
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const type = searchParams.get('type');
  const [loading, setLoading] = useState<boolean>(true);
  const [sampleGreetingMessageModal, setSampleGreetingMessageModal] = useState<any>({ open: false, title: '', type: '' });
  const [attendeesList, setAttendeesList] = useState<AttendeeInfoData[] | null>(null);
  const [attending, setAttending] = useState<AttendeeInfoData[] | null>(null);
  const [declined, setDeclined] = useState<AttendeeInfoData[] | null>(null);

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
  useEffect(() => {
    fetchAttendeesList();
  }, []);
  useEffect(() => {
    if (attendeesList && attendeesList?.length > 0) {
      const attendeeArr = attendeesList?.filter((item: AttendeeInfoData) => item?.attendance === true);
      setAttending(attendeeArr);
      const declinedArr = attendeesList?.filter((item: AttendeeInfoData) => item?.attendance === false);
      setDeclined(declinedArr);
    }
  }, [attendeesList]);
  console.log('attendeesList', attendeesList);
  console.log('attending', attending);
  console.log('declined', declined);
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
              <Title className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium">
                <p className="text-muted-foreground">참석 의사 응답</p>
              </Title>
              <Content>
                <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
                  <p className="text-muted-foreground mb-6">총 응답 수</p>
                  <p className="text-text-default text-lg">{attendeesList?.length} 명</p>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
                    <p className="text-muted-foreground mb-6">참석</p>
                    <p className="text-text-default text-lg">{attending?.length} 명</p>
                  </div>
                  <div className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium rounded-md">
                    <p className="text-muted-foreground mb-6">불참</p>
                    <p className="text-text-default text-lg">{declined?.length} 명</p>
                  </div>
                </div>
              </Content>
            </div>
          </div>
        </Wrap>
      )}

      {/* <SampleGreetingMessageModal
        open={sampleGreetingMessageModal.open}
        onOpenChange={setSampleGreetingMessageModal}
        title={'샘플 문구 활용'}
        setData={(newData: any) => setFormData({ ...formData, ...newData })}
        data={formData}
      /> */}
    </div>
  );
}
