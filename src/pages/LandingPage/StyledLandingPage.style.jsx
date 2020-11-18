import styled from 'styled-components';
import featureBg from '../../assets/img/feature-bg.png';

export const StyledLandingPage = styled.div`
  .header-nav {
    background: linear-gradient(
      45deg,
      rgb(0 150 136) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    border-bottom: 1px solid transparent !important;
    color: #fff;

    nav {
      a {
        color: #fff;
      }
    }
    .btn.btn-outline-primary {
      color: #ffffff;
      border-color: #009688;
      background: #009688;
    }
  }

  .header-text {
    h1,
    div {
      bottom: 150px;
      position: relative;
    }
  }

  .home-area {
    background: url('../../assets/img/header-bg.jpg') no-repeat scroll center;
    color: #ffffff;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    min-height: 80vh;
    width: 100%;
  }

  .overlay:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(72, 44, 191);
    background: linear-gradient(
      45deg,
      rgb(0 150 136) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#482cbf', endColorstr='#6ac6f0', GradientType=1);
    opacity: 0.8;
    z-index: -2;
  }

  .price-box {
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    color: #8790af;
    -webkit-box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.1);
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
  }

  .price-box:hover {
    -webkit-box-shadow: 0 0 50px -15px #4d43c6;
    box-shadow: 0 0 50px -15px #4d43c6;
  }

  .price-box .price-header {
    background-color: #f2f3fc;
    padding: 40px;
    color: #768ede;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#482cbf+0,6ac6f0+100 */
    background: rgb(72, 44, 191);
    /* Old browsers */
    /* FF3.6-15 */
    background: -webkit-linear-gradient(
      45deg,
      rgba(72, 44, 191, 1) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    /* Chrome10-25,Safari5.1-6 */
    background: -o-linear-gradient(
      45deg,
      rgba(72, 44, 191, 1) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    background: linear-gradient(
      45deg,
      rgba(72, 44, 191, 1) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#482cbf', endColorstr='#6ac6f0', GradientType=1);
    position: relative;
    overflow: hidden;
    z-index: 2;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
  }

  .price-box .price-header:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f3fc;
    z-index: -1;
    opacity: 1;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
  }

  .price-box:hover .price-header {
    color: #ffffff;
  }

  .price-box:hover .price-header:before {
    opacity: 0;
  }

  .price-box .price-header .price-icon {
    font-size: 60px;
    margin-bottom: 10px;
  }

  .price-box .price-header h4 {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 3px;
  }

  .price-box .price-body {
    padding: 40px;
  }

  .price-box .price-body ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .price-box .price-rate {
    color: #768ede;
    margin-bottom: 40px;
    font-size: 20px;
  }

  .price-box .price-rate sup {
    top: -20px;
    font-size: 26px;
  }

  .price-box .price-rate .rate {
    font-size: 56px;
  }

  .price-box .price-footer {
    margin-bottom: 40px;
  }

  .price-box .price-footer .bttn-white {
    padding: 13px 50px;
  }

  .price-box .price-footer .bttn-white:before {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 100px;
    left: 2px;
    top: 2px;
  }

  .feature-area {
    color: #ffffff;
    background-color: #5e88fc;
    background-image: url(${featureBg});
    background-position: bottom -120px center;
    background-repeat: no-repeat;
    background-size: auto 94%;
    margin-bottom: 142px;
  }

  .feature-area .page-title .title {
    color: #ffffff;
  }

  .feature-area .mobile-image {
    margin-bottom: -142px;

    img {
      width: 100%;
    }
  }

  .service-box {
    position: relative;
    padding-left: 100px;
  }

  .team-slide .owl-controls .owl-nav > div,
  .service-box .box-icon {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 72px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#482cbf+0,6ac6f0+100 */
    background: rgb(72, 44, 191);
    /* Old browsers */
    /* FF3.6-15 */
    background: -webkit-linear-gradient(
      45deg,
      rgba(72, 44, 191, 1) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    /* Chrome10-25,Safari5.1-6 */
    background: -o-linear-gradient(
      45deg,
      rgba(72, 44, 191, 1) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    background: linear-gradient(
      45deg,
      rgba(72, 44, 191, 1) 0%,
      rgba(106, 198, 240, 1) 100%
    );
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#482cbf', endColorstr='#6ac6f0', GradientType=1);
    overflow: hidden;
    z-index: 1;
    color: #5e88fc;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    -webkit-box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
  }

  .team-slide .owl-controls .owl-nav > div:hover,
  .service-box:hover .box-icon {
    color: #ffffff;
  }

  .team-slide .owl-controls .owl-nav > div:before,
  .service-box .box-icon:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: -1;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    opacity: 1;
  }

  .team-slide .owl-controls .owl-nav > div:hover:before,
  .service-box:hover .box-icon:before {
    opacity: 0;
  }

  .service-box h4 {
    margin-bottom: 10px;
  }

  .page-title .title {
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #8790af;
    font-weight: 600;
  }

  .text-center.page-title .title:before,
  .page-title .title:after {
    content: '';
    width: 50px;
    height: 1px;
    display: inline-block;
    background-color: #e1e1e1;
    margin: 0 15px;
    -webkit-transform: translateY(-4px);
    -ms-transform: translateY(-4px);
    transform: translateY(-4px);
  }

  .home-area .mobile-image {
    margin-right: 0;
    margin-left: 0;

    img {
      width: 80%;
    }
  }
  .section-padding-top {
    padding-top: 120px;
  }

  .mb-40 {
    margin-bottom: 40px;
  }

  .space-60 {
    margin: 60px 0;
  }
`;
