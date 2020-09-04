import React, { useState, useContext, useEffect, useMemo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Badge, Modal, Button, Form } from 'react-bootstrap';
import { MdMenu, MdNotificationsNone } from 'react-icons/md';
import {
  FiPieChart,
  FiUser,
  FiCalendar,
  FiUsers,
  FiMapPin,
} from 'react-icons/fi';
import {
  FaStethoscope,
  FaBookMedical,
  FaRegBuilding,
  FaRegMoneyBillAlt,
  FaNotesMedical,
} from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import styled from 'styled-components';

import api from '../services/api';
import authToken from '../utils/authToken';

import AvatarPicture from './AvatarPicture';
import LabelStyled from '../styles/LabelForm';
import StyledSelect from '../styles/StyledSelect';

import userContext from '../store/UserContext';
import Roles from '../enums/Roles.enum';

const StyledNav = styled.nav`
  background: #fff;
  box-shadow: 0 0px 4px 0px rgba(66, 66, 66, 0.28);
  display: flex;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
  width: 100vw;
  z-index: 1000;
  @media screen and (min-width: 1024px) {
    padding: 16px 32px;
  }

  .nav-logo {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 130px;
    h3 {
      display: none;
      @media screen and (min-width: 1024px) {
        display: block;
      }
    }

    button {
      align-self: flex-start;
      background: none;
      border: 0;
      position: relative;
      top: 8px;
    }
  }

  .nav-actions {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: auto;

    .dropdown {
      margin-left: 10px;

      .btn {
        color: #000;
        background-color: #ffffff;
        border-color: #ffffff;
        @media screen and (min-width: 1024px) {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          width: 160px;
        }

        .dropdown-username {
          display: none;
          @media screen and (min-width: 1024px) {
            display: block;
          }
        }
      }
    }
  }
`;

const StyledAside = styled.aside`
  background: #fff;
  box-shadow: 0 0 6px 0px #424242;
  display: flex;
  height: 100vh;
  flex-flow: column nowrap;
  padding: 32px 0 80px;
  position: absolute;
  transition: all ease 0.5s;
  position: fixed;
  overflow-y: scroll;
  top: 72px;
  width: 210px;
  z-index: 999;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #009688;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #009688;
    border: 2px solid #009688;
  }
  + main {
    display: inline-flex;
    margin-bottom: 48px;
    height: 100%;
    min-height: 100vh;
    padding: 32px 8px;
    padding-right: 12px;
    transition: all ease 0.5s;
    top: 72px;
    position: relative;
    width: 100%;
    @media screen and (min-width: 1024px) {
      padding: 32px 24px 32px 0;
      transform: translateX(240px);
      width: calc(100vw - 250px);
    }
  }

  &.toggled {
    transform: translateX(-220px);
    + main {
      padding: 32px 8px;
      width: calc(100vw);
      @media screen and (min-width: 1024px) {
        padding: 32px 24px 32px 0;
        transform: translateX(0);
      }
    }
  }

  .aside-content {
    display: flex;
    flex-flow: column wrap;
  }

  ul {
    list-style: none;
    padding: 0 0 0 32px;

    li {
      padding: 0 0 16px;
    }

    a {
      align-items: center;
      color: #424242;
      display: flex;
      transition: all ease 0.6s;

      &:hover {
        transition: all ease 0.6s;
        svg {
          fill: #2196f3;
        }
      }

      &.active {
        font-weight: bold;
        text-decoration: none;

        svg {
          fill: #2196f3;
        }
      }
    }

    .aside-page-name {
      padding-left: 8px;
    }
  }
  .aside-link-separator {
    color: #757575;
    font-weight: bold;
    font-size: 0.8rem;
    padding: 16px 0 16px 32px;
    text-transform: uppercase;
  }
`;

const NotificationDropdown = styled(NavLink)`
  &:hover {
    background-color: #fff;
  }

  &:active {
    background-color: #fff;
    color: #000;
  }

  .badge {
    left: -35px;
    position: relative;
    top: -5px;
  }
`;

const fetchNotifications = async () => {
  return api.get(`/notification-requests`, authToken());
};

function Header() {
  const currentlyUser = useContext(userContext);
  const userRole = currentlyUser?.user?.Role?.role;

  const [toggle, setToggle] = useState(window.innerWidth <= 1024);
  const [establishments, setEstablishments] = useState([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const inviteMessage = useMemo(
    () => [
      `${currentlyUser?.user?.name} está convidando você para fazer parte do sistema Salutii como paciente!

Faça seu cadastro no link abaixo para começar utilizar e acompanhar seus agendamentos!

http://salutii.app.br/cadastro?estabId=${selectedEstablishment?.value}`,
    ],
    [currentlyUser, selectedEstablishment]
  );

  useEffect(() => {
    setEstablishments(currentlyUser?.user?.establishments);
    setSelectedEstablishment(currentlyUser?.user?.establishments?.[0]);
    if (userRole !== Roles.PATIENT) {
      // fetchNotifications().then(res => {
      //   setNotifications(res.data);
      // });
    }
  }, [currentlyUser, userRole]);

  const copyMessage = () => {
    copy(inviteMessage);
    toast.success('Convite copiado com sucesso!');
  };

  return (
    <>
      <StyledNav>
        <div className="nav-logo">
          <button type="button" onClick={() => setToggle(!toggle)}>
            <MdMenu size={24} />
          </button>
          <h3>Salutii</h3>
        </div>
        <div className="nav-actions">
          {(userRole === Roles.EMPLOYEE || userRole === Roles.ADMIN) && (
            <NotificationDropdown
              to="/requisicoes-consultas"
              className="dropdown-item"
              activeClassName="bg-white"
            >
              <div>
                <MdNotificationsNone size={32} />
                <Badge pill variant="danger">
                  +
                </Badge>
              </div>
            </NotificationDropdown>
          )}

          <Dropdown>
            <Dropdown.Toggle>
              <AvatarPicture
                path={currentlyUser?.user?.avatar?.url}
                size="small"
                description={currentlyUser?.user?.name}
              />
              <span className="dropdown-username">
                {currentlyUser?.user?.name}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <NavLink
                to="/meu-perfil"
                className="dropdown-item"
                activeClassName="active"
              >
                Meu perfil
              </NavLink>

              {userRole !== Roles.PATIENT && (
                <span
                  role="button"
                  tabIndex={0}
                  className="dropdown-item"
                  onClick={() => setShowModal(true)}
                  onKeyPress={() => setShowModal(true)}
                >
                  Convidar para o sistema
                </span>
              )}

              <Dropdown.Divider />

              <NavLink
                to="/login"
                className="dropdown-item"
                activeClassName="active"
                onClick={() => currentlyUser.logout()}
              >
                Sair
              </NavLink>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </StyledNav>

      <StyledAside className={`${toggle ? 'toggled' : ''}`}>
        <div className="aside-content">
          <ul>
            {userRole !== Roles.PATIENT && (
              <>
                <li>
                  <NavLink to="/dashboard" activeClassName="active">
                    <FiPieChart size={24} />
                    <span className="aside-page-name">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/agenda" activeClassName="active">
                    <FiCalendar size={24} />
                    <span className="aside-page-name">Agenda médica</span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/cid" activeClassName="active">
                <FaBookMedical size={24} />
                <span className="aside-page-name">CID</span>
              </NavLink>
            </li>
          </ul>

          <span className="aside-link-separator">Agenda</span>
          <ul>
            <li>
              <NavLink to="/minhas-consultas" activeClassName="active">
                <FiCalendar size={24} />
                <span className="aside-page-name">Consultas</span>
              </NavLink>
            </li>
          </ul>

          <span className="aside-link-separator">Consultar</span>
          <ul>
            {!(userRole === Roles.PATIENT) && (
              <li>
                <NavLink to="/pacientes" activeClassName="active">
                  <FiUser size={24} />
                  <span className="aside-page-name">Pacientes</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/medicos" activeClassName="active">
                <FaStethoscope size={24} />
                <span className="aside-page-name">Médicos</span>
              </NavLink>
            </li>
            {userRole === Roles.ADMIN && (
              <li>
                <NavLink to="/funcionarios" activeClassName="active">
                  <FiUsers size={24} />
                  <span className="aside-page-name">Funcionários</span>
                </NavLink>
              </li>
            )}
            {userRole === Roles.ADMIN && (
              <li>
                <NavLink to="/estabelecimentos" activeClassName="active">
                  <FaRegBuilding size={24} />
                  <span className="aside-page-name">Estabelecimentos</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/mapa" activeClassName="active">
                <FiMapPin size={24} />
                <span className="aside-page-name">Mapa clínicas</span>
              </NavLink>
            </li>
          </ul>

          {userRole === Roles.ADMIN && (
            <>
              <span className="aside-link-separator">Financeiro</span>
              <ul>
                <li>
                  <NavLink to="/relatorios" activeClassName="active">
                    <FaNotesMedical size={24} />
                    <span className="aside-page-name">Relatórios</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/despesas" activeClassName="active">
                    <FaRegMoneyBillAlt size={24} />
                    <span className="aside-page-name">Despesas</span>
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Convidar para o sistema </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <LabelStyled>Estabelecimento</LabelStyled>
              <StyledSelect
                options={establishments}
                value={selectedEstablishment}
                onChange={e => setSelectedEstablishment(e)}
                placeholder="Selecione o estabelecimento"
                className="mb-4"
              />
              <Form.Control
                as="textarea"
                readOnly
                disabled
                rows="8"
                id="js-invite-text"
                defaultValue={inviteMessage}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="default" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={copyMessage}>
              Copiar mensagem
            </Button>
          </Modal.Footer>
        </Modal>
      </StyledAside>
    </>
  );
}

export default Header;
