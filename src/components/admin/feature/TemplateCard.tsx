import { Button } from '@components/ui/button';
import Image from 'next/image';
import React from 'react';
import Skeleton from '../layout/Skeleton';
type TemplateCardProps = {
  data: any;
  onClick: () => void;
};

const TemplateCard = ({ data, onClick }: TemplateCardProps) => {
  return (
    <div className="w-full flex flex-col gap-5">
      {!data ? (
        <Skeleton width={'100%'} height={'100%'} />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image src={data?.thumbnail} alt="thumbnail" fill style={{ objectFit: 'contain' }} />
        </div>
      )}

      <Button text={'select'} variant="default" onClick={onClick} />
    </div>
  );
};

TemplateCard.propTypes = {};

export default TemplateCard;
