import React, { useContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

import userContext from '../../store/UserContext';
import api from '../../services/api';
import authToken from '../../utils/authToken';

import Header from '../../components/Header';

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

function Agenda() {
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

  const fetchMonthSchedules = async date => {
    const { data } = await api.get(`/schedule?date=${date}`, authToken());
    const formattedDate = data.map(currentDate => {
      return {
        ...currentDate,
        start: moment(currentDate.start).toDate(),
        end: moment(currentDate.end).toDate(),
      };
    });
    setSchedules(formattedDate);
  };

  useEffect(() => {
    fetchMonthSchedules(new Date());
  }, []);

  const handleChangeMonth = (date, view) => {
    console.log('#### date=', date);
    console.log('#### view=', view);
    if (view === 'month') fetchMonthSchedules(date);
  };

  const currentlyUser = useContext(userContext);
  return (
    <div>
      <Header />
      <StyledMain>
        <Container fluid>
          <Row>
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

export default Agenda;
