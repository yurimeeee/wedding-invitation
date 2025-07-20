'use client';

import { auth, db } from "@lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useState } from "react";

import { debounce } from "lodash";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@stores/useUserStore";

// 도메인 검증, 중복 여부 확인 후 화면에 표시하는 hook
export const useDomainCheck = () => {
  const router = useRouter();
  const [domain, setDomain] = useState<string>('');
  const [urlValidationMessage, setUrlValidationMessage] = useState<boolean | null>(null); // true: 사용 가능, false: 중복/형식 오류, null: 초기/미확인
  const [formatErrorMessage, setFormatErrorMessage] = useState<string | null>(null); // 형식 오류 메시지
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

  // 도메인 형식 유효성 검사 함수
  const isValidDomainFormat = (input: string) => /^[a-zA-Z0-9-]+$/.test(input);

  // 도메인 중복 확인 (디바운스)
  const debouncedCheckInvitationId = useCallback(
    debounce(async (id: string) => {
      // 입력값이 없거나 5자 미만이면 검증 메시지 초기화
      if (!id || id.length < 5) {
        setUrlValidationMessage(null);
        setFormatErrorMessage(null);
        setIsLoading(false); // 로딩 상태도 초기화
        return;
      }

      // 형식 유효성 재확인 (debounce 전에 이미 확인했어도 한 번 더)
      if (!isValidDomainFormat(id)) {
        setFormatErrorMessage('알파벳, 숫자, 하이픈(-)만 사용 가능해요.');
        setUrlValidationMessage(false);
        setIsLoading(false); // 로딩 상태 초기화
        return;
      }

      setFormatErrorMessage(null); // 형식 오류 메시지 초기화
      setIsLoading(true); // 로딩 시작
      try {
        const docRef = doc(db, 'invitations', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUrlValidationMessage(false); // 중복됨 (사용 불가능)
        } else {
          setUrlValidationMessage(true); // 사용 가능
        }
      } catch (error) {
        console.error("도메인 확인 중 오류 발생:", error);
        toast.error('확인 중 오류가 발생했습니다. 다시 시도해주세요.'); // 사용자에게 오류 알림
        setUrlValidationMessage(false); // 오류 발생 시 사용 불가능으로 처리
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }, 500),
    []
  );

  // 도메인 입력 변경 핸들러 (onChange)
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomain(value); // domain 상태 업데이트

    if (value.length > 0 && !isValidDomainFormat(value)) {
      setFormatErrorMessage('알파벳, 숫자, 하이픈(-)만 사용 가능해요.');
      setUrlValidationMessage(false); // 형식 오류 시 사용 불가능으로 표시
      debouncedCheckInvitationId.cancel(); // 진행 중인 디바운스 취소
    } else {
      setFormatErrorMessage(null);
      if (value.length >= 5) {
        debouncedCheckInvitationId(value.trim()); // 디바운스된 중복 확인 호출
      } else {
        setUrlValidationMessage(null); // 5자 미만이면 검증 메시지 초기화
        debouncedCheckInvitationId.cancel(); // 진행 중인 디바운스 취소
      }
    }
  };

  // 도메인 입력 필드 포커스 아웃 핸들러 (onBlur)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val.length === 0) {
      setUrlValidationMessage(null);
      setFormatErrorMessage(null);
      debouncedCheckInvitationId.cancel(); // 진행 중인 디바운스 취소
      return;
    }
    // 형식 오류가 없고 5자 이상일 때만 중복 확인 (이미 디바운스된 함수가 호출될 수 있음)
    // blur 시점에는 이미 handleDomainChange에서 debouncedCheckInvitationId가 호출되었을 가능성이 높으므로
    // 추가적인 호출보다는 최종 확인 용도로 사용될 수 있습니다.
    if (formatErrorMessage === null && val.length >= 5) {
      debouncedCheckInvitationId(val); // trim된 값으로 다시 호출 (확실하게 트리거)
    }
  };

  // const handleCreateClick = () => {
  //   if (urlValidationMessage === true && !isLoading && formatErrorMessage === null) {
  //     router.push(`/editor/create/type1?domain=${domain}`);
  //   } else {
  //     toast.error('도메인 주소를 다시 확인해주세요.');
  //   }
  // };

  return {
    domain, // 현재 입력된 domain 값
    setDomain, // domain 값을 외부에서 변경할 수 있도록
    urlValidationMessage, // 도메인 사용 가능 여부 (true/false/null)
    formatErrorMessage, // 도메인 형식 오류 메시지
    isLoading, // 중복 확인 로딩 상태
    handleDomainChange, // onChange 핸들러
    handleBlur, // onBlur 핸들러
    isValidDomainFormat, // 외부에서 도메인 형식 검사를 위해 필요하다면
  };
}