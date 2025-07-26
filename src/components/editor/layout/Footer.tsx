'use client';

import React from 'react';
import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isInvitationPage = pathname.includes('/invitaions/');

  return isInvitationPage ? null : (
    <Wrap>
      <CopyWrite>© 2025 Kim Yurim All rights reserved</CopyWrite>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 0;
  background-color: #ede2e2;
`;
const CopyWrite = styled.div`
  font-family: 'Chosunilbo_myungjo';
  font-weight: 900;
  color: #666666;
  font-size: 13px;
`;
