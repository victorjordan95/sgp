import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { toast } from 'react-toastify';
import moment from 'moment';

import { FiCheck, FiSlash } from 'react-icons/fi';
import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import ExpandedComponent from '../../components/ExpandedComponent';
import SearchHeaderTable from '../../components/SearchHeaderTable';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import UsersTable from '../../components/UsersTable';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  {
    path: 'requisicoes-consultas',
    name: 'Requisições de Consultas',
  },
];

const selectOptions = [{ value: 'title', label: 'Nome' }];

const fetchSchedules = async (page = 1, name = '') => {
  const findUrl = name ? `?page=${page}&name=${name}` : `?page=${page}`;

  try {
    const result = await api.get(`/schedule-requests${findUrl}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const RequestSchedule = () => {
  const [requests, setRequests] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ option: 'name' });

  const handleRequest = async status => {
    setLoading(true);
    try {
      await api.put(`/schedule-requests`, status, authToken());
      toast.success('Agendamento aprovado!');
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
    setLoading(false);
  };

  const columns = [
    {
      name: 'Nome',
      selector: 'patient.name',
      cell: row => <div>{row.patient.name}</div>,
      sortable: true,
    },
    {
      name: 'Data consulta',
      cell: row => `${moment(new Date(row.start)).format('DD/MM/YYYY')}`,
      selector: 'row.start',
    },
    {
      name: 'Horário início',
      cell: row => `${moment(new Date(row.start)).format('HH:mm')}`,
      selector: 'row.start',
    },
    {
      name: 'Horário término',
      cell: row => `${moment(new Date(row.end)).format('HH:mm')}`,
      selector: 'row.start',
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
              <Tooltip id={`approve-${row.id}`}>Aprovar agendamento</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleRequest({ id: row.id, status: 'AGENDADO' })}
            >
              <FiCheck size={24} />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            key={`refuse-${row.id}`}
            placement="top"
            overlay={
              <Tooltip id={`refuse-${row.id}`}>Recusar agendamento</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleRequest({ id: row.id, status: 'RECUSADO' })}
            >
              <FiSlash size={24} />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchSchedules().then(res => {
      setRequests(res);
      setLoading(false);
    });
  }, []);

  const handlePageChange = e => {
    setLoading(true);
    fetchSchedules(e).then(res => {
      setRequests(res, search?.searchValue);
      setLoading(false);
    });
  };

  const searchRequests = () => {
    setLoading(true);
    fetchSchedules(1, search?.searchValue).then(res => {
      setRequests(res);
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
              <PageTitle headerTitle="Requisições de consultas" />
            </Col>
            <Col xs={12}>
              <UsersTable
                data={requests}
                columns={columns}
                handlePageChange={handlePageChange}
                amountPerPage={50}
                expandableRows
                subHeader
                subHeaderComponent={
                  <SearchHeaderTable
                    search={search}
                    setSearch={setSearch}
                    selectOptions={selectOptions}
                    searchFunc={searchRequests}
                  />
                }
                highlightOnHover
                expandableRowsComponent={<ExpandedComponent />}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default RequestSchedule;
