import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
                <h5 className="title text-center">Features</h5>
                <div className="space-10 text-center" />
                <h3>Pwoerful Features As Always</h3>
                <div className="space-60" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <i className="lnr lnr-rocket" />
                </div>
                <h4>Fast &amp; Powerful</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.4s">
                <div className="box-icon">
                  <i className="lnr lnr-paperclip" />
                </div>
                <h4>Easily Editable</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.6s">
                <div className="box-icon">
                  <i className="lnr lnr-cloud-download" />
                </div>
                <h4>Cloud Storage</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
                  <i className="lnr lnr-clock" />
                </div>
                <h4>Easy Notifications</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.4s">
                <div className="box-icon">
                  <i className="lnr lnr-laptop-phone" />
                </div>
                <h4>Fully Responsive</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60" />
              <div className="service-box wow fadeInUp" data-wow-delay="0.6s">
                <div className="box-icon">
                  <i className="lnr lnr-cog" />
                </div>
                <h4>Editable Layout</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding price-area" id="price_page">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 offset-md-2 col-md-8">
              <h1 className="display-4 text-center">Pricing</h1>
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
