import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import ExpandedComponent from '../../components/ExpandedComponent';
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
    name: 'Descrição',
    selector: 'name',
    cell: row => <div>{row.name}</div>,
    sortable: true,
  },
  {
    name: 'Código',
    selector: 'code',
    sortable: true,
  },
];

const SearchHeader = styled.div`
  align-items: center;
  display: flex;
  left: -16px;
  position: relative;
  select {
    border-radius: 4px 0 0 4px;
  }
  input {
    border-radius: 0;
    margin: 0;
    min-width: 400px;
  }
  .btn {
    border-radius: 0 4px 4px 0;
  }
`;

const fetchCids = async (page = 1, type = '', name = '') => {
  let findUrl = '';
  if (name) {
    findUrl = `?page=${page}&type=${type}&name=${name}`;
  } else {
    findUrl = `?page=${page}`;
  }

  try {
    const result = await api.get(`/cid${findUrl}`, authToken());
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const Doctors = () => {
  const [cid, setCids] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ option: 'name' });

  useEffect(() => {
    setLoading(true);
    fetchCids().then(res => {
      setCids(res);
      setLoading(false);
    });
  }, []);

  const handlePageChange = e => {
    setLoading(true);
    fetchCids(e).then(res => {
      setCids(res, search?.option, search?.searchValue);
      setLoading(false);
    });
  };

  const searchCid = () => {
    setLoading(true);
    fetchCids(1, search?.option, search?.searchValue).then(res => {
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
                expandableRows
                subHeader
                subHeaderComponent={
                  <SearchHeader>
                    <select
                      className="form-control"
                      value={search?.option}
                      onChange={e =>
                        setSearch({ ...search, option: e.target.value })
                      }
                    >
                      <option value="name">Descrição</option>
                      <option value="code">Código</option>
                    </select>
                    <input
                      placeholder="Selecione por qual coluna deseja filtrar"
                      className="form-control"
                      value={search?.value}
                      onChange={e =>
                        setSearch({
                          ...search,
                          searchValue: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={searchCid}
                    >
                      <FiSearch size={24} />
                    </button>
                  </SearchHeader>
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

export default Doctors;
