import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Alert, Modal, Button, } from 'react-bootstrap';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { toast } from 'react-toastify';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import userContext from '../../store/UserContext';
import debounce from '../../utils/debounce';
import AppointmentStatus from '../../enums/AppointmentStatus.enum';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import StyledCalendar from '../../styles/StyledCalendar';

const StyledMain = styled.main`
  display: inline-flex;
  height: 100vh;
  width: calc(100vw - 250px);
`;

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'minhas-consultas', name: 'Minhas consultas' },
];

function Appointment() {
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

  const currentlyUser = useContext(userContext);

  const [showInfo, setShowInfo] = useState(false);
  const [clickedEvent, setClickedEvent] = useState();
  const [schedules, setSchedules] = useState([]);
  const [scheduleToday, setScheduleToday] = useState();
  const [myPosition, setMyPosition] = useState();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const fetchMonthSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/appointments`, authToken());
      const formattedDate = data.map(currentDate => {
        return {
          ...currentDate,
          title: 'teste',
          start: moment(currentDate.start).toDate(),
          end: moment(currentDate.end).toDate(),
        };
      });
      setSchedules(formattedDate);
      setLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.error);
      setLoading(false);
    }
  }, []);

  const fetchTodaySchedule = async () => {
    try {
      const { data } = await api.get(`/my-appointments-today`, authToken());
      setScheduleToday(data);
      if (data) {
        const { position } = await api.get(`/my-position`, authToken());
        setMyPosition(
          position.findIndex(
            item => item.patient_id === currentlyUser?.user?.id
          ) + 1
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  const fetchData = () => {
    fetchMonthSchedules(new Date());
    fetchTodaySchedule();
  };

  useEffect(fetchData, [currentlyUser?.user?.id]);

  const parseDate = date => {
    return moment(date).format('HH:mm');
  };

  const handleChangeMonth = (date, view) => {
    if (view === 'month') debounce(fetchMonthSchedules(date), 1000);
  };

  const handleSelectEvent = e => {
    setClickedEvent(e);
    setShowInfo(true);
  };

  const handleRequest = async (status, message) => {
    console.log(status)
  };

  return (
    <div>
      <Header />
      {loading && <Loader />}
      <StyledMain>
        <Container fluid>
          <Row>
            <Breadcrumb siteMap={siteMap} />
            <Col xs={12}>
              <PageTitle headerTitle="Minhas consultas" />
            </Col>
            {scheduleToday && (
              <Col xs={12}>
                <Alert
                  show={showAlert}
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  <Alert.Heading>
                    Você tem um agendamento hoje com{' '}
                    {scheduleToday?.doctor?.name}!
                  </Alert.Heading>
                  <p>
                    Horário: <strong>{parseDate(scheduleToday?.start)}</strong>
                    <br />
                    Sua posição na fila: <strong>{myPosition}</strong>
                  </p>
                </Alert>
              </Col>
            )}

            <Col xs={12}>
              {schedules && (
                <StyledCalendar
                  localizer={localizer}
                  events={schedules}
                  selectable
                  onSelectEvent={e => handleSelectEvent(e)}
                  startAccessor="start"
                  endAccessor="end"
                  views={['day', 'week', 'month']}
                  style={{ height: 'calc(100vh' }}
                  messages={messages[0]}
                  defaultView={window.innerWidth > 768 ? 'month' : 'day'}
                  onNavigate={(date, view) => handleChangeMonth(date, view)}
                />
              )}
            </Col>
          </Row>
        </Container>
      </StyledMain>

      <Modal
        show={showInfo}
        onHide={() => setShowInfo(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Consulta de {clickedEvent?.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Cancelar</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={() => setShowInfo(false)}>
            Cancelar
            </Button>
          <Button
            variant="danger"
            onClick={() =>
              handleRequest(
                AppointmentStatus.CANCELADO,
                'Cancelamento solicitado!'
              )
            }
          >
            Solicitar cancelamento
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Appointment;
