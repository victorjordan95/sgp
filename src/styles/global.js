import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

  .title {
    font-family: 'Lato', sans-serif;
  }
  .btn-primary {
      color: #fff;
      background-color: #009688;
      border-color: #009688;
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
`;
