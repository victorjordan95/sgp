import React, { useState, useEffect } from 'react';
import { Router, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import history from './services/history';
import api from './services/api';
import authToken from './utils/authToken';

import userContext from './store/UserContext';

import GlobalStyle from './styles/global';

function App(props) {
  const [loggedUser, setLoggedUser] = useState({});
  const [contextValue, setContextValue] = useState({});

  const logout = () => {
    localStorage.removeItem('sgp-token');
    localStorage.removeItem('userEstabs');
    setLoggedUser({});
  };

  const handleUserContext = user => {
    setLoggedUser(user);
  };

  useEffect(() => {
    setContextValue({
      user: loggedUser,
      logout,
      handleUserContext,
    });
  }, [loggedUser]);

  useEffect(() => {
    const token = localStorage.getItem('sgp-token');
    const location = window.location.pathname;

    if (token || location === '/login' || location === '/') {
      if (token) {
        try {
          (async function fetchUser() {
            const user = await api.post('/sessionToken', {
              session_token: token,
            });

            const userData = await api.get(
              `/users/${user.data.user.id}`,
              authToken()
            );
            const estabs = await api.get(
              `establishment?userId=${user.data.user.id}`,
              authToken()
            );

            localStorage.setItem(
              'userEstabs',
              estabs?.data?.rows?.map(estab => estab.id) || []
            );

            handleUserContext({
              ...userData.data,
              establishments: [...estabs.data.rows],
            });
          })();
        } catch (err) {
          console.log(err);
          window.location.href = '/login';
          // toast.error(err?.response?.data?.error);
        }
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <userContext.Provider value={contextValue}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </userContext.Provider>
  );
}

export default App;
