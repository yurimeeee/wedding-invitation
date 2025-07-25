'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Skeleton from '@components/editor/layout/Skeleton';
import TemplateCard from '@components/editor/feature/TemplateCard';
import { TemplatesData } from '@type/templates';
import { db } from '@lib/firebase';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<TemplatesData[] | null>(null);
  const fetchTemplates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'template'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTemplates(data as TemplatesData[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  useEffect(() => {
    fetchTemplates();
  }, []);
  // async function uploadImageAndSaveToDoc(file: File, docId: string) {
  //   try {
  //     // 1. Storage 경로 설정
  //     const storageRef = ref(storage, `images/${docId}/${file.name}`);

  //     // 2. 이미지 업로드
  //     await uploadBytes(storageRef, file);

  //     // 3. 다운로드 URL 가져오기
  //     const downloadURL = await getDownloadURL(storageRef);

  //     // 4. Firestore 문서에 저장
  //     const docRef = doc(db, 'yourCollection', docId);
  //     await setDoc(
  //       docRef,
  //       {
  //         imageUrl: downloadURL, // 기존 필드와 함께 사용할 경우 { merge: true } 옵션 사용
  //       },
  //       { merge: true }
  //     );

  //     console.log('Document updated with image URL!');
  //   } catch (err) {
  //     console.error('Error uploading image and saving to document:', err);
  //   }
  // }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <p className="text-[18px] font-suite-bold text-text-default mb-6 text-center">청첩장 예시</p>
        <p className="text-sm text-muted-foreground text-center mb-10" style={{ color: ` rgb(209, 146, 146)` }}>
          다양한 디자인을 참고해서 쉽게 청첩장을 꾸밀 수 있어요.
        </p>
      </div>
      {!templates ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} width="100%" height="252px" />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates?.map((item: TemplatesData, index: number) => (
            <TemplateCard key={index} data={item} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
