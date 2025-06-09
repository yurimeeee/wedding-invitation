'use client';

import { PINK_200, PINK_300 } from '@styles/colors';

import CustomAccordion from './Accordion';
import { MdOutlineContentCopy } from 'react-icons/md';
import { TemplatesData } from '../../../../../type/templates';
import { handleCopy } from '@utils/func';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { useState } from 'react';

const TabItem = styled.div<{ active: boolean }>`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;

  transition: all.3s;
  color: ${(props) => {
    return props.active ? theme.color.textDefault : theme.color.gray_400;
  }};
  border-bottom: ${(props) => {
    return props.active ? `2px solid ${theme.color.textDefault}` : `1px solid ${theme.color.gray_300}`;
  }};
`;

type AccountInfoProps = {
  data: TemplatesData;
};

const AccountInfo = ({ data }: AccountInfoProps) => {
  const tabList: { text: string; value: string }[] = [
    { text: '신랑에게', value: 'groom' },
    { text: '신부에게', value: 'bride' },
  ];
  const [activeTab, setActiveTab] = useState<string>('groom');

  const renderComponentByDesign = (accountData: any) => {
    switch (data?.account_design) {
      case 'row':
        return accountData?.map((item: any, idx: number) => (
          <div key={idx} className="bg-white text-[#666666] text-center text-sm border rounded-md p-4 shadow-md whitespace-pre-wrap w-full">
            <div className="flex justify-between w-full">
              <p>{item?.name}</p>
              <p className="text-text-default">
                {item?.bank} {item?.account}
              </p>
            </div>
            <div className="flex justify-center mt-6 gap-x-3 text-white text-center *:h-10 *:align-baseline *:flex *:items-center">
              <button
                onClick={() => handleCopy(item?.account)}
                className="px-3 w-full rounded-lg cursor-pointer flex items-center justify-between text-[12px]"
                style={{ backgroundColor: `rgb(17, 17, 17)`, opacity: `0.7` }}
              >
                계좌복사
                <MdOutlineContentCopy color={theme.color.gray_500} />
              </button>
              {data?.is_kakao_account && item?.kakao && (
                <a
                  href={item?.kakao}
                  target="_blank"
                  className="px-3 w-full rounded-lg cursor-pointer flex items-center justify-between text-[12px] text-text-default bg-[#FFEB00]"
                >
                  간편송금
                  <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.75179 12.7805C2.42295 12.5582 2.12849 12.3807 1.85694 12.1733C-0.576705 10.3137 -0.591601 7.24411 1.82027 5.35586C4.17829 3.50886 8.02468 3.55469 10.3426 5.45784C12.6032 7.31286 12.5872 10.2758 10.2876 12.0908C8.85766 13.2194 7.2043 13.6078 5.40542 13.4898C5.14647 13.4726 4.8417 13.5471 4.62056 13.6823C3.9858 14.0672 3.3877 14.5141 2.76096 14.9151C2.63836 14.993 2.45274 14.9736 2.29692 14.9988C2.29233 14.8567 2.25681 14.7066 2.28889 14.5737C2.43097 13.9825 2.59253 13.3958 2.75408 12.7805H2.75179Z"
                      fill="#444444"
                    ></path>
                    <path
                      d="M21.783 6.41573C21.3155 4.81966 20.0678 3.98553 18.4362 4.25364C17.8037 4.35676 17.2102 4.69935 16.5903 4.93538C16.3119 4.39801 15.8318 4.27541 14.8018 4.54696V15.6828H17.0303V12.7301C17.2262 12.7714 17.3179 12.7932 17.4096 12.8081C19.5739 13.1644 21.3018 12.0381 21.854 9.91266C22.1577 8.74053 22.121 7.56839 21.783 6.41573ZM19.5338 9.75225C19.3161 10.8602 18.4637 11.2498 17.0337 11.0481C17.0337 9.53799 17.0303 8.05535 17.0429 6.57385C17.0441 6.47073 17.1414 6.32751 17.2354 6.27251C18.1578 5.72941 19.4089 6.1522 19.5716 7.16508C19.7057 8.00723 19.6977 8.91583 19.5338 9.75225Z"
                      fill="#444444"
                    ></path>
                    <path
                      d="M32.1275 14.8652C32.6098 14.2923 33.0464 13.7664 33.4921 13.2485C33.8232 12.8635 33.853 12.4865 33.6651 11.9939C32.8356 9.82489 32.053 7.63759 31.2544 5.45717C31.1776 5.24863 31.1157 5.03437 31.0264 4.75824C31.7917 4.55315 32.4964 4.36524 33.2572 4.16129C33.8519 6.2088 34.4293 8.19329 35.0515 10.3313C35.6691 8.18413 36.2443 6.18588 36.8355 4.13379C37.586 4.34003 38.2757 4.52908 38.9999 4.7273C38.9758 4.86594 38.9724 4.97594 38.9368 5.07333C38.0523 7.50697 37.1838 9.94634 36.2695 12.3674C35.7802 13.6621 35.0859 14.8411 34.0031 15.7543C33.6582 16.0453 33.3878 16.1232 33.0533 15.7291C32.7851 15.4129 32.446 15.1562 32.1286 14.864L32.1275 14.8652Z"
                      fill="#444444"
                    ></path>
                    <path
                      d="M29.9228 6.83129C29.8174 5.21459 28.7473 4.24755 27.1752 4.25099C26.2632 4.25328 25.3282 4.4641 24.4483 4.72763C23.5935 4.98314 23.6176 5.06564 23.967 5.91351C24.0667 6.15642 24.1721 6.39589 24.2856 6.66286C24.5067 6.5838 24.6786 6.49099 24.8596 6.46234C25.5127 6.35693 26.1704 6.18736 26.8223 6.2034C27.5934 6.22288 27.9177 6.7465 27.7779 7.65052C27.1535 7.65052 26.505 7.6024 25.8656 7.66083C24.7874 7.76051 23.8066 8.13519 23.4366 9.25805C23.1031 10.2732 23.118 11.3354 23.9212 12.1557C24.7634 13.0151 25.8301 13.0116 26.9037 12.6427C27.3265 12.4972 27.7206 12.2715 28.1297 12.0813C28.4963 13.0815 29.2984 12.4399 29.9526 12.6759C29.9526 10.6387 30.0477 8.72755 29.9228 6.83129ZM27.8639 9.51127C27.8192 9.87104 27.8822 10.4233 27.6817 10.5482C27.2234 10.8369 26.6424 10.9847 26.0936 11.0581C25.6571 11.1165 25.3638 10.7934 25.2996 10.3339C25.232 9.83896 25.5482 9.31649 26.065 9.21566C26.6321 9.10452 27.2176 9.09306 27.8444 9.03233C27.857 9.2844 27.8787 9.40013 27.8639 9.51127Z"
                      fill="#444444"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ));
      case 'col':
        return accountData?.map((item: any, idx: number) => (
          <div key={idx} className="bg-white text-[#666666] text-center text-sm border rounded-md p-4 shadow-md whitespace-pre-wrap w-full">
            <div className="flex justify-between w-full">
              <p>{item?.name || 'OOO'}</p>
              <p className="text-text-default">
                {item?.bank || 'OO은행'} {item?.account || '123-456-789012'}
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-center mt-6 text-white text-center *:h-10 *:align-baseline *:flex *:items-center">
              <button
                onClick={() => handleCopy(item?.account)}
                className="px-3 w-full rounded-lg cursor-pointer flex items-center justify-between text-[12px]"
                style={{ backgroundColor: `rgb(17, 17, 17)`, opacity: `0.7` }}
              >
                <span>
                  {item?.bank || 'OO은행'} {item?.account || '123-456-789012'}
                </span>
                <MdOutlineContentCopy color={theme.color.gray_500} />
              </button>
              {data?.is_kakao_account && item?.kakao && (
                <button
                  onClick={() => handleCopy(item?.kakao)}
                  className="px-3 w-full rounded-lg cursor-pointer flex items-center justify-between text-[12px] text-text-default bg-[#FFEB00]"
                >
                  간편송금
                  <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.75179 12.7805C2.42295 12.5582 2.12849 12.3807 1.85694 12.1733C-0.576705 10.3137 -0.591601 7.24411 1.82027 5.35586C4.17829 3.50886 8.02468 3.55469 10.3426 5.45784C12.6032 7.31286 12.5872 10.2758 10.2876 12.0908C8.85766 13.2194 7.2043 13.6078 5.40542 13.4898C5.14647 13.4726 4.8417 13.5471 4.62056 13.6823C3.9858 14.0672 3.3877 14.5141 2.76096 14.9151C2.63836 14.993 2.45274 14.9736 2.29692 14.9988C2.29233 14.8567 2.25681 14.7066 2.28889 14.5737C2.43097 13.9825 2.59253 13.3958 2.75408 12.7805H2.75179Z"
                      fill="#444444"
                    ></path>
                    <path
                      d="M21.783 6.41573C21.3155 4.81966 20.0678 3.98553 18.4362 4.25364C17.8037 4.35676 17.2102 4.69935 16.5903 4.93538C16.3119 4.39801 15.8318 4.27541 14.8018 4.54696V15.6828H17.0303V12.7301C17.2262 12.7714 17.3179 12.7932 17.4096 12.8081C19.5739 13.1644 21.3018 12.0381 21.854 9.91266C22.1577 8.74053 22.121 7.56839 21.783 6.41573ZM19.5338 9.75225C19.3161 10.8602 18.4637 11.2498 17.0337 11.0481C17.0337 9.53799 17.0303 8.05535 17.0429 6.57385C17.0441 6.47073 17.1414 6.32751 17.2354 6.27251C18.1578 5.72941 19.4089 6.1522 19.5716 7.16508C19.7057 8.00723 19.6977 8.91583 19.5338 9.75225Z"
                      fill="#444444"
                    ></path>
                    <path
                      d="M32.1275 14.8652C32.6098 14.2923 33.0464 13.7664 33.4921 13.2485C33.8232 12.8635 33.853 12.4865 33.6651 11.9939C32.8356 9.82489 32.053 7.63759 31.2544 5.45717C31.1776 5.24863 31.1157 5.03437 31.0264 4.75824C31.7917 4.55315 32.4964 4.36524 33.2572 4.16129C33.8519 6.2088 34.4293 8.19329 35.0515 10.3313C35.6691 8.18413 36.2443 6.18588 36.8355 4.13379C37.586 4.34003 38.2757 4.52908 38.9999 4.7273C38.9758 4.86594 38.9724 4.97594 38.9368 5.07333C38.0523 7.50697 37.1838 9.94634 36.2695 12.3674C35.7802 13.6621 35.0859 14.8411 34.0031 15.7543C33.6582 16.0453 33.3878 16.1232 33.0533 15.7291C32.7851 15.4129 32.446 15.1562 32.1286 14.864L32.1275 14.8652Z"
                      fill="#444444"
                    ></path>
                    <path
                      d="M29.9228 6.83129C29.8174 5.21459 28.7473 4.24755 27.1752 4.25099C26.2632 4.25328 25.3282 4.4641 24.4483 4.72763C23.5935 4.98314 23.6176 5.06564 23.967 5.91351C24.0667 6.15642 24.1721 6.39589 24.2856 6.66286C24.5067 6.5838 24.6786 6.49099 24.8596 6.46234C25.5127 6.35693 26.1704 6.18736 26.8223 6.2034C27.5934 6.22288 27.9177 6.7465 27.7779 7.65052C27.1535 7.65052 26.505 7.6024 25.8656 7.66083C24.7874 7.76051 23.8066 8.13519 23.4366 9.25805C23.1031 10.2732 23.118 11.3354 23.9212 12.1557C24.7634 13.0151 25.8301 13.0116 26.9037 12.6427C27.3265 12.4972 27.7206 12.2715 28.1297 12.0813C28.4963 13.0815 29.2984 12.4399 29.9526 12.6759C29.9526 10.6387 30.0477 8.72755 29.9228 6.83129ZM27.8639 9.51127C27.8192 9.87104 27.8822 10.4233 27.6817 10.5482C27.2234 10.8369 26.6424 10.9847 26.0936 11.0581C25.6571 11.1165 25.3638 10.7934 25.2996 10.3339C25.232 9.83896 25.5482 9.31649 26.065 9.21566C26.6321 9.10452 27.2176 9.09306 27.8444 9.03233C27.857 9.2844 27.8787 9.40013 27.8639 9.51127Z"
                      fill="#444444"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        ));

      default:
        return null;
    }
  };
  return (
    <div className="font-chosun px-8">
      {data?.account_layout === 'tab' && (
        <div>
          <div className="flex">
            {tabList?.map((item, idx) => (
              <TabItem key={idx} active={item.value === activeTab} onClick={() => setActiveTab(item.value)}>
                {item.text}
              </TabItem>
            ))}
          </div>
          {activeTab === 'groom' ? (
            <div className="flex flex-col gap-4 mt-4">{renderComponentByDesign(data?.groom_account)}</div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">{renderComponentByDesign(data?.bride_account)} </div>
          )}
          <div></div>
        </div>
      )}
      {data?.account_layout === 'align' && (
        <div className="flex flex-col gap-3">
          <CustomAccordion
            title="신랑측에게"
            contentsPadding="12px"
            contentsColor={PINK_200}
            children={<div className="flex flex-col gap-4 mt-4">{renderComponentByDesign(data?.groom_account)}</div>}
          />
          <CustomAccordion
            title="신부측에게"
            contentsPadding="12px"
            contentsColor={PINK_200}
            children={<div className="flex flex-col gap-4 mt-4">{renderComponentByDesign(data?.bride_account)} </div>}
          />
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
