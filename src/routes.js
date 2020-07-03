import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Agenda from './pages/Agenda/Agenda.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import Login from './pages/Login/Login.page';
import Register from './pages/Register/Register.page';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/agenda" component={Agenda} />
      </Switch>
    </BrowserRouter>
  );
}
