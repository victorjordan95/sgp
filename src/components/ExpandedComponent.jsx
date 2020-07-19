import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 20px;
`;

const ContactParagraph = styled.div`
  margin: 20px;
  p {
    margin: 8px 0;
  }
`;

export default ({ data }) => {
  if (data.patient) {
    return (
      <ContactParagraph>
        <p>
          <b>Telefone:</b>
          {data.patient.Contact.phone}
        </p>
        <p>
          <b>Celular:</b>
          {data.patient.Contact.cellphone}
        </p>
      </ContactParagraph>
    );
  }
  return <Paragraph>{data.name}</Paragraph>;
};
