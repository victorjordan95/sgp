import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    font-family: 'Quicksand', sans-serif;
  }

  body {
    overflow-x: hidden;
  }

  /* .title {
    font-family: 'Lato', sans-serif;
  } */
  .btn-primary {
    align-items: center;
    background-color: #009688;
    border-color: #009688;
    display: flex;
    justify-content: center;
    color: #fff;
    height: 40px;
    &:hover {
      background-color: #00897b;
      border-color: #00897b;
    }

    &.btn-add {
      @media screen and (max-width: 1024px) {
        align-items: center;
        border-radius: 50%;
        bottom: 24px;
        box-shadow: 0 0 3px 1px #424242;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        height: 50px;
        position: fixed;
        right: 24px;
        text-align: center;
        width: 50px;
        z-index: 999;
        svg {
          margin-right: 0!important;
        }
        span {
          display:none;
        }
      }
    }
  }

  a {
    color: #004d40;
    &:hover {
      color: #004d40;
    }
  }

  h1 {
    font-size: 1.75rem;
    @media screen and (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }
`;
