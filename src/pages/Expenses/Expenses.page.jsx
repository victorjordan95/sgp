import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Tooltip,
  Modal,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import CurrencyInput from 'react-currency-masked-input';
import Select from 'react-select';
import styled from 'styled-components';
import moment from 'moment';

import { FiTrash2, FiEdit3, FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import authToken from '../../utils/authToken';
import userContext from '../../store/UserContext';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import SearchHeaderTable from '../../components/SearchHeaderTable';
import UsersTable from '../../components/UsersTable';

import LabelStyled from '../../styles/LabelForm';

export const SelectSyled = styled(Select)`
  bottom: 24px;
  width: 350px;
  @media screen and (min-width: 1024px) {
    bottom: 0;
    right: 15px;
  }
`;

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'despesas', name: 'Despesas' },
];

const selectOptions = [{ value: 'name', label: 'Nome' }];

const fetchExpenses = async (page = 1, estab, type = '', name = '') => {
  let findUrl = '';
  if (name) {
    findUrl = `?page=${page}&estab=${estab}&type=${type}&name=${name}`;
  } else {
    findUrl = `?page=${page}&estab=${estab}`;
  }

  try {
    const result = await api.get(`/expense${findUrl}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Expenses = () => {
  const [search, setSearch] = useState({ option: 'name' });
  const currentlyUser = useContext(userContext);

  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [establishments, setEstablishments] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState([]);

  const handleExpense = expense => {
    setFormValues(expense);
    setShow(true);
  };

  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Valor',
      selector: 'value',
      cell: row => <span>R$ {row.value}</span>,
      sortable: true,
    },
    {
      name: 'Data',
      selector: 'createdAt',
      cell: row => (
        <span>{moment(new Date(row.createdAt)).format('DD/MM/YYYY')}</span>
      ),
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
            overlay={<Tooltip id={`approve-${row.id}`}>Editar despesa</Tooltip>}
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleExpense(row)}
            >
              <FiEdit3 size={24} />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            key={`refuse-${row.id}`}
            placement="top"
            overlay={<Tooltip id={`refuse-${row.id}`}>Excluir despesa</Tooltip>}
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleExpense(row)}
            >
              <FiTrash2 size={24} />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (currentlyUser?.user?.establishments?.[0]) {
      setLoading(true);
      setEstablishments(currentlyUser?.user?.establishments);
      setSelectedEstablishment(currentlyUser?.user?.establishments[0]);
      fetchExpenses(1, currentlyUser.user.establishments[0].id).then(res => {
        setExpenses(res);
        setLoading(false);
      });
    }
  }, [currentlyUser]);

  const handlePageChange = e => {
    fetchExpenses(e).then(res => {
      setExpenses(res);
      setLoading(false);
    });
  };

  const searchEmployees = () => {
    setLoading(true);
    fetchExpenses(
      1,
      selectedEstablishment?.id,
      search?.option,
      search?.searchValue
    ).then(res => {
      setExpenses(res);
      setLoading(false);
    });
  };

  const handleChangeEstab = e => {
    setSelectedEstablishment(e);
    fetchExpenses(1, e.id, search?.option, search?.searchValue).then(res => {
      setExpenses(res);
      setLoading(false);
    });
  };

  const handleSubmit = async () => {
    if (formValues?.id) {
      try {
        await api.put(`/expense`, formValues, authToken());
        setLoading(true);
        fetchExpenses(1, selectedEstablishment.id).then(res => {
          setExpenses(res);
          setLoading(false);
        });
        toast.success('Despesa atualizada!');
        setShow(false);
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    } else {
      try {
        await api.post(`/expense`, formValues, authToken());
        setLoading(true);
        fetchExpenses(1, selectedEstablishment.id).then(res => {
          setExpenses(res);
          setLoading(false);
        });
        toast.success('Despesa cadastrada!');
        setShow(false);
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    }
    setFormValues({});
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
              <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                <PageTitle headerTitle="Despesas" />
                <SelectSyled
                  options={establishments}
                  value={selectedEstablishment}
                  onChange={e => handleChangeEstab(e)}
                  placeholder="Selecione o estabelecimento"
                />
              </div>
            </Col>
            <Col xs={12}>
              <UsersTable
                data={expenses}
                columns={columns}
                handlePageChange={handlePageChange}
                subHeader
                subHeaderComponent={
                  <div className="d-flex flex-row justify-content-between w-100">
                    <SearchHeaderTable
                      search={search}
                      setSearch={setSearch}
                      selectOptions={selectOptions}
                      searchFunc={searchEmployees}
                    />
                    <Button
                      onClick={() => setShow(true)}
                      className="btn btn-primary btn-add"
                    >
                      <FiPlus size={20} className="mr-2" />
                      <span>Cadastrar</span>
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Container>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de despesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} xs={12}>
                <LabelStyled>Nome</LabelStyled>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome"
                  name="name"
                  value={formValues?.name || ''}
                  onChange={e =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} xs={12}>
                <LabelStyled>Valor da consulta</LabelStyled>
                <CurrencyInput
                  className="form-control"
                  placeholder="Digite o valor da despesa"
                  name="value"
                  value={formValues?.value || ''}
                  onChange={e =>
                    setFormValues({
                      ...formValues,
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} xs={12}>
                <LabelStyled>Estabelecimento</LabelStyled>
                <Select
                  options={establishments}
                  value={formValues?.establishment || formValues?.Establishment}
                  onChange={e =>
                    setFormValues({ ...formValues, establishment_id: e.value })
                  }
                  placeholder="Selecione o estabelecimento"
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Cadastrar
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default Expenses;
