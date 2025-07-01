'use client';

import React, { useState } from 'react';

import { Button } from '@components/ui/button';
import Image from 'next/image';
import { Input } from '@components/ui/input';
import QRcodeModal from './templates/custom/modal/QRcodeModal';
import Skeleton from '../layout/Skeleton';
import { formatUnixTimestamp } from '@utils/func';
import theme from '@styles/theme';
import { useRouter } from 'next/navigation';

type InvitationItemProps = {
  data: any;
  onClick: () => void;
};

const InvitationItem = ({ data, onClick }: InvitationItemProps) => {
  const router = useRouter();
  const [qrCodeModal, setQrCodeModal] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-3 rounded border border-solid border-pink-300 p-3">
      {!data ? (
        <Skeleton width={'100%'} height={'100%'} />
      ) : (
        <div
          style={{ position: 'relative', width: '100%', height: '200px' }}
          onClick={() => {
            router.push(`/editor/templates/${data?.id}`);
          }}
        >
          {data?.main?.main_img ? (
            <Image src={data?.main?.main_img} alt="thumbnail" fill style={{ objectFit: 'cover', border: `1px solid ${theme.color.gray_300}` }} sizes="100%" />
          ) : (
            <div className="border border-solid border-pink-300 h-full flex items-center justify-center">
              <p className="text-[13px] font-suite-medium text-gray-500 m-auto">메인 커버 이미지</p>
            </div>
          )}
        </div>
      )}
      <div>
        <p className="text-[13px] font-suite-medium text-gray-700 mb-2">
          {formatUnixTimestamp(data?.uploadedAt?.seconds, data?.uploadedAt?.nanoseconds)} {data?.isDraft ? '임시저장' : '저장'}
        </p>
        <Input value={data?.id} readOnly className="mt-4" />
      </div>

      <div className="flex gap-2">
        <Button text={'QR코드'} variant="pink" onClick={() => setQrCodeModal(true)} className="w-full" />
      </div>
      <div className="flex gap-2">
        <Button
          text={'바로가기'}
          variant="pink"
          onClick={() => {
            router.push(`/invitaions/${data?.id}`);
          }}
          className="w-full"
        />
        <Button
          text={'수정'}
          variant="pink"
          onClick={() => {
            router.push(`/editor/create/${data?.id}/?edit=true`);
          }}
          className="w-full"
        />
      </div>
      {qrCodeModal && <QRcodeModal open={qrCodeModal} onOpenChange={() => setQrCodeModal(false)} url={`/invitaions/${data?.id}`} />}
    </div>
  );
};

InvitationItem.propTypes = {};

export default InvitationItem;
