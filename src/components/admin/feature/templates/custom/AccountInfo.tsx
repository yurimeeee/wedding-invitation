import { MdOutlineContentCopy } from 'react-icons/md';
import { TemplatesData } from '../../../../../type/templates';
import { handleCopy } from '@utils/func';
import theme from '@styles/theme';

type AccountInfoProps = {
  data: TemplatesData;
};

const AccountInfo = ({ data }: AccountInfoProps) => {
  return (
    <div className="w-full font-suite flex flex-col gap-2 px-4">
      <p className="font-chosun-bold text-gray-600 text-center text-base mb-5"> 마음 전하실 곳</p>
      <div className="w-full p-5 rounded-md border border-solid border-pink-300">
        <p className="text-base mb-2">신랑측</p>
        {data?.groom_account[0].account ? (
          data?.groom_account?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <p className="text-sm" onClick={() => handleCopy(item?.account)}>
                {item?.account} ({item?.name})
              </p>
              <MdOutlineContentCopy onClick={() => handleCopy(item?.account)} color={theme.color.gray_500} />
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm cursor-pointer" onClick={() => handleCopy('하나은행 123-456789-01-234')}>
              하나은행 123-456789-01-234 (홍길동)
            </p>{' '}
            <MdOutlineContentCopy className="cursor-pointer" onClick={() => handleCopy('하나은행 123-456789-01-234')} color={theme.color.gray_500} />
          </div>
        )}
      </div>

      <div className="w-full p-5 rounded-md border border-solid border-pink-300">
        <p className="text-base mb-2">신부측</p>
        {data?.groom_account[0].account ? (
          data?.groom_account?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <p className="text-sm" onClick={() => handleCopy(item?.account)}>
                {item?.account} ({item?.name})
              </p>
              <MdOutlineContentCopy onClick={() => handleCopy(item?.account)} color={theme.color.gray_500} />
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm cursor-pointer" onClick={() => handleCopy('국민은행 123-456789-01-234')}>
              국민은행 123-456789-01-234 (김영희)
            </p>
            <MdOutlineContentCopy className="cursor-pointer" onClick={() => handleCopy('국민은행 123-456789-01-234')} color={theme.color.gray_500} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
