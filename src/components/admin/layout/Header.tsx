'use client';

import React from 'react';
import styled from '@emotion/styled';

const HeaderComp = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 130px;
  width: calc(100vw - 130px);
  z-index: 5;
  background-color: #ffffff;
  padding: 24px;
  box-sizing: border-box;
`;

const Header = () => {
  return (
    <>
      <HeaderComp>Header</HeaderComp>
    </>
  );
};

export default Header;
