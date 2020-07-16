import React from 'react';
import styled from 'styled-components';

const HeaderTitleStyle = styled.h1`
  margin-bottom: 48px;
`;

function PageTitle({ headerTitle }) {
  return <HeaderTitleStyle>{headerTitle}</HeaderTitleStyle>;
}

export default PageTitle;
