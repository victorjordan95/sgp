import React, { useState, useContext } from 'react';
import { Form, Col } from 'react-bootstrap';
import styled from 'styled-components';

import AwesomeSlider from 'react-awesome-slider';
import { toast } from 'react-toastify';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import LabelStyled from '../../styles/LabelForm';
import { validateEmail } from '../../utils/formValidator';

import userContext from '../../store/UserContext';

import api from '../../services/api';
import authToken from '../../utils/authToken';

import 'react-awesome-slider/dist/styles.css';

import background2x from '../../assets/img/Data@2x.png';
import background from '../../assets/img/Data.png';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const LoginPageStyled = styled.main`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledAutoPlay = styled.section`
  @media screen and (min-width: 1000px) {
    display: flex;
    width: 50vw;
  }

  .slider {
    display: none;
    @media screen and (min-width: 1000px) {
      display: block;
      height: 100%;
      min-height: 100vh;
      max-width: 50vw;
    }

    .awssld__wrapper {
      height: 100vh;
    }

    .awssld__content {
      background: #64b5f6 0% 0% no-repeat padding-box;
    }

    .awssld__bullets {
      bottom: 80px;
      z-index: 2;

      .awssld__bullets--active {
        transform: scale(1.2);
        background: rgba(255, 255, 255, 1);
        border-radius: 15px !important;
        height: 7px !important;
        width: 20px !important;
      }

      button {
        background: rgba(255, 255, 255, 1);
        border-radius: 20px;
        height: 10px;
        margin: 5px;
        transition: transform 0.225s cubic-bezier(rgba(255, 255, 255, 1)),
          background-color 0.175s ease-out;
        width: 10px;
      }
    }

    .slider-item {
      @media screen and (min-width: 1000px) {
        align-items: center;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
      }
    }

    .slider-img {
      @media screen and (min-width: 1000px) {
        margin-bottom: 30px;
        max-width: 350px;
      }
    }
    .slider-title {
      color: rgba(255, 255, 255, 1);
      font-size: 1.875rem;
      margin-bottom: 20px;
    }

    .slider-text {
      color: rgba(255, 255, 255, 1);
      font-size: 1.25rem;
      margin-bottom: 30px;
      text-align: center;
      width: 553px;
    }
  }
`;

const LoginFormStyled = styled.section`
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  padding: 24px 40px 0;
  width: 100vw;

  @media screen and (min-width: 1000px) {
    width: 50vw;
  }

  > .title {
    color: #004d40;
    font-size: 1.875rem;
    font-weight: 400;
    margin-bottom: 87px;
  }

  form {
    align-items: center;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    max-width: 433px;
    width: 100%;

    button[type='submit'] {
      margin-top: 20px;
    }
  }

  .forgot-link {
    align-self: flex-end;
    color: rgba(112, 112, 112, 1);
    margin-bottom: 30px;
    text-decoration: none;
    margin-right: 16px;

    @media screen and (min-width: 768px) {
      margin-right: 0;
    }

    &:hover {
      color: darken(rgba(112, 112, 112, 1), 15%);
    }
  }

  .separator {
    color: rgba(112, 112, 112, 1);
    font-size: 0.875rem;
    margin: 40px 0;
    overflow: hidden;
    text-align: center;
    width: 100%;

    @media screen and (min-width: 768px) {
      max-width: 433px;
    }

    &:before,
    &:after {
      background-color: rgba(112, 112, 112, 1);
      content: '';
      display: inline-block;
      height: 1px;
      position: relative;
      vertical-align: middle;
      width: 40%;

      @media screen and (min-width: 768px) {
        width: 50%;
      }
    }

    &:before {
      right: 0.5em;
      margin-left: -50%;
    }

    &:after {
      left: 0.5em;
      margin-right: -50%;
    }
  }

  .create-link {
    color: rgba(112, 112, 112, 1);
    font-size: 1rem;
    margin-top: 40px;
    text-align: center;
  }

  .slide-content {
    @media screen and (min-width: 1000px) {
      display: flex;
      width: 50vw;
    }
  }

  button:disabled {
    background-color: #009688;
    border-color: #009688;
    cursor: not-allowed;
  }
`;

function Login(props) {
  const currentlyUser = useContext(userContext);

  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    setError({});
    if (!validateEmail(formValues.email)) {
      setError(...error, { email: 'Email address is invalid' });
      return;
    }

    try {
      const loggedUser = await api.post('/session', formValues);
      localStorage.setItem('sgp-token', loggedUser.data.token);
      props.history.push('/dashboard');

      const userData = await api.get(
        `/users/${loggedUser.data.user.id}`,
        authToken()
      );
      localStorage.setItem(
        'userEstabs',
        userData?.data?.establishments?.map(estab => estab.id)
      );
      currentlyUser.handleUserContext(userData.data);
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  return (
    <LoginPageStyled>
      <StyledAutoPlay className="slide-content">
        <AutoplaySlider
          className="slider"
          organicArrows={false}
          play
          cancelOnInteraction={false}
          interval={4000}
        >
          <div className="slider-item">
            <img
              srcSet={`${background2x} 2x`}
              src={background}
              className="slider-img"
              alt="Marcenas mattis egestas"
            />
            <p className="slider-title">Marcenas mattis egestas</p>
            <p className="slider-text">
              Erdum et malesuada fames ac ante ileum primmer in faucibus
              uspendisse porta.
            </p>
          </div>

          <div className="slider-item">
            <img
              srcSet={`${background2x} 2x`}
              src={background}
              className="slider-img"
              alt="Marcenas mattis egestas"
            />
            <p className="slider-title">Marcenas mattis egestas</p>
            <p className="slider-text">
              Erdum et malesuada fames ac ante ileum primmer in faucibus
              uspendisse porta.
            </p>
          </div>
          <div className="slider-item">
            <img
              srcSet={`${background2x} 2x`}
              src={background}
              className="slider-img"
              alt="Marcenas mattis egestas"
            />
            <p className="slider-title">Marcenas mattis egestas</p>
            <p className="slider-text">
              Erdum et malesuada fames ac ante ileum primmer in faucibus
              uspendisse porta.
            </p>
          </div>
        </AutoplaySlider>
      </StyledAutoPlay>
      <LoginFormStyled className="login">
        <h1 className="title">Saluti</h1>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group as={Col} className="p-0">
            <LabelStyled>Endereço de e-mail</LabelStyled>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              required
              value={formValues?.email || ''}
              onChange={e =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} className="p-0">
            <LabelStyled>Senha</LabelStyled>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              name="password"
              required
              value={formValues?.password || ''}
              onChange={e =>
                setFormValues({ ...formValues, password: e.target.value })
              }
            />
          </Form.Group>

          <a href="/" className="forgot-link">
            Esqueceu sua senha?
          </a>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formValues?.email || !formValues?.password}
          >
            Entrar
          </button>
        </Form>
      </LoginFormStyled>
    </LoginPageStyled>
  );
}

export default Login;
