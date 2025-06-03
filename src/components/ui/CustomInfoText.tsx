/** @jsxImportSource @emotion/react */

import { BsFillInfoCircleFill } from 'react-icons/bs';
import { GRAY_500 } from '@styles/colors';
import { css } from '@emotion/react';

interface CustomInfoTextProps {
  text: string;
  color?: string;
  className?: string;
}

export function CustomInfoText({ text, color = GRAY_500, className }: CustomInfoTextProps) {
  return (
    <div css={styles.wrapper} className={className}>
      <BsFillInfoCircleFill color={color} />
      <span css={styles.text(color)} className="font-suite">
        {text}
      </span>
    </div>
  );
}

const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  text: (color: string) => css`
    color: ${color};
    font-size: 13px;
  `,
};
