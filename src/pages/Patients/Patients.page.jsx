import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import UsersTable from '../../components/UsersTable';

import userContext from '../../store/UserContext';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'pacientes', name: 'Pacientes' },
];

const data = [
  {
    id: 19,
    name: 'Lo Ruanda',
    email: 'paciente@gmail.com',
    cpf: '123',
    rg: '123',
    status: true,
    Role: {
      role: 'PACIENTE',
    },
    address_pk: {
      city: 'São José dos Campos',
    },
  },
  {
    id: 21,
    name: 'Paciente 2',
    email: 'paciente2@gmail.com',
    cpf: '1',
    rg: '2',
    status: true,
    Role: {
      role: 'PACIENTE',
    },
    address_pk: {
      city: 'São José dos Campos',
    },
  },
];
const columns = [
  {
    name: 'Nome',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'E-mail',
    selector: 'email',
    sortable: true,
    right: true,
  },
  {
    name: 'CPF',
    selector: 'cpf',
    sortable: true,
    right: true,
  },
  {
    name: 'RG',
    selector: 'rg',
    sortable: true,
    right: true,
  },
  {
    name: 'Cidade',
    selector: 'address_pk.city',
    sortable: true,
    right: true,
  },
];

const fetchUsers = async () => {
  try {
    const result = await api.get('/patients', authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Patients = () => {
  const currentlyUser = useContext(userContext);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers().then(res => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Header />
      <main>
        <Container fluid>
          <Row>
            <Breadcrumb siteMap={siteMap} />
            <Col xs={12}>
              <PageTitle headerTitle="Pacientes" />
            </Col>
            <Col xs={12}>
              <UsersTable data={users} columns={columns} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Patients;
