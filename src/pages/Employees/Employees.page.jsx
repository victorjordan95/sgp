import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { FiTrash2, FiEdit3, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import SearchHeaderTable from '../../components/SearchHeaderTable';
import UsersTable from '../../components/UsersTable';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'funcionarios', name: 'Funcionários' },
];

const selectOptions = [
  { value: 'name', label: 'Nome' },
  { value: 'email', label: 'E-mail' },
  { value: 'cpf', label: 'CPF' },
  { value: 'rg', label: 'RG' },
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

const fetchCids = async (page = 1, type = '', name = '') => {
  let findUrl = '';
  if (name) {
    findUrl = `?page=${page}&type=${type}&name=${name}`;
  } else {
    findUrl = `?page=${page}`;
  }

  try {
    const result = await api.get(`/users${findUrl}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Employees = () => {
  const history = useHistory();
  const [search, setSearch] = useState({ option: 'name' });

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

  const searchCid = () => {
    setLoading(true);
    fetchCids(1, search?.option, search?.searchValue).then(res => {
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
                subHeader
                subHeaderComponent={
                  <div className="d-flex flex-row justify-content-between w-100">
                    <SearchHeaderTable
                      search={search}
                      setSearch={setSearch}
                      selectOptions={selectOptions}
                      searchFunc={searchCid}
                    />
                    <Link
                      to="/cadastro-funcionario"
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
      </main>
    </div>
  );
};

export default Employees;
