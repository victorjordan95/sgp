import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 20px;
`;

export default ({ data }) => {
  return (
    <Paragraph>
      <b>Descrição completa</b>: {data.name}
    </Paragraph>
  );
};
