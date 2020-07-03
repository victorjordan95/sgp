import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import history from './services/history';
import api from './services/api';

import userContext from './store/UserContext';

import GlobalStyle from './styles/global';

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [contextValue, setContextValue] = useState({});

  const logout = () => {
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
    if (token) {
      try {
        (async function anyNameFunction() {
          const user = await api.post('/sessionToken', {
            session_token: token,
          });
          const userData = await api.get(`/users/${user.data.user.user_id}`);
          console.log(userData);
          handleUserContext(userData.data);
        })();
      } catch (err) {
        console.log(err);
        // toast.error(err?.response?.data?.error);
      }
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
