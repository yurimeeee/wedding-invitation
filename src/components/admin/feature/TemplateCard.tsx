'use';

import { Button } from '@components/ui/button';
import Image from 'next/image';
import React from 'react';
import Skeleton from '../layout/Skeleton';
import { TemplatesData } from '@type/templates';
import theme from '@styles/theme';
import { useRouter } from 'next/navigation';
type TemplateCardProps = {
  data: TemplatesData;
  onClick: () => void;
};

const TemplateCard = ({ data, onClick }: TemplateCardProps) => {
  const router = useRouter();
  console.log('data', data);
  return (
    <div className="w-full flex flex-col gap-3">
      {!data ? (
        <Skeleton width={'100%'} height={'100%'} />
      ) : (
        <div
          style={{ position: 'relative', width: '100%', height: '200px' }}
          onClick={() => {
            router.push(`/admin/templates/${data?.id}`);
          }}
        >
          <Image src={data?.thumbnail} alt="thumbnail" fill style={{ objectFit: 'contain', border: `1px solid ${theme.color.gray_300}` }} sizes="100%" />
        </div>
      )}

      <Button
        text={'선택'}
        variant="default"
        onClick={() => {
          router.push(`/admin/templates/create/${data?.id}`);
        }}
      />
    </div>
  );
};

TemplateCard.propTypes = {};

export default TemplateCard;
