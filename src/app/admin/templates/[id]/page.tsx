'use client';

import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import TemplateType1 from '@components/admin/feature/templates/types/TemplateType1';
import TemplateType2 from '@components/admin/feature/templates/types/TemplateType2';
import TemplateType3 from '@components/admin/feature/templates/types/TemplateType3';
import TemplateType4 from '@components/admin/feature/templates/types/TemplateType4';
import { db } from '@lib/firebase';
import { useParams } from 'next/navigation';

export default function TemplateDetailPage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [RenderedComponent, setRenderedComponent] = useState<any>(null);
  console.log('data', data);
  const getTemplateType1Document = async () => {
    try {
      const docRef = doc(db, 'template', String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
        // setErrorMessage(null);

        // --- 여기에 스위치 문을 사용하여 컴포넌트 설정 ---
        switch (
          String(id) // Firestore 문서에 'type' 필드가 있다고 가정
        ) {
          case 'type1':
            setRenderedComponent(() => TemplateType1);
            break;
          case 'type2':
            setRenderedComponent(() => TemplateType2);
            break;
          case 'type3':
            setRenderedComponent(() => TemplateType3);
            break;
          case 'type4':
            setRenderedComponent(() => TemplateType4);
            break;
          // 필요한 만큼 case를 추가할 수 있습니다.
          default:
            setRenderedComponent(() => null); // 기본 컴포넌트
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
      {data && RenderedComponent && <RenderedComponent data={data} />}
    </div>
  );
}
