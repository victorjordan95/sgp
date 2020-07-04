import React, { useContext } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import userContext from '../../store/UserContext';

import Header from '../../components/Header';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const StyledMain = styled.main`
  display: inline-flex;
  height: 100vh;
  width: calc(100vw - 250px);
`;

const messages = {
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
};

const events = [
  {
    title: 'teste',
    start: new Date('06/06/2020'),
    end: new Date('06/06/2020'),
    allDay: false,
  },
  {
    title: 'teste',
    start: new Date('06/07/2020'),
    end: new Date('06/07/2020'),
    allDay: false,
  },
];

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

function Agenda() {
  const currentlyUser = useContext(userContext);
  return (
    <div>
      <Header />
      <StyledMain>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh' }}
                messages={messages}
              />
            </Col>
          </Row>
        </Container>
      </StyledMain>
    </div>
  );
}

export default Agenda;
