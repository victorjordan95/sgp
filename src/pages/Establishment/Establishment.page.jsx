import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import userContext from '../../store/UserContext';
import { formatPhone, formatCellphone } from '../../utils/phoneFormater';
import medicineCategoriesValues from '../../utils/medicineCategoriesValues';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import SearchHeaderTable from '../../components/SearchHeaderTable';

import 'leaflet/dist/leaflet.css';

const iconPerson = new L.Icon({
  iconUrl: require('../../assets/img/marker-icon.svg'),
  iconSize: new L.Point(35, 45),
});

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: '/mapa', name: 'Mapa de clínicas' },
];

export const MapStyled = styled(Map)``;

const fetchEstablishments = async (lat, lng, name = '') => {
  try {
    const result = await api.get(
      `/establishment?lat=${lat}&lng=${lng}&name=${name}`,
      authToken()
    );
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

const fetchLatLng = async (cityName, stateName) => {
  try {
    const result = await api.get(
      `/city?cityName=${cityName}&stateName=${stateName}`,
      authToken()
    );
    return result.data;
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
  return false;
};

function Establishment() {
  const currentlyUser = useContext(userContext);

  const [userLocale, setUserLocale] = useState();
  const [establishments, setEstablishments] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ option: 'Acupuntura' });

  useEffect(() => {
    setLoading(true);
    fetchLatLng(
      currentlyUser?.user?.address_pk?.city,
      currentlyUser?.user?.address_pk?.state
    ).then(res => {
      setUserLocale({
        lat: res[0]?.location?.coordinates[0],
        lng: res[0]?.location?.coordinates[1],
      });
      fetchEstablishments(
        res[0]?.location?.coordinates[0],
        res[0]?.location?.coordinates[1]
      ).then(data => {
        setEstablishments(data);
        setLoading(false);
      });
    });
  }, [currentlyUser]);

  const searchEstab = () => {
    setLoading(true);
    fetchEstablishments(userLocale.lat, userLocale.lng, search.option).then(
      res => {
        setEstablishments(res);
        setLoading(false);
      }
    );
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
              <SearchHeaderTable
                search={search}
                setSearch={setSearch}
                selectOptions={medicineCategoriesValues}
                searchFunc={searchEstab}
                placeholder="Procure por uma especialidade"
                hideInput
                style={{ left: 0 }}
              />
            </Col>
            <Col xs={12}>
              <Map
                center={[userLocale?.lat || 45.4, userLocale?.lng || -75.7]}
                zoom={12}
                className="mt-4"
                style={{ width: '100%', height: '65vh' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {establishments?.map(establishment => (
                  <Marker
                    key={establishment.id}
                    icon={iconPerson}
                    position={[
                      establishment?.location?.coordinates[0] || 45.4,
                      establishment?.location?.coordinates[1] || -75.7,
                    ]}
                  >
                    <Popup>
                      <span>
                        <strong>Endereço</strong>:{' '}
                        {establishment?.address_pk?.full_address}
                      </span>
                      <br />
                      <span>
                        <strong>Telefone</strong>:{' '}
                        {formatPhone(establishment?.Contact?.phone)}
                      </span>
                      <br />
                      <span>
                        <strong>Celular</strong>:{' '}
                        {formatCellphone(establishment?.Contact?.phone)}
                      </span>
                      <Link
                        to={`/clinica/${establishment.id}`}
                        className="d-block text-right mt-3"
                      >
                        Visualizar clínica
                      </Link>
                    </Popup>
                  </Marker>
                ))}
              </Map>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Establishment;
