import React, { useContext } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import userContext from '../../store/UserContext';

import Header from '../../components/Header';

const StyledMain = styled.main`
  display: inline-flex;
  height: 100vh;
  width: calc(100vw - 250px);
`;

function Agenda() {
  const currentlyUser = useContext(userContext);
  return (
    <div>
      <Header />
      <StyledMain>
        <Container fluid>
          <Row>
            <Col xs={12}>1 of 1</Col>
            <Col xs={12}>
              <h1>Olha a sua agenda {currentlyUser?.user?.name}</h1>
            </Col>
          </Row>
        </Container>
      </StyledMain>
    </div>
  );
}

export default Agenda;
