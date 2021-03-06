import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import Select from 'react-select';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import CurrencyInput from 'react-currency-masked-input';
import 'moment/locale/pt-br';

import userContext from '../../store/UserContext';
import api from '../../services/api';
import authToken from '../../utils/authToken';
import Roles from '../../enums/Roles.enum';
import AppointmentStatus from '../../enums/AppointmentStatus.enum';
import paymentStatusAppointment from '../../utils/paymentStatusAppointment';
import debounce from '../../utils/debounce';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import StyledCalendar from '../../styles/StyledCalendar';
import LabelStyled from '../../styles/LabelForm';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const StyledMain = styled.main`
  /* display: inline-flex;
  height: 100vh;
  width: calc(100vw - 250px); */
`;

const SelectStyled = styled(Select)`
  z-index: 998;
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
  const [showInfo, setShowInfo] = useState(false);
  const [clickedEvent, setClickedEvent] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [formValues, setFormValues] = useState({});

  const fetchMonthSchedules = useCallback(
    async (date = new Date(), doctorId) => {
      if (currentlyUser?.user?.Role?.role === Roles.DOCTOR) {
        setLoading(true);
        try {
          const { data } = await api.get(`/schedule?date=${date}`, authToken());
          const formattedDate = data.map(cDate => {
            return {
              ...cDate,
              start: moment(cDate.start).toDate(),
              end: moment(cDate.end).toDate(),
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
          const formattedDate = data.map(cDate => {
            return {
              ...cDate,
              start: moment(cDate.start).toDate(),
              end: moment(cDate.end).toDate(),
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
      console.log(result.data);
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
        value: res?.data?.rows[0]?.id,
        label: res?.data?.rows[0]?.name,
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
        setSelectedDoctor({
          value: res?.rows[0]?.id,
          label: res?.rows[0]?.name,
        });

        fetchMonthSchedules(new Date(), res?.rows[0]?.id);
      });
      fetchUsers();
    }
  };

  useEffect(fetchData, [currentlyUser]);

  const handleChangeMonth = (date, view) => {
    setCurrentDate(date);
    if (view === 'month') debounce(fetchMonthSchedules(date), 1000);
  };

  const handleSubmit = async () => {
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
    setClickedEvent(e);
    setShow(true);
  };

  const handleSelectEvent = e => {
    setClickedEvent(e);
    setShowInfo(true);
  };

  const handleRequest = async (status, message) => {
    const request = { id: clickedEvent?.id, status };
    const requestPayment = {
      appointment_id: clickedEvent?.id,
      value: Number(formValues?.appointmentValue * 10),
      status: formValues?.appointmentStatus,
    };
    try {
      await api.put(`/schedule`, request, authToken());
      await api.post(`/payment`, requestPayment, authToken());
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
    setShowInfo(false);
    fetchMonthSchedules(currentDate, selectedDoctor.value);
  };

  return (
    <div>
      {loading && <Loader />}
      <Header />
      <StyledMain>
        <Container fluid>
          <Row>
            {doctors && <>
              <Breadcrumb siteMap={siteMap} />
              <Col xs={12} md={4} className="mb-4">
                {doctors && (
                  <SelectStyled
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
                    onSelectEvent={e => handleSelectEvent(e)}
                    onSelectSlot={e => handleClickEvent(e)}
                    views={['day', 'week', 'month']}
                    eventPropGetter={event => {
                      const newStyle = {
                        color: 'white',
                      };
                      if (Number(event?.status) === AppointmentStatus.CANCELADO) {
                        newStyle.backgroundColor = '#c62828';
                      }
                      if (Number(event?.status) === AppointmentStatus.REALIZADO) {
                        newStyle.backgroundColor = '#4caf50';
                      }

                      return {
                        className: '',
                        style: newStyle,
                      };
                    }}
                    style={{ height: 'calc(100vh' }}
                    messages={messages[0]}
                    defaultView={window.innerWidth > 768 ? 'month' : 'day'}
                    onNavigate={(date, view) => handleChangeMonth(date, view)}
                  />
                )}
              </Col>
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
                      onChange={e => setSelectedPatient(e)}
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
                  <Button variant="light" onClick={() => setShow(false)}>
                    Cancelar
              </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Agendar
              </Button>
                </Modal.Footer>
              </Modal>

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
                  <Form.Group as={Col}>
                    <LabelStyled>Valor da consulta</LabelStyled>
                    <CurrencyInput
                      className="form-control"
                      placeholder="Digite o valor da consulta"
                      name="appointmentValue"
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          appointmentValue: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <LabelStyled>Forma de pagamento</LabelStyled>
                    <Select
                      options={paymentStatusAppointment}
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          appointmentStatus: e.value,
                        })
                      }
                      placeholder="Selecione uma forma de pagamento"
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="default" onClick={() => setShowInfo(false)}>
                    Cancelar
            </Button>
                  <Button
                    variant="light"
                    onClick={() =>
                      handleRequest(
                        AppointmentStatus.CANCELADO,
                        'Agendamento cancelado!'
                      )
                    }
                  >
                    Cancelar agendamento
            </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleRequest(
                        AppointmentStatus.REALIZADO,
                        'Agendamento atualizado!'
                      )
                    }
                  >
                    Atendido
            </Button>
                </Modal.Footer>
              </Modal>
            </>
            }
            {!loading && !doctors && <p className="w-100 d-block text-center">Você não possui nenhum médico cadastrado. <NavLink to="/medicos">Cadastre um médico clicando aqui!</NavLink></p>}

          </Row>
        </Container>

      </StyledMain>
    </div>
  );
}

export default Agenda;
