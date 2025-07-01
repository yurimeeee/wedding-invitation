'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import BeatLoader from 'react-spinners/BeatLoader';
import TemplateType1 from '@components/editor/feature/templates/types/TemplateType1';
import TemplateType2 from '@components/editor/feature/templates/types/TemplateType2';
import TemplateType3 from '@components/editor/feature/templates/types/TemplateType3';
import TemplateType4 from '@components/editor/feature/templates/types/TemplateType4';
import { db } from '@lib/firebase';
import theme from '@styles/theme';
import { useParams } from 'next/navigation';

export default function InvitaionsDetailPage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [RenderedComponent, setRenderedComponent] = useState<any>(null);
  const getTemplateType1Document = async () => {
    try {
      const docRef = doc(db, 'invitations', String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
        // setErrorMessage(null);
        switch (docSnap.data()?.type) {
          case 'type_1':
            setRenderedComponent(() => TemplateType1);
            break;
          case 'type_2':
            setRenderedComponent(() => TemplateType2);
            break;
          case 'type_3':
            setRenderedComponent(() => TemplateType3);
            break;
          case 'type_4':
            setRenderedComponent(() => TemplateType4);
            break;
          default:
            setRenderedComponent(() => null);
            break;
        }
      } else {
        // setErrorMessage('템플릿 문서를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('문서 가져오기 실패:', error);
      // setErrorMessage('데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTemplateType1Document();
  }, []);

  return (
    <div className="">
      {loading}
      {!data ? (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="h-screen w-full flex justify-center items-center">
          <BeatLoader color={theme.color.pink300} loading={!data} />
        </motion.div>
      ) : (
        data && RenderedComponent && <RenderedComponent data={data} />
      )}
    </div>
  );
}
