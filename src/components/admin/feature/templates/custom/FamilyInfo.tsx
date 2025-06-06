import { IoIosCall } from 'react-icons/io';
import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';

const CallButton = styled.a`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0dfd8;
`;

type FamilyInfoProps = {
  data: TemplatesData;
};

const FamilyInfo = ({ data }: FamilyInfoProps) => {
  // groom_dad;
  // bride_dad;
  // groom_phone;
  // bride_first_name;
  // bride_last_name;
  // groom_first__name;
  // groom_last_name;
  // bride_mom;
  // bride_dad;
  // bride_phone;
  return (
    <div className="flex flex-col items-center font-chosun my-6 border-t border-gray-300 pt-6">
      <div className="flex gap-2 items-center">
        <p className="text-[18px]">
          {data?.groom_dad || '김길동'} · {data?.groom_mom || '이영숙'} 의 {data?.isFirstSon ? '장남' : '차남'}
        </p>
        <p className="text-xl leading-8 tracking-wider font-chosun-medium">{data?.groom_last_name || '철수'}</p>
        <p className="text-xl leading-8 tracking-wider font-chosun-medium">···</p>
        <CallButton href={`tel:${data?.groom_phone}`}>
          <IoIosCall color="#fff" />
        </CallButton>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-[18px]">
          {data?.bride_dad || '이도령'} · {data?.bride_mom || '박춘향'} 의 {data?.isFirstDaughter ? '장녀' : '차녀'}
        </p>
        <p className="text-xl leading-8 tracking-wider font-chosun-medium">{data?.bride_last_name || '영희'}</p>
        <p className="text-xl leading-8 tracking-wider font-chosun-medium">···</p>
        <CallButton href={`tel:${data?.bride_phone}`}>
          <IoIosCall color="#fff" />
        </CallButton>
      </div>
    </div>
  );
};

export default FamilyInfo;
