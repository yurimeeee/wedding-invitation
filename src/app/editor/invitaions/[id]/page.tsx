'use client';

import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { PageLoading } from '@components/ui/PageLoading';
import TemplateType1 from '@components/editor/feature/templates/types/TemplateType1';
import TemplateType2 from '@components/editor/feature/templates/types/TemplateType2';
import TemplateType3 from '@components/editor/feature/templates/types/TemplateType3';
import TemplateType4 from '@components/editor/feature/templates/types/TemplateType4';
import { db } from '@lib/firebase';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

export default function InvitaionsDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [RenderedComponent, setRenderedComponent] = useState<React.FC<any> | null>(null);

  const getTemplateType1Document = async () => {
    if (!id) {
      toast.error('잘못된 접근입니다.');
      setLoading(false);
      return;
    }
    try {
      const docRef = doc(db, 'invitation', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        setData(docData);
        switch (docData.type) {
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
            setRenderedComponent(null);
            break;
        }
      } else {
        toast.error('청첩장을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('문서 가져오기 실패:', error);
      toast.error('데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTemplateType1Document();
  }, [id]);

  if (loading) return <PageLoading loading={true} />;

  return (
    <div className="">
      {RenderedComponent && data && <RenderedComponent data={{ ...data, id }} />}
    </div>
  );
}
