import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
  FiMapPin,
  FiPhone
} from 'react-icons/fi';

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
    const result = await api.get(`/doctors/${id}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return {};
};

function EmployeeProfile(props) {
  const [doctorValues, setDoctorValues] = useState({});
  const [loading, setLoading] = useState(false);

  function fetchData() {
    setLoading(false);
    const { id } = props.match.params;
    fetchUser(id).then(res => {
      setDoctorValues(res);
      console.log(res);
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
                <h2>{doctorValues.name}</h2>
                <h6>
                  {doctorValues?.doctor_info?.ProfessionalCoucil?.name} -{' '}
                  {doctorValues?.doctor_info?.ProfessionalCoucil?.value}
                </h6>
              </Col>
              <AvatarPicture
                path={doctorValues?.avatar?.url}
                size="medium"
                description={`Foto de perfil de ${doctorValues?.name}`}
              />
            </Row>
            <StyledRow>
              <StyledTabs defaultActiveKey="profile">
                <Tab eventKey="profile" title="Perfil">
                  <section>
                    <div className="d-block mb-3">
                      <span className="mr-3">Especialidade: </span>
                      {doctorValues?.doctor_info?.categories.map(category => (
                        <span
                          className="badge badge-info ml-2 mr-2"
                          key={category?.id}
                        >
                          {category?.name}
                        </span>
                      ))}
                    </div>

                    <div className="d-block mb-3">
                      <span className="mr-3">Horário atendimento: </span>
                      <span className="font-weight-bold">
                        {doctorValues?.doctor_info?.start_hour}
                      </span>{' '}
                    -{' '}
                      <span className="font-weight-bold">
                        {doctorValues?.doctor_info?.end_hour}
                      </span>
                    </div>

                    <div className="d-block mb-3">
                      <span className="mr-3">Tempo consulta: </span>
                      <span className="font-weight-bold">
                        {doctorValues?.doctor_info?.time_appointment}
                      </span>
                    </div>
                  </section>
                </Tab>
                <Tab eventKey="local" title="Local de atendimento">
                  {doctorValues?.establishments?.map(estab => (
                    <section className="doctor-clinic mb-4">
                      <h4>{estab?.name}</h4>
                      <p className="d-flex align-items-center">
                        <FiMapPin size={18} className="mr-2" />
                        <span>{estab?.address_pk?.full_address}</span>
                      </p>

                      <p className="d-flex align-items-center mb-0">
                        <FiPhone size={18} className="mr-2" />
                        <span>{estab?.Contact?.phone}</span>
                      </p>

                      <p className="d-flex align-items-center">
                        <FiPhone size={18} className="mr-2" />
                        <span>{estab?.Contact?.cellphone}</span>
                      </p>
                      <hr />
                    </section>
                  ))}
                </Tab>
                <Tab eventKey="agenda" title="Agenda disponível">
                  <AvailableAgenda
                    doctorId={props?.match?.params?.id}
                    doctorInfo={doctorValues}
                  />
                </Tab>
              </StyledTabs>
            </StyledRow>
          </Container>
        </main>
      </>
    );
}

export default EmployeeProfile;
