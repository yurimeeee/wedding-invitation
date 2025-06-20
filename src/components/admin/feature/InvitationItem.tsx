'use client';

import { Button } from '@components/ui/button';
import Image from 'next/image';
import React from 'react';
import Skeleton from '../layout/Skeleton';
import { TemplatesData } from '@type/templates';
import { formatUnixTimestamp } from '@utils/func';
import theme from '@styles/theme';
import { useRouter } from 'next/navigation';
type InvitationItemProps = {
  data: any;
  onClick: () => void;
};

const InvitationItem = ({ data, onClick }: InvitationItemProps) => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-3 rounded border border-solid border-pink-300 p-3">
      {!data ? (
        <Skeleton width={'100%'} height={'100%'} />
      ) : (
        <div
          style={{ position: 'relative', width: '100%', height: '200px' }}
          onClick={() => {
            router.push(`/admin/templates/${data?.id}`);
          }}
        >
          <Image src={data?.main?.main_img} alt="thumbnail" fill style={{ objectFit: 'cover', border: `1px solid ${theme.color.gray_300}` }} sizes="100%" />
        </div>
      )}
      <div>
        <p className="text-[14px] font-suite-medium text-text-default">
          {data?.groom_first_name + data?.groom_last_name}님, {data?.bride_first_name + data?.bride_last_name}님 주문 건
        </p>
        <p className="text-[13px] font-suite-medium text-gray-700 mb-2">{formatUnixTimestamp(data?.uploadedAt?.seconds, data?.uploadedAt?.nanoseconds)}</p>
      </div>
      <div className="flex gap-2">
        <Button
          text={'보기'}
          variant="default"
          onClick={() => {
            router.push(`/admin/invitaions/${data?.id}`);
          }}
          className="w-full"
        />
        <Button
          text={'수정'}
          variant="default"
          onClick={() => {
            router.push(`/admin/templates/create/${data?.id}`);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

InvitationItem.propTypes = {};

export default InvitationItem;
