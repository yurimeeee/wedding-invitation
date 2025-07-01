'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { CiSquarePlus, CiSquareRemove } from 'react-icons/ci';
import { CustomDialog, DialogTrigger } from '@components/ui/dialog';
import { CustomRadioGroup, RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { DocumentData, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { GRAY_500, GRAY_600 } from '@styles/colors';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { auth, db } from '@lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useParams, useSearchParams } from 'next/navigation';

import BeatLoader from 'react-spinners/BeatLoader';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Button } from '@components/ui/button';
import CustomAccordion from '@components/editor/feature/templates/custom/Accordion';
import { CustomBox } from '@components/ui/CustomBox';
import { CustomButton } from '@components/ui/CustomButton';
import { CustomCheckbox } from '@components/ui/checkbox';
import { CustomDatePicker } from '@components/ui/CustomDatePicker';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { CustomSelect } from '@components/ui/select';
import { CustomTimePicker } from '@components/ui/CustomTimePicker';
import { CustomToggle } from '@components/ui/toggle';
import { CustomTooltip } from '@components/ui/tooltip';
import DaumPost from '@components/editor/feature/DaumPost';
import { Divide } from 'lucide-react';
import { FaRegImage } from 'react-icons/fa6';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import { IoClose } from 'react-icons/io5';
import KakaoMap from '@components/editor/feature/KakaoMap';
import { Label } from '@components/ui/label';
import { PiFlowerFill } from 'react-icons/pi';
import SampleGreetingMessageModal from '@components/editor/feature/templates/custom/modal/SampleGreetingMessageModal';
import ShareSettingsModal from '@components/editor/feature/templates/custom/modal/ShareSettingsModal';
import TemplateCard from '@components/editor/feature/TemplateCard';
import TemplateType1 from '@components/editor/feature/templates/types/TemplateType1';
import TemplateType2 from '@components/editor/feature/templates/types/TemplateType2';
import TemplateType3 from '@components/editor/feature/templates/types/TemplateType3';
import TemplateType4 from '@components/editor/feature/templates/types/TemplateType4';
import { TemplatesData } from '@type/templates';
import { Textarea } from '@components/ui/textarea';
import TiptapEditor from '@components/editor/feature/TiptapEditor';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { title } from 'process';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// import { storage } from '@lib/firebase';
const InfoTitle = styled.div`
  font-family: 'SUITE Variable';
  font-weight: 500;
  color: ${theme.color.textDefault};
  margin-bottom: 12px;
`;
// const Label = styled.p`
//   font-family: 'SUITE Variable';
//   font-weight: 500;
//   color: ${theme.color.textDefault};
//   margin-bottom: 12px;
// `;
const Wrap = styled.div`
  width: 100%;
  /* max-width: 720px; */
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

export default function TemplatesCreatePage() {
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const type = searchParams.get('type');
  console.log('isEdit', isEdit);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<any>(null);
  const [gallery, setGallery] = useState<any>(null);
  const [shareKakaoImg, setShareKakaoImg] = useState<any>(null);
  const [shareLinkImg, setShareLinkImg] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const invitationId = uuidv4();
  const [invitationId, setInvitationId] = useState<any>(isEdit ? id : '');
  // const invitationId = uuidv4();
  // const [RenderedComponent, setRenderedComponent] = useState<any | null>(null);
  const [RenderedComponent, setRenderedComponent] = useState<React.FC<any> | null>(null);
  const [shareSettingsModal, setShareSettingsModal] = useState<any>({ open: false, title: '', type: '' });
  const [sampleGreetingMessageModal, setSampleGreetingMessageModal] = useState<any>({ open: false, title: '', type: '' });
  const [urlValidationMessage, setUrlValidationMessage] = useState<boolean | null>(null);

  // url 중복 확인
  const checkInvitationId = async (id: string) => {
    try {
      const docRef = doc(db, 'invitation', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUrlValidationMessage(false);
      } else {
        setUrlValidationMessage(true);
      }
    } catch (error) {
      toast('확인 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (path: string, value: string | any) => {
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

  const handleParentValueChange = (parentType: 'groom_parents' | 'bride_parents', role: 'dad' | 'mom', key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parentType]: {
        ...(prev[parentType] || {}),
        [role]: {
          ...(prev[parentType]?.[role] || {}),
          [key]: value,
        },
      },
    }));
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

  const handleAccountChange = (key: string, index: number, field: 'name' | 'account' | 'bank' | 'kakao', value: string) => {
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
  console.log('formData.gallery.length', formData?.gallery?.length);
  // 파일 업로드 및 Firestore 저장 함수
  async function handleSave(isDraft: boolean): Promise<void> {
    const userId = auth.currentUser?.uid; // 로그인된 사용자 ID

    if (!userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    setIsLoading(true);
    toast(isDraft ? '임시 저장 중입니다...' : '청첩장을 제작 중입니다...');
    const storage = getStorage();
    const firestore = getFirestore();

    const validateForm = (): string | null => {
      if (!formData.main.date?.trim()) return '예식 일자를 입력해주세요.';
      if (!formData.main.time?.trim()) return '예식 시간을 입력해주세요.';
      if (!formData.address?.trim()) return '식장 주소를 입력해주세요.';
      if (!formData.address_name?.trim() || !formData.address_detail?.trim()) return '식장 상세정보를 입력해주세요.';
      if (!formData.hall_phone?.trim()) return '식장 연락처를 입력해주세요.';
      if (!formData.groom_first_name?.trim() || !formData.groom_last_name?.trim() || !formData.bride_first_name?.trim() || !formData.bride_last_name?.trim())
        return '신랑 신부의 성함을 입력해주세요.';
      if (!formData.groom_phone?.trim()) return '신랑의 연락처를 입력해주세요.';
      if (!formData.bride_phone?.trim()) return '신부의 연락처를 입력해주세요.';
      if (!mainImage && !formData.main.main_img) return '커버 메인 이미지를 업로드해주세요.';
      if (!formData.main.intro_content?.trim()) return '모시는 글을 입력해주세요.';
      // if (!gallery || !gallery.length || (gallery.some((img: any) => !img) && formData.gallery.length < 1)) return '갤러리 이미지를 하나 이상 등록해주세요.';

      const hasGallery = (Array.isArray(gallery) && gallery.some((img: any) => !!img)) || (Array.isArray(formData?.gallery) && formData.gallery.length > 0);

      if (!hasGallery) {
        return '갤러리 이미지를 등록해주세요.';
      }
      return null;
    };

    // 임시 저장일 경우에는 검증 생략
    if (!isDraft) {
      const errorMessage = validateForm();
      if (errorMessage) {
        setIsLoading(false);
        toast(errorMessage);
        return;
      }
    }
    const docRef = doc(firestore, 'invitations', invitationId);
    // const docRef = doc(firestore, 'users', userId, 'invitations', invitationId);
    const dataToSave: any = {
      ...formData,
      uploadedAt: new Date(),
      isDraft,
    };
    try {
      // 메인 이미지
      if (mainImage) {
        const mainRef = ref(storage, `invitation/${invitationId}/main/main_img`);
        await uploadBytes(mainRef, mainImage);
        dataToSave.main = {
          ...dataToSave.main,
          main_img: await getDownloadURL(mainRef),
        };
      }

      // 공유 이미지
      if (shareKakaoImg) {
        const kakaoRef = ref(storage, `invitation/${invitationId}/share/share_kakao_img`);
        await uploadBytes(kakaoRef, shareKakaoImg);
        dataToSave.share_kakao_img = await getDownloadURL(kakaoRef);
      }

      if (shareLinkImg) {
        const linkRef = ref(storage, `invitation/${invitationId}/share/share_link_img`);
        await uploadBytes(linkRef, shareLinkImg);
        dataToSave.share_link_img = await getDownloadURL(linkRef);
      }

      // 갤러리
      if (gallery?.length) {
        const galleryUrls = await Promise.all(
          gallery.map((file: any, index: number) => {
            const refPath = ref(storage, `invitation/${invitationId}/gallery/gallery_${index}`);
            return uploadBytes(refPath, file).then(() => getDownloadURL(refPath));
          })
        );
        dataToSave.gallery = galleryUrls;
      }

      // await setDoc(docRef, dataToSave, { merge: true });
      // const docRef2 = doc(firestore, 'invitations', invitationId);
      // await setDoc(docRef2, { id: invitationId, uid: userId });
      await setDoc(
        docRef,
        {
          ...dataToSave,
          id: invitationId,
          uid: userId,
        },
        { merge: true }
      );

      toast.success(isDraft ? '임시 저장되었습니다.' : '청첩장이 등록되었습니다.');
    } catch (error) {
      console.error('Error during upload or Firestore saving:', error);
      throw error;
    }
  }

  // async function handleSave(): Promise<void> {
  //   const userId = auth.currentUser?.uid; // 로그인된 사용자 ID

  //   if (!userId) {
  //     toast.error('로그인이 필요합니다.');
  //     return;
  //   }

  //   setIsLoading(true);
  //   toast('청첩장이 제작 중이니 잠시만 기다려주세요.');
  //   const storage = getStorage();
  //   const firestore = getFirestore();

  //   const validateForm = (): string | null => {
  //     if (!formData.main.date?.trim()) return '예식 일자를 입력해주세요.';
  //     if (!formData.main.time?.trim()) return '예식 시간을 입력해주세요.';
  //     if (!formData.address?.trim()) return '식장 주소를 입력해주세요.';
  //     if (!formData.address_name?.trim() || !formData.address_detail?.trim()) return '식장 상세정보를 입력해주세요.';
  //     if (!formData.hall_phone?.trim()) return '식장 연락처를 입력해주세요.';
  //     if (!formData.groom_first_name?.trim() || !formData.groom_last_name?.trim() || !formData.bride_first_name?.trim() || !formData.bride_last_name?.trim())
  //       return '신랑 신부의 성함을 입력해주세요.';
  //     if (!formData.groom_phone?.trim()) return '신랑의 연락처를 입력해주세요.';
  //     if (!formData.bride_phone?.trim()) return '신부의 연락처를 입력해주세요.';
  //     if (!mainImage) return '커버 메인 이미지를 업로드해주세요.';
  //     if (!formData.main.intro_content?.trim()) return '모시는 글을 입력해주세요.';
  //     if (!gallery || !gallery.length || gallery.some((img: any) => !img)) return '갤러리 이미지를 하나 이상 등록해주세요.';

  //     return null;
  //   };

  //   const errorMessage = validateForm();
  //   if (errorMessage) {
  //     setIsLoading(false);
  //     toast(errorMessage);

  //     return;
  //   }

  //   // 메인 이미지 경로 및 참조 생성
  //   const mainStoragePath = `invitation/${invitationId}/main/main_img`;
  //   const mainStorageRef = ref(storage, mainStoragePath);

  //   // 카카오 이미지 경로 및 참조 생성
  //   const kakaoStoragePath = `invitation/${invitationId}/share/share_kakao_img`;
  //   const kakaoStorageRef = ref(storage, kakaoStoragePath);
  //   // 링크 이미지 경로 및 참조 생성
  //   const linkStoragePath = `invitation/${invitationId}/share/share_link_img`;
  //   const linkStorageRef = ref(storage, linkStoragePath);
  //   try {
  //     // 1. 메인 이미지 업로드
  //     const mainUploadResult = await uploadBytes(mainStorageRef, mainImage);
  //     const mainImageURL = await getDownloadURL(mainStorageRef);

  //     // 2. 갤러리 이미지들 업로드
  //     const galleryUploadPromises = gallery.map((file: any, index: number) => {
  //       const galleryPath = `invitation/${invitationId}/gallery/gallery_${index}`;
  //       const galleryRef = ref(storage, galleryPath);
  //       return uploadBytes(galleryRef, file).then(() => getDownloadURL(galleryRef));
  //     });

  //     const galleryImageURLs = await Promise.all(galleryUploadPromises);
  //     const kakaoShareResult = await uploadBytes(kakaoStorageRef, shareKakaoImg);
  //     const linkShareResult = await uploadBytes(linkStorageRef, shareLinkImg);
  //     const kakaoShareImageURL = await getDownloadURL(kakaoStorageRef);
  //     const linkShareImageURL = await getDownloadURL(linkStorageRef);
  //     // 3. Firestore에 저장할 데이터 구성
  //     const dataToSave = {
  //       ...formData,
  //       main: {
  //         ...formData.main,
  //         main_img: mainImageURL,
  //       },
  //       gallery: galleryImageURLs,
  //       uploadedAt: new Date(),
  //       share_kakao_img: kakaoShareImageURL,
  //       share_link_img: linkShareImageURL,
  //     };

  //     // 4. Firestore에 데이터 저장
  //     // const docRef = doc(firestore, 'invitation', invitationId);
  //     // await setDoc(docRef, dataToSave, { merge: true });
  //     const docRef = doc(firestore, 'users', userId, 'invitations', invitationId);
  //     await setDoc(docRef, dataToSave, { merge: true });

  //     toast('청접장이 등록되었습니다.');
  //   } catch (error) {
  //     console.error('Error during upload or Firestore saving:', error);
  //     throw error;
  //   }
  // }

  console.log('formD', formData);
  useEffect(() => {
    const userId = auth.currentUser?.uid; // 로그인된 사용자 ID
    const getTemplateType1Document = async () => {
      try {
        let docRef;

        if (isEdit && userId && id) {
          docRef = doc(db, 'users', String(userId), 'invitations', String(id));
        } else {
          docRef = doc(db, 'template', String(id));
        }

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
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
  useEffect(() => {
    switch (formData?.type) {
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
  }, [formData?.type]);

  console.log(formData);

  const [htmlContent, setHtmlContent] = useState('');

  const handleEditorChange = (html: string) => {
    setHtmlContent(html);
  };
  useEffect(() => {
    setUrlValidationMessage(null);
  }, [invitationId]);

  return (
    <div className="flex h-screen">
      {/* {isLoading && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="h-screen w-full flex justify-center items-center">
          <BeatLoader color={theme.color.pink300} loading={isLoading} />
        </motion.div>
      )} */}
      <Wrap className="scroll-container bg-[#F5F4F0] p-6 overflow-auto w-1/2 h-full pb-20">
        <p className="text-[18px] font-suite-bold text-text-default mb-6">청첩장 제작</p>

        <div className="flex flex-col gap-2">
          <div>
            <Label text="URL 입력" required={true} className="mb-2" />
            <div className="flex gap-2">
              <CustomInput type="text" placeholder="URL을 입력해주세요" value={invitationId} onChange={(e) => setInvitationId(e.target.value)} className="w-4/5" />
              <CustomButton
                text="확인"
                onClick={async () => {
                  await checkInvitationId(invitationId);
                }}
                disabled={invitationId?.trim() === '' || !/^[a-z0-9-]+$/.test(invitationId)}
                active
                className="w-1/5 max-w-[72px]"
              />
            </div>
            {invitationId?.trim() === '' && <CustomInfoText text="url을 입력해주세요" color={'#EF665B'} className="my-2" />}
            {!/^[a-z0-9-]+$/.test(invitationId) && <CustomInfoText text="영문 소문자, 숫자, 하이픈(-)만 사용 가능해요" color={'#EF665B'} className="my-2" />}

            {urlValidationMessage === true && invitationId?.trim() !== '' && /^[a-z0-9-]+$/.test(invitationId) && (
              <CustomInfoText text={'사용가능한 url입니다.'} color={'#17d287'} className="my-2" />
            )}
            {urlValidationMessage === false && invitationId?.trim() !== '' && /^[a-z0-9-]+$/.test(invitationId) && (
              <CustomInfoText text={'이미 사용중인 url입니다.'} color={'#EF665B'} className="my-2" />
            )}
          </div>
          <CustomAccordion
            title="예식 일시"
            children={
              <div>
                <Label text="식 일자 · 식장 정보" required={true} className="mb-2" />
                <CustomDatePicker
                  value={formData?.wedding_day ? dayjs(formData.wedding_day).toDate() : formData?.main?.date ? dayjs(formData.main.date).toDate() : undefined}
                  onChange={(date) => {
                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                    handleChange('wedding_day', formattedDate);
                    handleChange('main.date', formattedDate);
                  }}
                  className="mb-3"
                />
                <CustomTimePicker
                  value={formData?.main?.time}
                  onChange={(type, value) => {
                    handleChange('main.time', value);
                  }}
                />
              </div>
            }
          />
          <CustomAccordion
            title="예식 장소"
            children={
              <div>
                <Label text="예식장 주소" required={true} className="mb-2" />
                <div className="flex items-center gap-2 mb-5">
                  <CustomInput type="text" placeholder="식장 주소" value={formData?.address || ''} readOnly />
                  <DaumPost setAddress={(value: any) => handleChange('address', value)} />
                </div>
                <Label text="예식장 명" required={true} className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="예식장 명"
                  value={formData?.address_name || ''}
                  onChange={(e) => handleChange('address_name', e.target.value)}
                  className="mb-5"
                />
                <Label text="층 / 홀" required={true} className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="층 / 홀"
                  value={formData?.address_detail || ''}
                  onChange={(e) => handleChange('address_detail', e.target.value)}
                  className="mb-5"
                />
                <Label text="예식장 연락처" required={true} className="mb-2" />
                <CustomInput type="text" placeholder="예식장 연락처" value={formData?.hall_phone || ''} onChange={(e) => handleChange('hall_phone', e.target.value)} />
              </div>
            }
          />
          <CustomAccordion
            title="신랑 · 신부 정보"
            children={
              <div>
                <CustomInfoText text="신랑님과 신부님의 정보를 입력해주세요." className="mb-5" />
                <Label text="신랑님" required={true} className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomInput
                    type="text"
                    placeholder="성"
                    value={formData?.groom_first_name || ''}
                    onChange={(e) => handleChange('groom_first_name', e.target.value)}
                    className="!w-2/5"
                  />
                  <CustomInput type="text" placeholder="이름" value={formData?.groom_last_name || ''} onChange={(e) => handleChange('groom_last_name', e.target.value)} />
                  {/* <CustomCheckbox text="장남" value={formData?.isFirstSon} onChange={(val) => setFormData({ ...formData, isFirstSon: val })} /> */}
                </div>
                <Label text="신부님" required={true} className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomInput
                    type="text"
                    placeholder="성"
                    value={formData?.bride_first_name || ''}
                    onChange={(e) => handleChange('bride_first_name', e.target.value)}
                    className="!w-2/5"
                  />
                  <CustomInput type="text" placeholder="이름" value={formData?.bride_last_name || ''} onChange={(e) => handleChange('bride_last_name', e.target.value)} />
                  {/* <CustomCheckbox text="장녀" value={formData?.isFirstDaughter} onChange={(val) => setFormData({ ...formData, isFirstDaughter: val })} /> */}
                </div>
                <div className="flex gap-2 mb-2">
                  <Label text="표시순서" required={true} />
                  <CustomTooltip text="청첩장에 표시되는 신랑 · 신부님의 순서를 변경하실 수 있습니다" />
                </div>
                <div className="flex gap-2">
                  <CustomButton text="신랑 먼저" onClick={() => handleChange('name_display_order', 'groomFirst')} active={formData?.name_display_order === 'groomFirst'} />
                  <CustomButton text="신부 먼저" onClick={() => handleChange('name_display_order', 'brideFirst')} active={formData?.name_display_order === 'brideFirst'} />
                </div>
              </div>
            }
          />
          <CustomAccordion
            title="혼주 정보"
            children={
              <div>
                <CustomInfoText text="혼주 정보 가리기 : [신랑 · 신부 정보] 블록 '가족 표기' 미입력" className="mb-1" />
                <CustomInfoText text="입력하지 않은 혼주분의 정보는 노출되지 않습니다." className="mb-5" />
                <Label text="신랑 아버지" required={true} className="mb-2" />
                <div className="flex gap-2 mb-5 flex-wrap">
                  <CustomInput
                    type="text"
                    placeholder="성함"
                    value={formData?.groom_parents?.dad?.name}
                    onChange={(e) => handleParentValueChange('groom_parents', 'dad', 'name', e.target.value)}
                    className="w-full sm:max-w-[270px]"
                  />
                  <div className="flex gap-2">
                    <CustomCheckbox
                      text="고인 표시"
                      value={formData?.groom_parents?.dad?.isDeceased}
                      onChange={() => handleParentValueChange('groom_parents', 'dad', 'isDeceased', !formData?.groom_parents?.dad?.isDeceased)}
                    />
                    {formData?.groom_parents?.dad?.isDeceased && (
                      <CustomSelect
                        value={formData?.groom_parents?.dad?.isDeceased_mark}
                        onChange={(value) => handleParentValueChange('groom_parents', 'dad', 'isDeceased_mark', value)}
                        options={[
                          { label: '故', value: 'text' },
                          { label: <PiFlowerFill />, value: 'icon' },
                        ]}
                        className="max-w-[100px]"
                      />
                    )}
                  </div>
                </div>
                <Label text="신랑 어머니" required={true} className="mb-2" />
                <div className="flex gap-2 mb-5 flex-wrap">
                  <CustomInput
                    type="text"
                    placeholder="성함"
                    value={formData?.groom_parents?.mom?.name}
                    onChange={(e) => handleParentValueChange('groom_parents', 'mom', 'name', e.target.value)}
                    className="w-full sm:max-w-[270px]"
                  />
                  <div className="flex gap-2">
                    <CustomCheckbox
                      text="고인 표시"
                      value={formData?.groom_parents?.mom?.isDeceased}
                      onChange={() => handleParentValueChange('groom_parents', 'mom', 'isDeceased', !formData?.groom_parents?.mom?.isDeceased)}
                    />
                    {formData?.groom_parents?.mom?.isDeceased && (
                      <CustomSelect
                        value={formData?.groom_parents?.mom?.isDeceased_mark}
                        onChange={(value) => handleParentValueChange('groom_parents', 'mom', 'isDeceased_mark', value)}
                        options={[
                          { label: '故', value: 'text' },
                          { label: <PiFlowerFill />, value: 'icon' },
                        ]}
                        className="max-w-[100px]"
                      />
                    )}
                  </div>
                </div>
                <Label text="신부 아버지" required={true} className="mb-2" />
                <div className="flex gap-2 mb-5 flex-wrap">
                  <CustomInput
                    type="text"
                    placeholder="성함"
                    value={formData?.bride_parents?.dad?.name}
                    onChange={(e) => handleParentValueChange('bride_parents', 'dad', 'name', e.target.value)}
                    className="w-full sm:max-w-[270px]"
                  />
                  <div className="flex gap-2">
                    <CustomCheckbox
                      text="고인 표시"
                      value={formData?.bride_parents?.dad?.isDeceased}
                      onChange={() => handleParentValueChange('bride_parents', 'dad', 'isDeceased', !formData?.bride_parents?.dad?.isDeceased)}
                    />
                    {formData?.bride_parents?.dad?.isDeceased && (
                      <CustomSelect
                        value={formData?.bride_parents?.dad?.isDeceased_mark}
                        onChange={(value) => handleParentValueChange('bride_parents', 'dad', 'isDeceased_mark', value)}
                        options={[
                          { label: '故', value: 'text' },
                          { label: <PiFlowerFill />, value: 'icon' },
                        ]}
                        className="max-w-[100px]"
                      />
                    )}
                  </div>
                </div>
                <Label text="신부 어머니" required={true} className="mb-2" />
                <div className="flex gap-2 mb-5 flex-wrap">
                  <CustomInput
                    type="text"
                    placeholder="성함"
                    value={formData?.bride_parents?.mom?.name}
                    onChange={(e) => handleParentValueChange('bride_parents', 'mom', 'name', e.target.value)}
                    className="w-full sm:max-w-[270px]"
                  />
                  <div className="flex gap-2">
                    <CustomCheckbox
                      text="고인 표시"
                      value={formData?.bride_parents?.mom?.isDeceased}
                      onChange={() => handleParentValueChange('bride_parents', 'mom', 'isDeceased', !formData?.bride_parents?.mom?.isDeceased)}
                    />
                    {formData?.bride_parents?.mom?.isDeceased && (
                      <CustomSelect
                        value={formData?.bride_parents?.mom?.isDeceased_mark}
                        onChange={(value) => handleParentValueChange('bride_parents', 'mom', 'isDeceased_mark', value)}
                        options={[
                          { label: '故', value: 'text' },
                          { label: <PiFlowerFill />, value: 'icon' },
                        ]}
                        className="max-w-[100px]"
                      />
                    )}
                  </div>
                </div>
              </div>
            }
          />
          <CustomAccordion
            title="양가 가족 안내"
            children={
              <div>
                <CustomInfoText text="부모님 연락처를 비워두시면 노출되지 않습니다." className="mb-5" />

                <Label text="표시 타입" className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomButton text="가로형" onClick={() => handleChange('family_display_type', 'row')} active={formData?.family_display_type === 'row'} />
                  <CustomButton text="중앙정렬형" onClick={() => handleChange('family_display_type', 'center')} active={formData?.family_display_type === 'center'} />
                  <CustomButton text="간략형" onClick={() => handleChange('family_display_type', 'brief')} active={formData?.family_display_type === 'brief'} />
                </div>
                <Label text="설정" className="mb-2" />
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="신랑 · 신부 전체 이름으로 표시" />
                      <CustomToggle
                        checked={formData?.full_name_display}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            full_name_display: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <Label text="신랑님 연락처" required={true} className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="신랑님 연락처"
                  value={formData?.groom_phone || ''}
                  onChange={(e) => handleChange('groom_phone', e.target.value)}
                  className="mb-5"
                />
                <Label text="신랑 아버지 연락처" className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="신랑 아버지 연락처"
                  value={formData?.groom_dad_phone || ''}
                  onChange={(e) => handleChange('groom_dad_phone', e.target.value)}
                  className="mb-5"
                />
                <Label text="신랑 어머니 연락처" className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="신랑 어머니 연락처"
                  value={formData?.groom_mom_phone || ''}
                  onChange={(e) => handleChange('groom_mom_phone', e.target.value)}
                  className="mb-5"
                />
                <Label text="신부님 연락처" required={true} className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="신부님 연락처"
                  value={formData?.bride_phone || ''}
                  onChange={(e) => handleChange('bride_phone', e.target.value)}
                  className="mb-5"
                />
                <Label text="신부 아버지 연락처" className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="신부 아버지 연락처"
                  value={formData?.bride_dad_phone || ''}
                  onChange={(e) => handleChange('bride_dad_phone', e.target.value)}
                  className="mb-5"
                />
                <Label text="신부 어머니 연락처" className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="신부 어머니 연락처"
                  value={formData?.bride_mom_phone || ''}
                  onChange={(e) => handleChange('bride_mom_phone', e.target.value)}
                  className="mb-5"
                />
              </div>
            }
          />
          <CustomAccordion
            title="커버 디자인"
            children={
              <div>
                <CustomInfoText text="커버 이미지는 레이아웃에 자동으로 맞춰집니다." className="mb-1" />
                <CustomInfoText text="텍스트 정보는 별도 입력 없이 자동으로 완성됩니다." className="mb-5" />
                <Label text="디자인" required={true} className="mb-2" />
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
                  <div className="flex gap-2 mb-2">
                    <Label text="커버 이미지" required={true} />
                    <CustomTooltip text="에디터와 미리보기에서는 화질이 저하되어 보일 수 있으나, 실제 공유 시 모바일에 최적화 된 화질로 표시됩니다" />
                  </div>
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
                <Label text="이름 레이아웃 타입" required={true} className="mb-2" />
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
                    className="w-[240px] flex items-center gap-3 flex-wrap sm:flex-nowrap"
                  />
                </div>
              </div>
            }
          />
          {/* <CustomAccordion
            title="폰트"
            children={
              <div>
                <CustomInfoText text="청첩장의 폰트와 사이즈를 변경하실 수 있습니다." className="mb-5" />
              </div>
            }
          /> */}
          <CustomAccordion
            title="카톡 · 링크 공유 설정"
            children={
              <div>
                <CustomInfoText text="청첩장 공유 시 표시되는 이미지와 문구를 설정하실 수 있습니다." className="mb-1" />
                <CustomInfoText text="카카오톡 공유는 청첩장 하단의 `카카오톡으로 청첩장 전하기` 버튼으로 공유할 수 있습니다." className="mb-5" />
                <div className="flex gap-2">
                  <CustomButton
                    text="카카오톡 공유 설정하기"
                    onClick={() => setShareSettingsModal({ ...shareSettingsModal, open: true, title: '카카오톡 공유 설정하기', type: 'KAKAO', data: formData })}
                    active
                  />
                  <CustomButton
                    text="URL 링크 공유 설정하기"
                    onClick={() => setShareSettingsModal({ ...shareSettingsModal, open: true, title: 'URL 링크 공유 설정하기', type: 'LINK', data: formData })}
                    active
                  />
                </div>
              </div>
            }
          />
          <CustomAccordion
            title="모시는 글"
            children={
              <div>
                <CustomInfoText text="많은 커플들이 선택한 샘플 문구를 활용하여 수정하실 수 있습니다." className="mb-5" />

                <div className="flex gap-2 mb-2">
                  <Label text="제목" />
                  <CustomTooltip text="미입력시 해당 부분이 가려집니다." />
                </div>
                <CustomInput
                  type="text"
                  placeholder="제목"
                  value={formData?.main.main_title || ''}
                  onChange={(e) => handleChange('main.main_title', e.target.value)}
                  className="mb-5"
                />
                <Label text="제목 정렬" className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomButton text="왼쪽 정렬" onClick={() => handleChange('main.main_title_align', 'left')} active={formData?.main.main_title_align === 'left'} />
                  <CustomButton text="가운데 정렬" onClick={() => handleChange('main.main_title_align', 'center')} active={formData?.main.main_title_align === 'center'} />
                </div>

                <Label text="모시는 글" required={true} className="mb-2" />
                {/* <TiptapEditor value={formData?.main.intro_content} onChange={(html) => handleChange('main.intro_content', html)} /> */}
                {/* <TiptapEditor onChange={handleEditorChange} />/ */}
                {/* <div className="mt-4">
                  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div> */}
                <Textarea placeholder="입력해주세요" value={formData?.main.intro_content} onChange={(e) => handleChange('main.intro_content', e.target.value)} className="mb-5" />
                <Label text="내용 정렬" className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomButton text="왼쪽 정렬" onClick={() => handleChange('main.intro_content_align', 'left')} active={formData?.main.intro_content_align === 'left'} />
                  <CustomButton text="가운데 정렬" onClick={() => handleChange('main.intro_content_align', 'center')} active={formData?.main.intro_content_align === 'center'} />
                </div>

                <Button
                  text="샘플문구 활용하기"
                  onClick={() => setSampleGreetingMessageModal({ ...sampleGreetingMessageModal, open: true, data: formData })}
                  className="mt-5 mb-5"
                />

                <Label text="설정" className="mb-2" />
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="글 하단 신랑 · 신부 이름 표기" />
                      <CustomToggle checked={formData?.main?.intro_name_display} onChange={(val) => handleChange('main.intro_name_display', val)} />
                    </div>
                  }
                />
              </div>
            }
          />
          {/* <CustomAccordion
            title="예식일 하이라이트"
            children={
              <div>
                <CustomInfoText text="예식 일자를 영문으로 표시해주는 블럭입니다." className="mb-1" />
                <CustomInfoText text="[폰트] 블록에서 선택한 폰트를 동일하게 적용할 수 있습니다." className="mb-5" />
                <Label text="타입" required={true} className="mb-2" />
              </div>
            }
          /> */}
          <CustomAccordion
            title="캘린더"
            children={
              <div>
                <CustomInfoText text="설정하신 예식 일시가 캘린더에 자동으로 반영됩니다." className="mb-5" />
                <Label text="설정" className="mb-2" />
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="달력 표시" />
                      <CustomToggle
                        checked={formData?.calendar_display}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            calendar_display: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="카운트다운 표시" />
                      <CustomToggle
                        checked={formData?.countdown_display}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            countdown_display: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <CustomBox
                  type="input"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="D-day 표시" />
                      <CustomToggle
                        checked={formData?.d_day_display}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            d_day_display: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
              </div>
            }
          />
          <CustomAccordion
            title="갤러리"
            children={
              <div>
                <CustomInfoText text="사진은 최대 10장까지 업로드하실 수 있습니다." className="mb-1" />
                <CustomInfoText text="사진을 업로드 한 뒤 드래그하면 순서를 변경하실 수 있습니다." className="mb-1" />
                <CustomInfoText text="용량이 큰 사진은 최적화된 해상도와 크기로 업로드 됩니다." className="mb-5" />
                <div className="flex justify-between items-center">
                  <Label text="이미지" required={true} className="mb-2" /> <p className="text-xs text-text-default">{formData?.gallery?.length}/10 장</p>
                </div>
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} value={''} />
                <div className="flex flex-wrap gap-3 mt-3 mb-5">
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
                {/* <Label text="설정" className="mb-2" />
                이미지 클릭 시 전체화면 팝업 */}
              </div>
            }
          />
          <CustomAccordion
            title="오시는 길"
            children={
              <div>
                <CustomInfoText text="지도 서비스에 등록 신청한 주소와 핀 표시 위치가 상이할 수 있습니다." className="mb-1" />
                <CustomInfoText text="핀 위치 정정하기 : 아래 지도에서 클릭하는 위치로 옮길 수 있습니다." className="mb-5" />
                <KakaoMap address={formData?.address} />
                <Label text="교통수단 안내" required={true} className="mb-2 mt-5" />
                <div className="flex flex-col gap-2 mb-3">
                  <p className="text-[14px] font-suite-medium text-text-default">지하철</p>
                  {formData?.directions_desc
                    ?.filter((direction: any) => direction.type == '지하철')[0]
                    .desc?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CustomInput type="text" placeholder="입력" value={item} onChange={(e) => handleObjectValueChange('지하철', idx, e.target.value)} />
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
                        <CustomInput type="text" placeholder="입력" value={item} onChange={(e) => handleObjectValueChange('버스', idx, e.target.value)} />
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
                        <CustomInput type="text" placeholder="입력" value={item} onChange={(e) => handleObjectValueChange('주차', idx, e.target.value)} />
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
              </div>
            }
          />
          <CustomAccordion
            title="계좌 정보"
            children={
              <div>
                <CustomInfoText text="입력하지 않은 분의 계좌 정보는 노출되지 않습니다." className="mb-1" />
                <CustomInfoText text="계좌 정보를 정확하게 입력해 주세요." className="mb-5" />
                <Label text="제목" className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="제목"
                  value={formData?.account_title || '마음 전하실 곳'}
                  onChange={(e) => handleChange('account_title', e.target.value)}
                  className="mb-5"
                />
                <Label text="설명" className="mb-2" />
                <Textarea placeholder="설명" value={formData?.account_desc} onChange={(e) => handleChange('account_desc', e.target.value)} className="mb-5" />
                <Label text="배치" className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomButton text="탭" onClick={() => handleChange('account_layout', 'tab')} active={formData?.account_layout === 'tab'} />
                  <CustomButton text="나열" onClick={() => handleChange('account_layout', 'align')} active={formData?.account_layout === 'align'} />
                </div>
                <Label text="디자인" className="mb-2" />
                <div className="flex gap-2 mb-5">
                  <CustomButton text="가로" onClick={() => handleChange('account_design', 'row')} active={formData?.account_design === 'row'} />
                  <CustomButton text="세로" onClick={() => handleChange('account_design', 'col')} active={formData?.account_design === 'col'} />
                </div>
                <div className="flex gap-2 mb-2">
                  <Label text="설정" />
                  <CustomTooltip text="계좌 정보가 바로 노출되는 것이 부담스러우실 경우, 가려둔 후 선택적으로 표시할 수 있습니다" />
                </div>
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="계좌 정보 접어두기" />
                      <CustomToggle
                        checked={formData?.is_account_open || false}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            is_account_open: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="간편송금" />
                      <CustomToggle
                        checked={formData?.is_kakao_account}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            is_kakao_account: val,
                          }))
                        }
                      />
                    </div>
                  }
                />

                <div className="flex flex-col gap-2 mb-3">
                  <p className="text-[14px] font-suite-medium text-text-default">신랑측</p>
                  {formData?.groom_account?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex gap-2 w-full">
                          <CustomInput
                            type="text"
                            placeholder="@@은행 "
                            value={item?.bank || ''}
                            onChange={(e) => handleAccountChange('groom_account', idx, 'bank', e.target.value)}
                          />
                          <CustomInput
                            type="text"
                            placeholder="예금주"
                            value={item?.name || ''}
                            onChange={(e) => handleAccountChange('groom_account', idx, 'name', e.target.value)}
                          />
                        </div>
                        <CustomInput
                          type="text"
                          placeholder="계좌번호"
                          value={item?.account || ''}
                          onChange={(e) => handleAccountChange('groom_account', idx, 'account', e.target.value)}
                        />
                        <CustomInput
                          type="text"
                          placeholder="간편송금"
                          value={item?.kakao || ''}
                          onChange={(e) => handleAccountChange('groom_account', idx, 'kakao', e.target.value)}
                        />
                      </div>
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
                <div className="flex flex-col gap-2 mb-3">
                  <p className="text-[14px] font-suite-medium text-text-default">신부측</p>

                  {formData?.bride_account?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex gap-2 w-full">
                          <CustomInput
                            type="text"
                            placeholder="@@은행 "
                            value={item?.bank || ''}
                            onChange={(e) => handleAccountChange('bride_account', idx, 'bank', e.target.value)}
                          />
                          <CustomInput
                            type="text"
                            placeholder="예금주"
                            value={item?.name || ''}
                            onChange={(e) => handleAccountChange('bride_account', idx, 'name', e.target.value)}
                          />
                        </div>
                        <CustomInput
                          type="text"
                          placeholder="계좌번호"
                          value={item?.account || ''}
                          onChange={(e) => handleAccountChange('bride_account', idx, 'account', e.target.value)}
                        />
                        <CustomInput
                          type="text"
                          placeholder="간편송금"
                          value={item?.kakao || ''}
                          onChange={(e) => handleAccountChange('bride_account', idx, 'kakao', e.target.value)}
                        />
                      </div>
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
              </div>
            }
          />
          <CustomAccordion
            title="참석의사"
            children={
              <div>
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="참석의사 노출" />
                      <CustomToggle
                        checked={formData?.attendance_display}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            attendance_display: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <Label text="제목" className="mb-2" />
                <CustomInput
                  type="text"
                  placeholder="제목"
                  value={formData?.attendance_title}
                  onChange={(e) => handleChange('attendance_title', e.target.value)}
                  className="mb-5"
                />
                <Label text="설명" className="mb-2" />
                <Textarea placeholder="설명" value={formData?.attendance_desc} onChange={(e) => handleChange('attendance_desc', e.target.value)} className="mb-5" />
                <div className="flex gap-2 mb-2">
                  <Label text="질문 항목" />
                  <CustomTooltip text="하객분들에게 참석 여부와 함께 추가적인 응답을 받고자 하는 질문 항목을 설정하실 수 있습니다" />
                </div>
                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="식사 여부" />
                      <CustomToggle
                        checked={formData?.attendees_eat_or_not}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            attendees_eat_or_not: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <CustomBox
                  type="input"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="참석 인원" />
                      <CustomToggle
                        checked={formData?.attendees_number}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            attendees_number: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
              </div>
            }
          />
          <CustomAccordion
            title="방명록"
            children={
              <div>
                <CustomInfoText text="청첩장 소유자와 작성자는 방명록의 글을 삭제할 수 있습니다." className="mb-1" />
                <CustomInfoText text="[삭제 권한 비밀번호]를 자유롭게 설정하실 수 있습니다." className="mb-5" />

                <CustomBox
                  type="input"
                  className="mb-5"
                  children={
                    <div className="flex justify-between w-full">
                      <Label text="방명록 노출" />
                      <CustomToggle
                        checked={formData?.guestbook_display}
                        onChange={(val) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            guestbook_display: val,
                          }))
                        }
                      />
                    </div>
                  }
                />
                <Label text="제목" className="mb-2" />
                <CustomInput type="text" placeholder="제목" value={formData?.guestbook_title} onChange={(e) => handleChange('guestbook_title', e.target.value)} className="mb-5" />
                <Label text="설명" className="mb-2" />
                <Textarea placeholder="설명" value={formData?.guestbook_desc} onChange={(e) => handleChange('guestbook_desc', e.target.value)} className="mb-5" />
                <div className="flex gap-2 mb-2">
                  <Label text="삭제 권한 비밀번호" required={true} />
                  <CustomTooltip text="방명록에 남겨진 특정 게시물을 삭제하실 경우, 입력하셔야 하는 비밀번호입니다" />
                </div>
                <CustomInput
                  type="text"
                  placeholder="비밀번호 입력"
                  value={formData?.guestbook_password}
                  onChange={(e) => handleChange('guestbook_password', e.target.value)}
                  className="mb-5"
                />
              </div>
            }
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {/* <Button onClick={handleSave} disabled={isLoading}>
            저장하기
          </Button> */}
          <CustomButton text="임시 저장" onClick={() => handleSave(true)} />
          <CustomButton text="저장 완료" onClick={() => handleSave(false)} />
        </div>
      </Wrap>
      <Wrap className="scroll-container hidden sm:flex bg-text-default overflow-auto w-1/2 h-full">
        <div className="max-w-[400px] mx-auto">{RenderedComponent && <RenderedComponent data={formData} />}</div>
      </Wrap>
      <ShareSettingsModal
        open={shareSettingsModal.open}
        onOpenChange={setShareSettingsModal}
        title={shareSettingsModal.title}
        type={shareSettingsModal.type}
        setData={(newData: any) => setFormData({ ...formData, ...newData })}
        data={formData}
        setShareKakaoImg={setShareKakaoImg}
        setShareLinkImg={setShareLinkImg}
      />
      <SampleGreetingMessageModal
        open={sampleGreetingMessageModal.open}
        onOpenChange={setSampleGreetingMessageModal}
        title={'샘플 문구 활용'}
        setData={(newData: any) => setFormData({ ...formData, ...newData })}
        data={formData}
      />
    </div>
  );
}
