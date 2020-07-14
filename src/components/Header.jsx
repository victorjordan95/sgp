import React, { useState, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdMenu } from 'react-icons/md';
import { FiPieChart, FiUser, FiCalendar, FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import AvatarPicture from './AvatarPicture';

import userContext from '../store/UserContext';

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
    min-height: 100vh;
    padding: 32px 8px;
    padding-right: 12px;
    transition: all ease 0.5s;
    top: 80px;
    position: relative;
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

function Header() {
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
          <AvatarPicture
            path={currentlyUser?.user?.avatar?.url}
            size="small"
            description="teste"
          />
          <Dropdown>
            <Dropdown.Toggle>{currentlyUser?.user?.name}</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/" onClick={() => currentlyUser.logout()}>
                Sair
              </Dropdown.Item>
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

export default Header;
