import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Tooltip, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import moment from 'moment';
import DatePicker from 'react-date-picker';

import { FiSearch } from 'react-icons/fi';

import { FiDownload, FiPlus } from 'react-icons/fi';
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



const fetchUsers = async (page = 1) => {
  // try {
  //   const result = await api.get(`/employees?page=${page}`, authToken());
  //   return result.data;
  // } catch (err) {
  //   toast.error(err?.response?.data?.error);
  // }
  return false;
};


const Reports = () => {
  const history = useHistory();
  const [search, setSearch] = useState({ option: 'name' });
  const [searchDate, setSearchDate] = useState({
    start: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().endOf('month').format('YYYY-MM-DD')
  })

  const [loading, setLoading] = useState(true);

  const reports = {
    "rows": [
      { name: 'Despesas', description: 'Relatório de despesas do período selecionado' },
      { name: 'Consultas', description: 'Relatório de consultas do período selecionado' },
    ]
  }

  const handleRequest = report => {
    console.log(report);
  };

  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: 'description',
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
              <Tooltip id={`approve-${row.id}`}>Download relatório</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleRequest(row)}
            >
              <FiDownload size={24} />
            </button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePageChange = e => {
  };

  const searchEmployees = () => {
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
                <PageTitle headerTitle="Relatórios" />
              </Col>
              <Col xs={12}>
                <UsersTable
                  data={reports}
                  columns={columns}
                  handlePageChange={handlePageChange}
                  subHeader
                  amountPerPage={50}
                  subHeaderComponent={
                    <div className="d-flex flex-row justify-content-start w-100">
                      <span className="form-group mr-4">
                        De
                        <input
                          type="date"
                          onChange={(e) => setSearchDate({ ...searchDate, start: e.target.value })}
                          value={searchDate.start}
                          className="form-control"
                        />
                      </span>
                      <span className="form-group ">
                        Até
                        <input
                          type="date"
                          onChange={(e) => setSearchDate({ ...searchDate, end: e.target.value })}
                          value={searchDate.end}
                          className="form-control"
                        />
                      </span>
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

export default Reports;
