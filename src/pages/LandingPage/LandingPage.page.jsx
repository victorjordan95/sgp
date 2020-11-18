import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPieChart,
  FiCalendar,
  FiCloud,
  FiBell,
  FiSmile,
  FiSmartphone,
} from 'react-icons/fi';
import { StyledLandingPage } from './StyledLandingPage.style';

import mobileImgBanner from '../../assets/img/header-mobile.png';
import featureImg from '../../assets/img/feature-image.png';

function LandingPage(props) {
  return (
    <StyledLandingPage>
      <div className="header-nav d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">Salutii</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 " href="#features_page">
            Features
          </a>
          <a className="p-2 " href="#price_page">
            Planos
          </a>
        </nav>
        <Link to="/login" className="btn btn-outline-primary">
          Login
        </Link>
      </div>

      <header className="home-area overlay" id="home_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 hidden-sm col-md-5">
              <figure className="mobile-image wow fadeInUp">
                <img src={mobileImgBanner} alt="" />
              </figure>
            </div>
            <div className="col-xs-12 col-md-7 header-text d-flex flex-column justify-content-center">
              <h1 className="wow fadeInUp" data-wow-delay="0.4s">
                Start your amazing stuff through appy.
              </h1>
              <div className="desc wow fadeInUp">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do
                  eiusmod tempor incididunt ut labore et laborused sed do
                  eiusmod tempor incididunt ut labore et laborused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-padding" id="about_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="page-title text-center">
                <h5 className="title mb-40">Sobre Salutii</h5>
                <h3 className="blue-color mb-40">
                  A beautiful app for consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut mollit anim id est laborum. Sedut
                  perspiciatis unde omnis.{' '}
                </h3>
                <p className="mb-40">
                  Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do
                  eiusmod tempor incididunt ut labore et laborused sed do
                  eiusmod tempor incididunt ut labore et laborused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-area section-padding-top" id="features_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 offset-sm-2 mb-40">
              <div className="page-title text-center">
                <h5 className="title text-center">Funcionalidades</h5>
                <div className="space-10 text-center" />
                <h3>Funcionalidades para sua gestão simplificada!</h3>
                <div className="space-60" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="service-box wow fadeInUp" data-wow-delay="0.4s">
                <div className="box-icon">
                  <FiPieChart size={20} />
                </div>
                <h4>Gráficos relevantes</h4>
                <p>Tenha em suas mãos gráficos para ajudar em sua gestão!</p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.6s">
                <div className="box-icon">
                  <FiCalendar size={20} />
                </div>
                <h4>Gestão de Agendamentos</h4>
                <p>
                  Faça agendamentos para pacientes, aceite solicitações de
                  agendamento, veja os dias disponíveis, você tem total
                  flexibilidade!
                </p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.6s">
                <div className="box-icon">
                  <FiCloud size={20} />
                </div>
                <h4>Armazenamento em Nuvem</h4>
                <p>
                  Tenha a segurança de seus dados estarem sempre salvos em um
                  local seguro!
                </p>
              </div>
              <div className="space-60" />
            </div>
            <div className="hidden-xs hidden-sm col-md-4">
              <figure className="mobile-image">
                <img src={featureImg} alt="Feature system" />
              </figure>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <FiBell size={20} />
                </div>
                <h4>Notificações</h4>
                <p>
                  Com Salutii, seu paciente sabe quantas pessoas estão na frente
                  e recebem notificações auxiliares!
                </p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <FiSmile size={20} />
                </div>
                <h4>Simples e prático</h4>
                <p>
                  Sem ficar dando voltas para realizar uma ação, vá direto ao
                  ponto!
                </p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.4s">
                <div className="box-icon">
                  <FiSmartphone size={20} />
                </div>
                <h4>Totalmente responsivo</h4>
                <p>
                  Acesse o mesmo sistema, seja pelo celular, tablet ou
                  computador!
                </p>
              </div>
              <div className="space-60" />
              <div className="space-60" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding price-area" id="price_page">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 offset-md-2 col-md-8">
              <h1 className="display-4 text-center">Valores</h1>
              <p className="lead text-center">
                Quickly build an effective pricing table for your potential
                customers with this Bootstrap example. It's built with default
                Bootstrap components and utilities with little customization.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="price-box">
                <div className="price-header">
                  <div className="price-icon">
                    <span className="lnr lnr-rocket" />
                  </div>
                  <h4 className="upper">Pessoal</h4>
                </div>
                <div className="price-body">
                  <ul>
                    <li>Easy Installations</li>
                    <li>Unlimited support</li>
                    <li>Uniqe Elements</li>
                  </ul>
                </div>
                <div className="price-rate">
                  <sup>R$</sup> <span className="rate">39</span>{' '}
                  <small>/Mês</small>
                </div>
                <div className="price-footer">
                  {/* <a href="#" className="bttn-white">
                    Purchase
                  </a> */}
                </div>
              </div>
              <div className="space-30 hidden visible-xs" />
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="price-box">
                <div className="price-header">
                  <div className="price-icon">
                    <span className="lnr lnr-diamond" />
                  </div>
                  <h4 className="upper">Básico</h4>
                </div>
                <div className="price-body">
                  <ul>
                    <li>Easy Installations</li>
                    <li>Unlimited support</li>
                    <li>Free Forever</li>
                  </ul>
                </div>
                <div className="price-rate">
                  <sup>R$</sup> <span className="rate">79</span>{' '}
                  <small>/Mês</small>
                </div>
                <div className="price-footer">
                  {/* <a href="#" className="bttn-white">
                    Purchase
                  </a> */}
                </div>
              </div>
              <div className="space-30 hidden visible-xs" />
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="price-box">
                <div className="price-header">
                  <div className="price-icon">
                    <span className="lnr lnr-pie-chart" />
                  </div>
                  <h4 className="upper">Empresarial</h4>
                </div>
                <div className="price-body">
                  <ul>
                    <li>Easy Installations</li>
                    <li>Unlimited support</li>
                    <li>Free Forever</li>
                  </ul>
                </div>
                <div className="price-rate">
                  <sup>R$</sup> <span className="rate">99</span>{' '}
                  <small>/Mês</small>
                </div>
                <div className="price-footer">
                  {/* <a href="/" className="bttn-white">
                    Purchase
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <img
                className="mb-2"
                src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                alt=""
                width="24"
                height="24"
              />
              <small className="d-block mb-3 text-muted">© 2017-2018</small>
            </div>
            <div className="col-6 col-md">
              <h5>Features</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Cool stuff
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Random feature
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Team feature
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Stuff for developers
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Another one
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Last time
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Resources</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Resource
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Resource name
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Another resource
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Final resource
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>About</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="text-muted" href="#">
                    Team
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Locations
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </StyledLandingPage>
  );
}

export default LandingPage;
