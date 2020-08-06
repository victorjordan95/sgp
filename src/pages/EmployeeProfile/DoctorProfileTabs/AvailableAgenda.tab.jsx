import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/pt-br';

import userContext from '../../../store/UserContext';
import api from '../../../services/api';
import authToken from '../../../utils/authToken';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
moment.locale('pt-br');

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

function AvailableAgenda({ doctorId, doctorInfo }) {
  const currentlyUser = useContext(userContext);

  const [schedules, setSchedules] = useState();
  const [show, setShow] = useState(false);
  const [clickedEvent, setClickedEvent] = useState();

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

  const fetchMonthSchedules = async (date = new Date()) => {
    try {
      const { data } = await api.get(
        `/doctor/${doctorId}/available?date=${date}`,
        authToken()
      );
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
  };

  function fetchData() {
    fetchMonthSchedules(new Date().getTime());
  }

  useEffect(fetchData, []);

  const handleChangeMonth = date => {
    fetchMonthSchedules(new Date(date).getTime());
  };

  const handleClickEvent = e => {
    setClickedEvent(e);
    setShow(true);
  };

  const handleSubmit = async e => {
    const appointment = {
      ...clickedEvent,
      doctor_id: doctorId,
      patient_id: currentlyUser?.user?.id,
      all_day: false,
    };
    try {
      await api.post(`/appointments`, appointment, authToken());
      toast.success('Agendamento solicitado com sucesso!');
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setShow(false);
    fetchData();
  };

  return (
    <>
      {schedules ? (
        <StyledCalendar
          localizer={localizer}
          events={schedules}
          views={['day']}
          startAccessor="start"
          onSelectEvent={e => handleClickEvent(e)}
          endAccessor="end"
          style={{ height: 'calc(100vh' }}
          messages={messages[0]}
          defaultView={window.innerWidth > 768 ? 'day' : 'list'}
          onNavigate={(date, view) => handleChangeMonth(date, view)}
        />
      ) : (
        <p>Loading</p>
      )}
      ;
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agendamento de consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja solicitar uma consulta com <strong>{doctorInfo.name}</strong>{' '}
          no dia{' '}
          <strong>{moment(clickedEvent?.start).format('DD/MM/YYYY')}</strong> no
          horário de <strong>{clickedEvent?.time}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Agendar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AvailableAgenda;
