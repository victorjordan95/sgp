import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import Select from 'react-select';
import moment from 'moment';
import 'moment/locale/pt-br';

import userContext from '../../store/UserContext';
import api from '../../services/api';
import authToken from '../../utils/authToken';
import Roles from '../../enums/Roles.enum';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

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
  { path: 'agenda', name: 'Agenda' },
];

function Agenda() {
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
  const [doctors, setDoctors] = useState();
  const [patients, setPatients] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [clickedEvent, setClickedEvent] = useState();

  const fetchMonthSchedules = useCallback(
    async (date, doctorId) => {
      if (currentlyUser?.user?.Role?.role === Roles.DOCTOR) {
        setLoading(true);
        try {
          const { data } = await api.get(`/schedule?date=${date}`, authToken());
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
      } else {
        try {
          const { data } = await api.get(
            `/schedule?date=${date}&doctorId=${doctorId}`,
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
      }
    },
    [currentlyUser]
  );

  const fetchDoctors = async () => {
    const userEstabs = localStorage.getItem('userEstabs');
    try {
      const result = await api.get(
        `/doctors?userEstab=${userEstabs}`,
        authToken()
      );
      return result.data;
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
    return false;
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/patients`, authToken());
      setPatients(
        res.data.rows.map(patient => {
          return { value: patient.id, label: patient.name };
        })
      );
      setSelectedPatient({
        value: res.data.rows[0].id,
        label: res.data.rows[0].name,
      });
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  const fetchData = () => {
    if (currentlyUser?.user?.Role?.role === Roles.DOCTOR) {
      fetchMonthSchedules(new Date());
    } else if (
      currentlyUser?.user?.Role?.role === Roles.EMPLOYEE ||
      currentlyUser?.user?.Role?.role === Roles.ADMIN
    ) {
      fetchDoctors().then(res => {
        setDoctors(
          res.rows.map(doctor => {
            return { value: doctor.id, label: doctor.name };
          })
        );
        setSelectedDoctor({ value: res.rows[0].id, label: res.rows[0].name });

        fetchMonthSchedules(new Date(), res?.rows[0]?.id);
      });
      fetchUsers();
    }
  };

  useEffect(fetchData, [currentlyUser]);

  const handleChangeMonth = (date, view) => {
    console.log('#### date=', date);
    console.log('#### view=', view);
    if (view === 'month') fetchMonthSchedules(date);
  };

  const handleSubmit = async e => {
    const appointment = {
      ...clickedEvent,
      doctor_id: selectedDoctor.value,
      patient_id: selectedPatient.value,
      all_day: false,
      status: 2,
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

  const handleChangeDoctor = e => {
    setLoading(true);
    setSelectedDoctor(e);
    fetchMonthSchedules(new Date(), e.value);
    setLoading(false);
  };

  const handleClickEvent = e => {
    console.log(e);
    setClickedEvent(e);
    setShow(true);
  };

  return (
    <div>
      {loading && <Loader />}
      <Header />
      <StyledMain>
        <Container fluid>
          <Row>
            <Breadcrumb siteMap={siteMap} />
            <Col xs={12} md={4} className="mb-4">
              {doctors && (
                <Select
                  options={doctors}
                  value={selectedDoctor}
                  onChange={e => handleChangeDoctor(e)}
                  placeholder="Selecione um médico"
                />
              )}
            </Col>
            <Col xs={12}>
              {schedules && (
                <StyledCalendar
                  localizer={localizer}
                  events={schedules}
                  selectable
                  startAccessor="start"
                  endAccessor="end"
                  onSelectSlot={e => handleClickEvent(e)}
                  eventPropGetter={event => {
                    const newStyle = {
                      color: 'white',
                    };
                    if (Number(event.status) === 5) {
                      newStyle.backgroundColor = 'lightgreen';
                    }

                    return {
                      className: '',
                      style: newStyle,
                    };
                  }}
                  style={{ height: 'calc(100vh' }}
                  messages={messages[0]}
                  defaultView={window.innerWidth > 768 ? 'month' : 'list'}
                  onNavigate={(date, view) => handleChangeMonth(date, view)}
                />
              )}
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
            <Modal.Title>Agendamento de consulta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {doctors && (
              <Select
                options={patients}
                value={selectedPatient}
                onChange={handleChangeDoctor}
                placeholder="Selecione um paciente"
                className="mb-3"
              />
            )}
            Deseja agendar uma consulta com{' '}
            <strong>{selectedDoctor?.label}</strong> no dia{' '}
            <strong>{moment(clickedEvent?.start).format('DD/MM/YYYY')}</strong>{' '}
            no horário de{' '}
            <strong>{moment(clickedEvent?.start).format('hh:mm')}</strong> para
            o paciente <strong>{selectedPatient?.label}</strong>?
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
      </StyledMain>
    </div>
  );
}

export default Agenda;
