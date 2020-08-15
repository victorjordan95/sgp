import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import userContext from '../../store/UserContext';

import Header from '../../components/Header';

function Dashboard() {
  const currentlyUser = useContext(userContext);
  return (
    <div>
      <Header />
      <main>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <h1>Bem-vindo {currentlyUser?.user?.name}</h1>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
