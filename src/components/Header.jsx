import React, { useState, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdMenu } from 'react-icons/md';
import { FiPieChart, FiUser, FiCalendar, FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import userContext from '../store/UserContext';

const StyledNav = styled.nav`
  box-shadow: 0 0px 4px 0px rgba(66, 66, 66, 0.28);
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  width: 100vw;

  .nav-logo {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    width: 130px;

    button {
      background: none;
      border: 0;
      position: relative;
      top: 4px;
    }
  }

  .nav-actions {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 25%;
  }
`;

const StyledAside = styled.aside`
  display: inline-flex;
  height: 100vh;
  padding-top: 32px;
  position: absolute;
  transition: all ease 0.5s;
  width: 210px;

  + main {
    display: inline-flex;
    height: 100vh;
    transform: translateX(240px);
    padding: 32px 0;
    transition: all ease 0.5s;
    width: calc(100vw - 250px);
  }

  &.toggled {
    transform: translateX(-210px);
    + main {
      transform: translateX(0);
      padding: 32px 24px;
      width: calc(100vw);
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

function Dashboard() {
  const currentlyUser = useContext(userContext);

  const [toggle, setToggle] = useState(false);

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
          {currentlyUser?.user?.name}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
          </ul>

          <span className="aside-link-separator">Agenda</span>
          <ul>
            <li>
              <NavLink to="/agenda" activeClassName="active">
                <FiCalendar size={24} />
                <span className="aside-page-name">Agenda</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/pacientes" activeClassName="active">
                <FiUser size={24} />
                <span className="aside-page-name">Pacientes</span>
              </NavLink>
            </li>
          </ul>

          <span className="aside-link-separator">Meu perfil</span>
          <ul>
            <li>
              <NavLink to="/meu-perfil" activeClassName="active">
                <FiSettings size={24} />
                <span className="aside-page-name">Meu perfil</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </StyledAside>
    </>
  );
}

export default Dashboard;
