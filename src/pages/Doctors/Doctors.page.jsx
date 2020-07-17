import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import UsersTable from '../../components/UsersTable';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'medicos', name: 'Médicos' },
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

const fetchUsers = async (page = 1) => {
  try {
    const result = await api.get(`/doctors?page=${page}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Doctors = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers().then(res => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  const handlePageChange = e => {
    fetchUsers(e).then(res => {
      setUsers(res);
      setLoading(false);
    });
  };

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
              <PageTitle headerTitle="Médicos" />
            </Col>
            <Col xs={12}>
              <UsersTable
                data={users}
                columns={columns}
                handlePageChange={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Doctors;
