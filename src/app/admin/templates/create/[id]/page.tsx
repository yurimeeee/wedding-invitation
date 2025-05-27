'use client';

import { CiSquarePlus, CiSquareRemove } from 'react-icons/ci';
import { CustomRadioGroup, RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { DocumentData, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@components/ui/button';
import { FaRegImage } from 'react-icons/fa6';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import { IoClose } from 'react-icons/io5';
import { Label } from '@components/ui/label';
import TemplateCard from '@components/admin/feature/TemplateCard';
import { TemplatesData } from '@type/templates';
import { Textarea } from '@components/ui/textarea';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

// import { storage } from '@lib/firebase';
const InfoTitle = styled.div`
  font-family: 'SUITE Variable';
  font-weight: 500;
  color: ${theme.color.textDefault};
  margin-bottom: 12px;
`;
const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
`;
const NoImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background: ${theme.color.gray_100};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const PreviewImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: contain;
  cursor: pointer;
  position: relative;
`;

export default function AdminTemplatesCreatePage() {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<any>(null);
  const [gallery, setGallery] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const invitationId = uuidv4();

  const handleChange = (path: string, value: string) => {
    const keys = path.split('.');
    const updated = { ...formData };
    let temp: any = updated;

    while (keys.length > 1) {
      const key = keys.shift()!;
      temp = temp[key];
    }
    temp[keys[0]] = value;

    setFormData(updated);
  };

  const handleObjectValueChange = (key: string, index: number, value: string) => {
    const keyIndex = formData?.directions_desc?.findIndex((item: any) => item.type === key);

    if (keyIndex === -1) return;

    const updatedDirections = [...formData.directions_desc];
    const updatedDesc = [...updatedDirections[keyIndex].desc];
    updatedDesc[index] = value;
    updatedDirections[keyIndex] = {
      ...updatedDirections[keyIndex],
      desc: updatedDesc,
    };

    setFormData({ ...formData, directions_desc: updatedDirections });
  };

  const addDirections = (key: string) => {
    const keyIndex = formData?.directions_desc?.findIndex((item: any) => item.type === key);

    const updatedDirections = [...formData.directions_desc];
    const updatedDesc = [...updatedDirections[keyIndex].desc, ''];
    updatedDirections[keyIndex] = {
      ...updatedDirections[keyIndex],
      desc: updatedDesc,
    };
    setFormData({ ...formData, directions_desc: updatedDirections });
  };

  const removeDirections = (key: string, index: number) => {
    const keyIndex = formData?.directions_desc?.findIndex((item: any) => item.type === key);

    const updatedDirections = [...formData.directions_desc];
    const updatedDesc = updatedDirections[keyIndex].desc.filter((_: any, idx: number) => idx !== index);
    updatedDirections[keyIndex] = {
      ...updatedDirections[keyIndex],
      desc: updatedDesc,
    };
    setFormData({ ...formData, directions_desc: updatedDirections });
  };

  const handleAccountChange = (key: string, index: number, field: 'name' | 'account' | 'bank', value: string) => {
    const updatedArr = [...formData[key]];
    updatedArr[index][field] = value;
    setFormData({ ...formData, [key]: updatedArr });
  };
  const addAccount = (key: string) => {
    setFormData({
      ...formData,
      [key]: [...formData[key], { name: '', account: '' }],
    });
  };
  const removeAccount = (key: string, index: number) => {
    const updatedArr = formData[key].filter((_: any, idx: number) => idx !== index);
    setFormData({ ...formData, [key]: updatedArr });
  };

  // 파일 업로드 및 Firestore 저장 함수
  async function handleSave(): Promise<void> {
    const storage = getStorage();
    const firestore = getFirestore();

    const validateForm = (): string | null => {
      if (!mainImage) return '메인 이미지를 업로드해주세요.';
      if (!gallery || !gallery.length || gallery.some((img: any) => !img)) return '갤러리 이미지를 하나 이상 등록해주세요.';
      if (!formData.main.main_title?.trim()) return '메인 타이틀을 입력해주세요.';
      if (!formData.main.main_groom_and_bride_name?.trim()) return '신랑과 신부 이름을 입력해주세요.';
      if (!formData.main.intro_content?.trim()) return '소개 문구를 입력해주세요.';
      if (!formData.groom_first_name?.trim() || !formData.groom_last_name?.trim()) return '신랑의 성함을 입력해주세요.';
      if (!formData.groom_phone?.trim()) return '신랑의 연락처를 입력해주세요.';
      if (!formData.groom_mom?.trim() || !formData.groom_dad?.trim()) return '신랑 측 부모님 정보를 입력해주세요.';
      if (!formData.bride_first_name?.trim() || !formData.bride_last_name?.trim()) return '신부의 성함을 입력해주세요.';
      if (!formData.bride_phone?.trim()) return '신부의 연락처를 입력해주세요.';
      if (!formData.bride_mom?.trim() || !formData.bride_dad?.trim()) return '신부 측 부모님 정보를 입력해주세요.';
      if (!formData.main.date?.trim()) return '날짜를 입력해주세요.';
      if (!formData.address?.trim()) return '식장 주소를 입력해주세요.';
      if (!formData.hall_phone?.trim()) return '식장 연락처를 입력해주세요.';
      return null;
    };

    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // 메인 이미지 경로 및 참조 생성
    const mainStoragePath = `invitation/${invitationId}/main/main_img`;
    const mainStorageRef = ref(storage, mainStoragePath);

    try {
      // 1. 메인 이미지 업로드
      const mainUploadResult = await uploadBytes(mainStorageRef, mainImage);
      const mainImageURL = await getDownloadURL(mainStorageRef);

      // 2. 갤러리 이미지들 업로드
      const galleryUploadPromises = gallery.map((file: any, index: number) => {
        const galleryPath = `invitation/${invitationId}/gallery/gallery_${index}`;
        const galleryRef = ref(storage, galleryPath);
        return uploadBytes(galleryRef, file).then(() => getDownloadURL(galleryRef));
      });

      const galleryImageURLs = await Promise.all(galleryUploadPromises);

      // 3. Firestore에 저장할 데이터 구성
      const dataToSave = {
        ...formData,
        main: {
          ...formData.main,
          main_img: mainImageURL,
        },
        gallery: galleryImageURLs,
        uploadedAt: new Date(),
      };

      // 4. Firestore에 데이터 저장
      const docRef = doc(firestore, 'invitation', invitationId);
      await setDoc(docRef, dataToSave, { merge: true });
      alert('청접장이 등록되었습니다.');
    } catch (error) {
      console.error('Error during upload or Firestore saving:', error);
      throw error;
    }
  }

  const getTemplateType1Document = async () => {
    try {
      const docRef = doc(db, 'template', String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFormData(docSnap.data());
        // setErrorMessage(null);

        // switch (String(id)) {
        //   case 'type1':
        //     setRenderedComponent(() => TemplateType1);
        //     break;
        //   case 'type2':
        //     setRenderedComponent(() => TemplateType2);
        //     break;
        //   case 'type3':
        //     setRenderedComponent(() => TemplateType3);
        //     break;
        //   case 'type4':
        //     setRenderedComponent(() => TemplateType4);
        //     break;
        //   default:
        //     setRenderedComponent(() => null);
        //     break;
        // }
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

  const handleMainImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev: any) => ({
        ...prev,
        main: {
          ...prev.main,
          main_img: reader.result, // Data URL 저장
        },
      }));
    };
    reader.readAsDataURL(file); // base64 형식으로 변환
  };

  // 갤러리 이미지 다중 업로드 핸들러
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setGallery(files);
    const readers: Promise<string>[] = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setFormData((prev: any) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...results],
      }));
    });
  };
  const handleGalleryImageRemove = (index: number) => {
    const updatedArr = formData.gallery.filter((_: any, idx: number) => idx !== index);
    setFormData({ ...formData, gallery: updatedArr });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="p-5 sm:p-8 pb-20">
      <Wrap>
        <p className="text-[18px] font-suite-bold text-text-default mb-6">청첩장 제작</p>
        <InfoTitle>메인 정보</InfoTitle>
        <p className="text-[14px] font-suite-medium text-text-default mb-2">템플릿 타입 선택</p>
        <CustomRadioGroup
          label=""
          value={formData?.type}
          onChange={(val) => setFormData({ ...formData, type: val })}
          options={[
            { label: 'type 1', value: 'type_1' },
            { label: 'type 2', value: 'type_2' },
            { label: 'type 3', value: 'type_3' },
            { label: 'type 4', value: 'type_4' },
          ]}
          className="w-[240px] flex items-center gap-3 mb-4"
        />
        <div className="mb-4">
          <p className="text-[14px] font-suite-medium text-text-default mb-2">메인 이미지 업로드</p>
          {formData?.main?.main_img_tip && <p className="text-[12px] font-suite-medium text-gray-500 mb-2">권장 사이즈 : {formData?.main?.main_img_tip}</p>}

          <input type="file" accept="image/*" onChange={handleMainImgChange} hidden ref={inputRef} value={''} />

          {/* 이미지가 있을 경우 */}
          {formData?.main?.main_img ? (
            <div onClick={handleClick} className="cursor-pointer">
              <Image src={formData.main.main_img} alt="main image" width={120} height={120} className="mt-2 rounded" />
            </div>
          ) : (
            // 이미지 없을 경우 아이콘 클릭
            <NoImage onClick={handleClick}>
              <FaRegImage size={24} color={theme.color.gray_600} />
            </NoImage>
          )}
        </div>
        <div className="mb-4">
          <p className="text-[14px] font-suite-medium text-text-default mb-2">갤러리 이미지 업로드</p>
          <p className="text-[12px] font-suite-medium text-gray-500 mb-2">최대 10장 업로드 가능</p>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange} value={''} />

          <div className="flex flex-wrap gap-3 mt-3">
            {formData?.gallery
              ?.filter((img: string) => !!img)
              .map((img: string, idx: number) => (
                <PreviewImage key={idx}>
                  <Image
                    key={idx}
                    src={img}
                    alt={`gallery-${idx}`}
                    // width={120}
                    // height={120}
                    // sizes="100%"
                    fill
                    className="rounded"
                  />
                  <div
                    className="bg-white absolute rignt-0 top-0 z-10 bg-white/50"
                    onClick={() => {
                      handleGalleryImageRemove(idx);
                    }}
                  >
                    <IoClose />
                  </div>
                </PreviewImage>
              ))}
          </div>
        </div>
        {/* <input type="file" placeholder="신랑과 신부" value={formData?.main?.main_img || ''} onChange={(e) => handleChange('main.main_img', e.target.value)} /> */}
        <p className="text-[14px] font-suite-medium text-text-default mb-2">메인 내용</p>
        <Input
          type="text"
          placeholder="신랑과 신부"
          value={formData?.main.main_groom_and_bride_name || ''}
          onChange={(e) => handleChange('main.main_groom_and_bride_name', e.target.value)}
          className="mb-3"
        />
        <p className="text-[14px] font-suite-medium text-text-default mb-2">이름 레이아웃 타입</p>
        <div className="flex gap-3">
          <Image src={`/assets/img/templates/${formData?.main?.main_text_type}.png`} width={100} height={100} alt={'preview'} className="rounded mb-2" />
          <CustomRadioGroup
            value={formData?.main?.main_text_type}
            onChange={(val) => handleChange('main.main_text_type', val)}
            options={[
              { label: '철수와 영희', value: 'groomAndBride' },
              { label: '철수 그리고 영희', value: 'groomAndBrideVertical' },
              { label: '김철수 · 이영희', value: 'groomDotBride' },
            ]}
            className="w-[240px] flex items-center gap-3 mb-3 flex-wrap sm:flex-nowrap"
          />
        </div>
        <p className="text-[14px] font-suite-medium text-text-default mb-2">제목</p>
        <div className="flex flex-wrap gap-3 mb-3">
          <Input type="text" placeholder="제목" value={formData?.main.main_title || ''} onChange={(e) => handleChange('main.main_title', e.target.value)} />
          <CustomRadioGroup
            label="제목 정렬"
            value={formData?.main?.main_title_align || ''}
            onChange={(val) => handleChange('main.main_title_align', val)}
            options={[
              { label: '왼쪽 정렬', value: 'left' },
              { label: '가운데 정렬', value: 'center' },
            ]}
            className="w-[240px] flex items-center gap-3"
          />
        </div>
        <p className="text-[14px] font-suite-medium text-text-default mb-2">인삿말</p>
        <Textarea placeholder="인삿말" value={formData?.main.intro_content} onChange={(e) => handleChange('main.intro_content', e.target.value)} className="mb-3" />
        <CustomRadioGroup
          label="내용 정렬"
          value={formData?.main?.intro_content_align}
          onChange={(val) => handleChange('main.intro_content_align', val)}
          options={[
            { label: '왼쪽 정렬', value: 'left' },
            { label: '가운데 정렬', value: 'center' },
          ]}
          className="w-[240px] flex items-center gap-3"
        />

        <InfoTitle className="mt-10">신랑 측 정보</InfoTitle>
        <div className="flex gap-2 mb-3">
          <Input type="text" placeholder="신랑 성" value={formData?.groom_first_name || ''} onChange={(e) => handleChange('groom_first_name', e.target.value)} />
          <Input type="text" placeholder="신랑 이름" value={formData?.groom_last_name || ''} onChange={(e) => handleChange('groom_last_name', e.target.value)} />
        </div>
        <div className="flex gap-4 mb-3">
          <Input type="text" placeholder="신랑 연락처" value={formData?.groom_phone || ''} onChange={(e) => handleChange('groom_phone', e.target.value)} />
          <CustomRadioGroup
            label="장남 여부"
            value={String(formData?.isFirstSon)}
            onChange={(val) => setFormData({ ...formData, isFirstSon: val })}
            options={[
              { label: '예', value: 'true' },
              { label: '아니요', value: 'false' },
            ]}
            className="w-[240px] flex items-center gap-3"
          />
        </div>
        <div className="flex gap-2 mb-3">
          <Input type="text" placeholder="신랑 아버님 성함" value={formData?.groom_dad || ''} onChange={(e) => handleChange('groom_dad', e.target.value)} />
          <Input type="text" placeholder="신랑 어머님 성함" value={formData?.groom_mom || ''} onChange={(e) => handleChange('groom_mom', e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-[14px] font-suite-medium text-text-default">계좌</p>
          {formData?.groom_account?.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <Input type="text" placeholder="@@은행 " value={item?.bank || ''} onChange={(e) => handleAccountChange('groom_account', idx, 'bank', e.target.value)} />
              <Input type="text" placeholder="계좌번호" value={item?.account || ''} onChange={(e) => handleAccountChange('groom_account', idx, 'account', e.target.value)} />
              <Input type="text" placeholder="예금주" value={item?.name || ''} onChange={(e) => handleAccountChange('groom_account', idx, 'name', e.target.value)} />
              <div>
                <CiSquarePlus size={20} color={theme.color.gray_600} onClick={() => addAccount('groom_account')} />
              </div>
              {formData?.groom_account?.length > 1 && (
                <button onClick={() => removeAccount('groom_account', idx)}>
                  <CiSquareRemove size={20} className="text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
        <InfoTitle className="mt-10">신부 측 정보</InfoTitle>
        <div className="flex gap-2 mb-3">
          <Input type="text" placeholder="신부 성" value={formData?.bride_first_name || ''} onChange={(e) => handleChange('bride_first_name', e.target.value)} />
          <Input type="text" placeholder="신부 이름" value={formData?.bride_last_name || ''} onChange={(e) => handleChange('bride_last_name', e.target.value)} />
        </div>
        <div className="flex gap-4 mb-3">
          <Input type="text" placeholder="신부 연락처" value={formData?.bride_phone || ''} onChange={(e) => handleChange('bride_phone', e.target.value)} />
          <CustomRadioGroup
            label="장녀 여부"
            value={String(formData?.isFirstDaughter)}
            onChange={(val) => setFormData({ ...formData, isFirstDaughter: val })}
            options={[
              { label: '예', value: 'true' },
              { label: '아니요', value: 'false' },
            ]}
            className="w-[240px] flex items-center gap-3"
          />
        </div>
        <div className="flex gap-2 mb-3">
          <Input type="text" placeholder="신부 아버님 성함" value={formData?.bride_dad || ''} onChange={(e) => handleChange('bride_dad', e.target.value)} />
          <Input type="text" placeholder="신부 어머님 성함" value={formData?.bride_mom || ''} onChange={(e) => handleChange('bride_mom', e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-[14px] font-suite-medium text-text-default">계좌</p>

          {formData?.bride_account?.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <Input type="text" placeholder="@@은행 " value={item?.bank || ''} onChange={(e) => handleAccountChange('bride_account', idx, 'bank', e.target.value)} />
              <Input type="text" placeholder="계좌번호" value={item?.account || ''} onChange={(e) => handleAccountChange('bride_account', idx, 'account', e.target.value)} />
              <Input type="text" placeholder="예금주" value={item?.name || ''} onChange={(e) => handleAccountChange('bride_account', idx, 'name', e.target.value)} />
              <div>
                <CiSquarePlus size={20} color={theme.color.gray_600} onClick={() => addAccount('bride_account')} />
              </div>
              {formData?.bride_account?.length > 1 && (
                <button onClick={() => removeAccount('bride_account', idx)}>
                  <CiSquareRemove size={20} className="text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-[14px] font-suite-medium text-text-default mt-10 mb-2">식 일자 · 식장 정보</p>
        <Input
          type="date"
          placeholder="날짜"
          value={formData?.wedding_day || formData?.main.date || ''}
          onChange={(e) => {
            handleChange('wedding_day', e.target.value);
            handleChange('main.date', e.target.value);
          }}
          className="mb-3"
        />
        <Input type="text" placeholder="식장 주소" value={formData?.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="mb-3" />
        <Input type="text" placeholder="식장 상세 정보" value={formData?.address_detail || ''} onChange={(e) => handleChange('address_detail', e.target.value)} className="mb-3" />
        <Input type="text" placeholder="식장 전화" value={formData?.hall_phone || ''} onChange={(e) => handleChange('hall_phone', e.target.value)} className="mb-3" />

        <p className="text-[14px] font-suite-medium text-text-default mt-10 mb-2">오시는 길</p>
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-[14px] font-suite-medium text-text-default">지하철</p>
          {formData?.directions_desc
            ?.filter((direction: any) => direction.type == '지하철')[0]
            .desc?.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <Input type="text" placeholder="입력" value={item} onChange={(e) => handleObjectValueChange('지하철', idx, e.target.value)} />
                <div>
                  <CiSquarePlus size={20} color={theme.color.gray_600} onClick={() => addDirections('지하철')} />
                </div>
                {formData?.directions_desc?.filter((direction: any) => direction.type == '지하철')[0].desc?.length > 1 && (
                  <button onClick={() => removeDirections('지하철', idx)}>
                    <CiSquareRemove size={20} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-[14px] font-suite-medium text-text-default">버스</p>
          {formData?.directions_desc
            ?.filter((direction: any) => direction.type == '버스')[0]
            .desc?.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <Input type="text" placeholder="입력" value={item} onChange={(e) => handleObjectValueChange('버스', idx, e.target.value)} />
                <div>
                  <CiSquarePlus size={20} color={theme.color.gray_600} onClick={() => addDirections('버스')} />
                </div>
                {formData?.directions_desc?.filter((direction: any) => direction.type == '버스')[0].desc?.length > 1 && (
                  <button onClick={() => removeDirections('버스', idx)}>
                    <CiSquareRemove size={20} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-[14px] font-suite-medium text-text-default">주차</p>
          {formData?.directions_desc
            ?.filter((direction: any) => direction.type == '주차')[0]
            .desc?.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <Input type="text" placeholder="입력" value={item} onChange={(e) => handleObjectValueChange('주차', idx, e.target.value)} />
                <div>
                  <CiSquarePlus size={20} color={theme.color.gray_600} onClick={() => addDirections('주차')} />
                </div>
                {formData?.directions_desc?.filter((direction: any) => direction.type == '주차')[0].desc?.length > 1 && (
                  <button onClick={() => removeDirections('주차', idx)}>
                    <CiSquareRemove size={20} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
        </div>
        {/* <Textarea placeholder="소개 문구" value={formData.main.intro_content} onChange={(e) => handleChange('main.intro_content', e.target.value)} /> */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>저장하기</Button>
        </div>
      </Wrap>
    </div>
  );
}
