import React, { useState, useContext, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { MdMenu, MdNotificationsNone } from 'react-icons/md';
import {
  FiPieChart,
  FiUser,
  FiCalendar,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { FaStethoscope, FaBookMedical } from 'react-icons/fa';
import { BsNewspaper } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import api from '../services/api';
import authToken from '../utils/authToken';

import AvatarPicture from './AvatarPicture';

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
  z-index: 10;
  @media screen and (min-width: 1024px) {
    padding: 16px 32px;
  }

  .nav-logo {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 130px;

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
      }
    }
  }
`;

const StyledAside = styled.aside`
  background: #fff;
  box-shadow: 0 0 6px 0px #424242;
  display: inline-flex;
  height: 100vh;
  padding-top: 32px;
  position: absolute;
  transition: all ease 0.5s;
  position: fixed;
  top: 80px;
  width: 210px;
  z-index: 5;

  + main {
    display: inline-flex;
    margin-bottom: 48px;
    height: 100%;
    min-height: 100vh;
    padding: 32px 8px;
    padding-right: 12px;
    transition: all ease 0.5s;
    top: 80px;
    position: relative;
    width: 100%;
    @media screen and (min-width: 1024px) {
      padding: 32px 24px;
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
        padding: 32px 24px;
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

  const [toggle, setToggle] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    fetchNotifications().then(res => {
      setNotifications(res.data);
    });
  }, []);

  setTimeout(() => {
    fetchNotifications().then(res => {
      setNotifications(res.data);
    });
  }, 10000);

  return (
    <>
      <StyledNav>
        <div className="nav-logo">
          <button type="button" onClick={() => setToggle(!toggle)}>
            <MdMenu size={24} />
          </button>
          <h3>Saluti</h3>
        </div>
        <div className="nav-actions">
          <NotificationDropdown
            to="/requisicoes-consultas"
            className="dropdown-item"
            activeClassName="bg-white"
          >
            <MdNotificationsNone size={32} />
            {notifications > 0 && (
              <Badge pill variant="danger">
                {notifications}
              </Badge>
            )}
          </NotificationDropdown>

          <AvatarPicture
            path={currentlyUser?.user?.avatar?.url}
            size="small"
            description={currentlyUser?.user?.name}
          />
          <Dropdown>
            <Dropdown.Toggle>{currentlyUser?.user?.name}</Dropdown.Toggle>

            <Dropdown.Menu>
              <NavLink
                to="/meu-perfil"
                className="dropdown-item"
                activeClassName="active"
              >
                Meu perfil
              </NavLink>

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
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                <FiPieChart size={24} />
                <span className="aside-page-name">Dashboard</span>
              </NavLink>
            </li>
            {(userRole === Roles.DOCTOR || userRole === Roles.EMPLOYEE) && (
              <li>
                <NavLink to="/agenda" activeClassName="active">
                  <FiCalendar size={24} />
                  <span className="aside-page-name">Agenda médica</span>
                </NavLink>
              </li>
            )}
            {(userRole === Roles.DOCTOR || userRole === Roles.EMPLOYEE) && (
              <li>
                <NavLink to="/requisicoes-consultas" activeClassName="active">
                  <FiCalendar size={24} />
                  <span className="aside-page-name">Requisições</span>
                </NavLink>
              </li>
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
            <li>
              <NavLink to="/exames" activeClassName="active">
                <BsNewspaper size={24} />
                <span className="aside-page-name">Exames</span>
              </NavLink>
            </li>
          </ul>

          <span className="aside-link-separator">Usuários</span>
          <ul>
            {!(userRole === Roles.PACIENT) && (
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
            <li>
              <NavLink to="/funcionarios" activeClassName="active">
                <FiUsers size={24} />
                <span className="aside-page-name">Funcionários</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </StyledAside>
    </>
  );
}

export default Header;
