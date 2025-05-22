import { css, keyframes } from '@emotion/react';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type SkeletonProps = {
  type?: 'circle' | 'rect' | 'text';
  width?: string;
  height?: string;
  radius?: string;
};

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBox = styled.div<SkeletonProps>`
  background: #eee;
  background-image: linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px);
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;

  ${({ type, width, height, radius }) => css`
    width: ${width || (type === 'text' ? '100%' : '40px')};
    height: ${height || (type === 'text' ? '1em' : '40px')};

    border-radius: ${radius || (type === 'circle' ? '50%' : type === 'text' ? '4px' : '8px')};
  `}
`;

const Skeleton = (props: SkeletonProps) => {
  return <SkeletonBox {...props} />;
};

export default Skeleton;
