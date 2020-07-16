import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { toast } from 'react-toastify';

import userContext from '../../store/UserContext';
import api from '../../services/api';
import authToken from '../../utils/authToken';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const StyledMain = styled.main`
  display: inline-flex;
  height: 100vh;
  width: calc(100vw - 250px);
`;

const StyledCalendar = styled(Calendar)`
  .rbc-toolbar-label {
    text-transform: uppercase;
    font-weight: bold;
  }
  .rbc-current-time-indicator {
    height: 2px;
    background-color: #d32f2f;
  }
  .rbc-header {
    text-transform: capitalize;
  }
  .rbc-agenda-date-cell {
    text-transform: capitalize;
    vertical-align: middle !important;
  }
`;

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'minhas-consultas', name: 'Minhas consultas' },
];

function Appointment() {
  const currentlyUser = useContext(userContext);

  const messages = useMemo(
    () => [
      {
        allDay: 'Dia inteiro',
        previous: '<',
        next: '>',
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Agenda',
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
        allDayText: 'Dia inteiro',
      },
    ],
    []
  );

  const [schedules, setSchedules] = useState();
  const [loading, setLoading] = useState(false);

  const fetchMonthSchedules = useCallback(async date => {
    setLoading(true);
    try {
      const { data } = await api.get(`/appointments`, authToken());
      const formattedDate = data.map(currentDate => {
        return {
          ...currentDate,
          start: moment(currentDate.start).toDate(),
          end: moment(currentDate.end).toDate(),
        };
      });
      setSchedules(formattedDate);
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMonthSchedules(new Date());
  }, [fetchMonthSchedules]);

  const handleChangeMonth = (date, view) => {
    console.log('#### date=', date);
    console.log('#### view=', view);
    if (view === 'month') fetchMonthSchedules(date);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Header />
      <StyledMain>
        <Container fluid>
          <Row>
            <Breadcrumb siteMap={siteMap} />
            <Col xs={12}>
              <PageTitle
                headerTitle={`Bem-vindo ${currentlyUser?.user?.name}`}
              />
            </Col>
            <Col xs={12}>
              {schedules && (
                <StyledCalendar
                  localizer={localizer}
                  events={schedules}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 'calc(100vh' }}
                  messages={messages[0]}
                  defaultView={window.innerWidth > 768 ? 'month' : 'list'}
                  onNavigate={(date, view) => handleChangeMonth(date, view)}
                />
              )}
            </Col>
          </Row>
        </Container>
      </StyledMain>
    </div>
  );
}

export default Appointment;
