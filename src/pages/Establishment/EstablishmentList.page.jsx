import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import userContext from '../../store/UserContext';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import UsersTable from '../../components/UsersTable';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'estabelecimentos', name: 'Meus estabelecimentos' },
];

const columns = [
  {
    name: 'Nome',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Cidade',
    selector: 'address_pk.city',
    sortable: true,
  },
];

const fetchUsers = async id => {
  try {
    const result = await api.get(`establishment?userId=${id}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const EstablishmentList = () => {
  const currentlyUser = useContext(userContext);
  const [establishments, setEstablishments] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (currentlyUser?.user?.id) {
      fetchUsers(currentlyUser.user.id).then(res => {
        setEstablishments(res);
        setLoading(false);
      });
    }
  }, [currentlyUser]);

  const handlePageChange = e => {
    fetchUsers(e).then(res => {
      setEstablishments(res);
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
              <PageTitle headerTitle="Meus estabelecimentos" />
            </Col>
            <Col xs={12}>
              <UsersTable
                data={establishments}
                columns={columns}
                handlePageChange={handlePageChange}
                subHeader
                subHeaderComponent={
                  <div className="d-flex flex-row justify-content-end w-100">
                    <Link
                      to="/cadastro-estabelecimento"
                      className="btn btn-primary"
                    >
                      <FiPlus size={20} className="mr-2" />
                      Cadastrar
                    </Link>
                  </div>
                }
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default EstablishmentList;
