import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import api from '../../services/api';
import authToken from '../../utils/authToken';

import AvatarPicture from '../../components/AvatarPicture';
import AvailableAgenda from './DoctorProfileTabs/AvailableAgenda.tab';
import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

const StyledTabs = styled(Tabs)`
  width: 100vw;
  justify-content: center;
  margin: 24px 0;
`;

const StyledRow = styled(Row)`
  .tab-content {
    width: 100%;
  }
`;

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: '/medicos', name: 'Médicos' },
  { path: '', name: 'Médico' },
];

const fetchUser = async id => {
  try {
    const result = await api.get(`/users/${id}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return {};
};

function EmployeeProfile(props) {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  function fetchData() {
    setLoading(false);
    const { id } = props.match.params;
    fetchUser(id).then(res => {
      setFormValues(res);
    });
  }

  useEffect(fetchData, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <main>
        <Container>
          <Row>
            <Breadcrumb siteMap={siteMap} />
            <Col xs={12}>
              <h2>{formValues.name}</h2>
            </Col>
            <AvatarPicture
              path={formValues?.avatar?.url}
              size="medium"
              description={`Foto de perfil de ${formValues?.name}`}
            />
          </Row>
          <StyledRow>
            <StyledTabs defaultActiveKey="profile">
              <Tab eventKey="agenda" title="Agenda disponível">
                <AvailableAgenda
                  doctorId={props.match.params.id}
                  doctorInfo={formValues}
                />
              </Tab>
              <Tab eventKey="profile" title="Perfil">
                <p>1</p>
              </Tab>
              <Tab eventKey="contact" title="Contato" disabled>
                <p>1</p>
              </Tab>
            </StyledTabs>
          </StyledRow>
        </Container>
      </main>
    </>
  );
}

export default EmployeeProfile;
