'use client';

import { Button } from '@components/ui/button';
import { CustomInfoText } from '@components/ui/CustomInfoText';
import { CustomInput } from '@components/ui/CustomInput';
import { FaRegUser } from 'react-icons/fa';
import { Label } from '@components/ui/label';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useUserStore } from '@stores/useUserStore';
import { userLogout } from '@hook/useLogout';

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

export default function MyPage() {
  const { user } = useUserStore();
  const logout = userLogout();

  return (
    <Wrap className="scroll-container bg-[#F5F4F0] p-10 overflow-auto w-full h-full pb-20">
      <div className="flex flex-col gap-2 max-w-[640px] mx-auto">
        <div>
          <Title className="shadow-default w-full px-6 py-4 bg-white font-suite text-left text-sm font-medium flex items-center gap-2">
            <FaRegUser size={18} color={theme.color.pink600} />
            <p className="text-gray-700">마이 페이지</p>
          </Title>
          <Content>
            <p className="text-[18px] font-suite-bold text-gray-600 mb-3">내 정보</p>
            <CustomInfoText text="로그인 계정 정보가 자동으로 설정됩니다." className="mb-8" />
            <Label text="이메일" className="mb-2" />
            <div className="flex gap-2 mb-5 flex-wrap">
              <CustomInput type="text" placeholder="성함" value={user?.email || ''} onChange={(e) => {}} className="w-full sm:max-w-[270px]" disabled={true} />
            </div>

            <div className="flex justify-end mt-10">
              <Button text="로그아웃" variant="pink" onClick={logout} />
            </div>
          </Content>
        </div>
      </div>
    </Wrap>
  );
}
