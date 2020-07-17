import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Agenda from './pages/Agenda/Agenda.page';
import Appointment from './pages/Appointment/Appointment.page';
import Cid from './pages/Cid/Cid.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import Doctors from './pages/Doctors/Doctors.page';
import Employees from './pages/Employees/Employees.page';
import Login from './pages/Login/Login.page';
import Profile from './pages/Profile/Profile.page';
import Patients from './pages/Patients/Patients.page';
import Register from './pages/Register/Register.page';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/agenda" component={Agenda} />
        <Route path="/cadastro" component={Register} />
        <Route path="/cid" component={Cid} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/funcionarios" component={Employees} />
        <Route path="/login" exact component={Login} />
        <Route path="/medicos" component={Doctors} />
        <Route path="/meu-perfil" component={Profile} />
        <Route path="/minhas-consultas" component={Appointment} />
        <Route path="/pacientes" component={Patients} />
      </Switch>
    </BrowserRouter>
  );
}
