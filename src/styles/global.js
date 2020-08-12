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
    color: #fff;
    background-color: #009688;
    border-color: #009688;
    height: 40px;
    &:hover {
      background-color: #00897b;
      border-color: #00897b;
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
