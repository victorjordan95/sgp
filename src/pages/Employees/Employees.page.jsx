import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import UsersTable from '../../components/UsersTable';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'funcionarios', name: 'Funcionários' },
];

const fetchUsers = async (page = 1) => {
  try {
    const result = await api.get(`/employees?page=${page}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Employees = props => {
  const history = useHistory();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const handleRequest = user => {
    history.push(`/funcionario/${user.id}`);
  };

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
    },
    {
      name: 'Tipo Funcionário',
      selector: 'Role.role',
      sortable: true,
    },
    {
      name: 'CPF',
      selector: 'cpf',
      sortable: true,
    },
    {
      name: 'RG',
      selector: 'rg',
      sortable: true,
    },
    {
      name: 'Cidade',
      selector: 'address_pk.city',
      sortable: true,
      right: true,
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
              <Tooltip id={`approve-${row.id}`}>Editar funcionário</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleRequest(row)}
            >
              <FiEdit3 size={24} />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            key={`refuse-${row.id}`}
            placement="top"
            overlay={
              <Tooltip id={`refuse-${row.id}`}>Excluir funcionário</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleRequest(row)}
            >
              <FiTrash2 size={24} />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

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
              <PageTitle headerTitle="Funcionários" />
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

export default Employees;
