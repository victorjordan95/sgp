import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Select from 'react-select';

import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../../services/api';
import authToken from '../../utils/authToken';

import userContext from '../../store/UserContext';

import Header from '../../components/Header';

export const SelectSyled = styled(Select)`
  position: relative;
  box-sizing: border-box;
  right: 0;
  left: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  width: 100%;
  @media screen and (min-width: 1024px) {
    bottom: 0;
    right: 15px;
  }

  > div {
    width: 350px;
  }
`;

export const ChartCard = styled.div`
  align-items: flex-start;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 0px 3px 0px rgb(66 66 66 / 0.3);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  height: 380px;
  margin: 24px 0 0;
  h3 {
    padding: 16px 16px 0;
    width: 100%;
  }
`;

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize="12"
      >
        {`${payload.value} consulta(s)`}
      </text>
    </g>
  );
};

function Dashboard() {
  const currentlyUser = useContext(userContext);
  const [index, setIndex] = useState(0);
  const [indexDay, setIndexDay] = useState(0);
  const [lineChart, setLineChart] = useState([]);
  const [apDays, setApDays] = useState([]);
  const [apsMonth, setApMonth] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState([]);
  const [establishments, setEstablishments] = useState([]);

  const fetchData = async estab => {
    try {
      const result = await api.get(
        `/dashboard-year?estab=${estab}`,
        authToken()
      );
      const apDay = await api.get(
        `/dashboard-appointments-day?estab=${estab}`,
        authToken()
      );
      const apMonth = await api.get(
        `/dashboard-appointments-month?estab=${estab}`,
        authToken()
      );
      setApDays(apDay.data);
      setLineChart(result.data);
      setApMonth(apMonth.data);
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  const handleChangeEstab = e => {
    setSelectedEstablishment(e);
    fetchData(e.id);
  };

  useEffect(() => {
    if (currentlyUser?.user?.establishments?.[0]) {
      setEstablishments(currentlyUser?.user?.establishments);
      setSelectedEstablishment(currentlyUser?.user?.establishments[0]);
      fetchData(currentlyUser.user.establishments[0].id);
    }
  }, [currentlyUser]);

  const onPieEnterMonth = (data, index) => {
    setIndex(index);
  };

  const onPieEnterDay = (data, index) => {
    setIndexDay(index);
  };

  return (
    <div>
      <Header />
      <main>
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <h1>Bem-vindo, {currentlyUser?.user?.name}!</h1>
            </Col>
            <Col xs={12} md={6}>
              <SelectSyled
                options={establishments}
                value={selectedEstablishment}
                onChange={e => handleChangeEstab(e)}
                placeholder="Selecione o estabelecimento"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <ChartCard>
                <h3>Consultas do dia</h3>
                {apsMonth.length > 0 ? (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        activeIndex={indexDay}
                        activeShape={renderActiveShape}
                        data={apDays}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        onMouseEnter={onPieEnterMonth}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p>Sem nenhum dado!</p>
                )}
              </ChartCard>
            </Col>

            <Col xs={12} md={6}>
              <ChartCard>
                <h3>Consultas do mês</h3>
                {apsMonth.length > 0 ? (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        activeIndex={index}
                        activeShape={renderActiveShape}
                        data={apsMonth}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        onMouseEnter={onPieEnterMonth}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p>Sem nenhum dado!</p>
                )}
              </ChartCard>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ChartCard>
                <h3>Consultas realizadas últimos 12 meses</h3>
                {lineChart?.length > 0 ? (
                  <>
                    <LineChart
                      width={800}
                      height={350}
                      data={lineChart}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="Consultas"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </>
                ) : (
                  <p>Sem nenhum dado!</p>
                )}
              </ChartCard>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
