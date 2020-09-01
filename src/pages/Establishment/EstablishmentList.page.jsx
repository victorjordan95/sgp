import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FiTrash2, FiEdit3, FiPlus } from 'react-icons/fi';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import userContext from '../../store/UserContext';

import Breadcrumb from '../../components/Breadcrumb';
import ExcludeModal from '../../components/ExcludeModal';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import UsersTable from '../../components/UsersTable';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'estabelecimentos', name: 'Meus estabelecimentos' },
];

const fetchEstabs = async id => {
  try {
    const result = await api.get(`establishment?userId=${id}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const EstablishmentList = () => {
  const history = useHistory();
  const currentlyUser = useContext(userContext);
  const [establishments, setEstablishments] = useState();
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (currentlyUser?.user?.id) {
      fetchEstabs(currentlyUser.user.id).then(res => {
        setEstablishments(res);
        setLoading(false);
      });
    }
  }, [currentlyUser]);

  const onClose = () => {
    setShowDelete(false);
    fetchEstabs(currentlyUser.user.id).then(res => {
      setEstablishments(res);
      setLoading(false);
    });
  };

  const handleDelete = expense => {
    setSelectedDelete(expense?.id);
    setShowDelete(true);
  };

  const editEstab = estab => {
    history.push(`/estabelecimento/${estab.id}`);
  };

  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => `${row.status ? 'Ativo' : 'Desativo'}`,
    },
    {
      name: 'Cidade',
      selector: 'address_pk.city',
      sortable: true,
    },

    {
      name: 'Ações',
      button: true,
      cell: row => (
        <div className="d-flex flex-row flex-nowrap">
          <OverlayTrigger
            key={`approve-${row.id}`}
            placement="top"
            overlay={
              <Tooltip id={`approve-${row.id}`}>Editar estabelecimento</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => editEstab(row)}
            >
              <FiEdit3 size={24} />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            key={`refuse-${row.id}`}
            placement="top"
            overlay={
              <Tooltip id={`refuse-${row.id}`}>Excluir estabelecimento</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleDelete(row)}
            >
              <FiTrash2 size={24} />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const handlePageChange = e => {
    fetchEstabs(e).then(res => {
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
                      className="btn btn-primary btn-add"
                    >
                      <FiPlus size={20} className="mr-2" />
                      <span>Cadastrar</span>
                    </Link>
                  </div>
                }
              />
            </Col>
          </Row>
        </Container>
        <ExcludeModal
          show={showDelete}
          setShow={setShowDelete}
          route="establishment"
          id={selectedDelete}
          onClose={onClose}
        />
      </main>
    </div>
  );
};

export default EstablishmentList;
