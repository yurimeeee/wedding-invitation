'use client';

import 'aos/dist/aos.css';

import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog';

import { CustomButton } from '../../../../../ui/CustomButton';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { PageLoading } from '../../../../../ui/PageLoading';
import { toast } from 'sonner';
import { useDomainCheck } from '@hook/useDomainCheck';
import { useLoadingStore } from '@stores/useLoadingStore';
import { useRouter } from 'next/navigation';

type AddInvitationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddInvitationModal({ open, onOpenChange }: AddInvitationModalProps) {
  const router = useRouter();
  const { pageLoading, setPageLoading } = useLoadingStore();
  const { domain, urlValidationMessage, formatErrorMessage, isLoading, handleDomainChange, handleBlur, handleReset } = useDomainCheck();
  console.log('pageLoading', pageLoading);
  const handleCreateButtonClick = () => {
    // 도메인 검증 상태를 확인하여 라우팅 결정
    if (urlValidationMessage === true && !isLoading && formatErrorMessage === null) {
      router.push(`/editor/create/type1?domain=${domain}`);
      setPageLoading(true);
    } else {
      let errorMessage = '도메인 주소를 다시 확인해주세요.';
      if (formatErrorMessage) {
        errorMessage = formatErrorMessage;
      } else if (urlValidationMessage === false) {
        errorMessage = '이미 사용 중이거나 유효하지 않은 도메인입니다.';
      } else if (isLoading) {
        errorMessage = '도메인 중복 확인 중입니다. 잠시 기다려주세요.';
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        handleReset();
      }}
    >
      <DialogContent className="scroll-container">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="font-suite flex flex-col items-center">
          <p className="tracking-tight flex justify-center text-2xl font-normal leading-snug opacity-90 text-text-default my-5">특별한 청첩장 도메인을 만들어 주세요</p>
          <p className="text-sm text-muted-foreground flex justify-center font-normal leading-snug mb-10 text-center" style={{ color: ` rgb(209, 146, 146)` }}>
            알파벳 / 숫자 / 하이픈(-)만 사용 가능해요
          </p>
          <div className="flex gap-3 max-w-[360px] mx-auto mb-2">
            <CustomInput
              type="text"
              placeholder="ex) couplename"
              value={domain}
              onChange={handleDomainChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className="mx-auto w-full flex"
            />
            <CustomButton text="선택" onClick={handleCreateButtonClick} disabled={!urlValidationMessage} active={true} className="max-w-[60px]" />
          </div>

          {/* {isLoading && <CustomInfoText text="확인 중..." color={'#40aed0'} className="my-2 mx-auto text-center" />}
          {!isLoading && domain.trim() === '' && <CustomInfoText text="도메인을 입력해주세요." color={theme.color.gray_600} className="my-2 mx-auto text-center" />}
          {!isLoading && domain.trim() !== '' && formatErrorMessage !== null ? (
            <CustomInfoText text={formatErrorMessage} color="#EF665B" className="my-2 mx-auto text-center" />
          ) : !isLoading && domain.trim().length > 0 && domain.trim().length < 5 ? (
            <CustomInfoText text="5자 이상 입력해주세요" color="#EF665B" className="my-2 mx-auto text-center" />
          ) : !isLoading && urlValidationMessage === true ? (
            <CustomInfoText text="사용 가능한 주소입니다" color="#17d287" className="my-2" />
          ) : !isLoading && urlValidationMessage === false ? (
            <CustomInfoText text="이미 사용 중인 주소입니다" color="#EF665B" className="my-2 mx-auto text-center" />
          ) : null} */}
          {/* 로딩 상태 표시 */}
          {/* {isLoading && <p>도메인 중복 확인 중...</p>} */}

          {/* 유효성 메시지 표시 */}
          <div className="min-h-[36px]">
            {urlValidationMessage === true && !isLoading && <CustomInfoText text="사용 가능한 주소입니다." color="#17d287" className="my-2" />}
            {urlValidationMessage === false && !isLoading && formatErrorMessage === null && (
              <CustomInfoText text="이미 사용 중인 주소입니다." color="#EF665B" className="my-2 mx-auto text-center" />
            )}
            {formatErrorMessage && <CustomInfoText text={formatErrorMessage} color="#EF665B" className="my-2" />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
