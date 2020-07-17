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
  {
    path: 'cid',
    name: 'Classificação Internacional de Doenças',
  },
];

const columns = [
  {
    name: 'Código',
    selector: 'code',
    sortable: true,
  },
  {
    name: 'Descrição',
    selector: 'name',
    sortable: true,
    left: true,
  },
];

const fetchCids = async (page = 1) => {
  try {
    const result = await api.get(`/cid?page=${page}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Doctors = () => {
  const [cid, setCids] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCids().then(res => {
      setCids(res);
      setLoading(false);
    });
  }, []);

  const handlePageChange = e => {
    fetchCids(e).then(res => {
      setCids(res);
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
              <PageTitle headerTitle="Classificação Internacional de Doenças" />
            </Col>
            <Col xs={12}>
              <UsersTable
                data={cid}
                columns={columns}
                handlePageChange={handlePageChange}
                amountPerPage={50}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Doctors;
