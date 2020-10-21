import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Agenda from './pages/Agenda/Agenda.page';
import Appointment from './pages/Appointment/Appointment.page';
import Cid from './pages/Cid/Cid.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import Doctors from './pages/Doctors/Doctors.page';
import DoctorProfile from './pages/EmployeeProfile/DoctorProfile.page';
import Employees from './pages/Employees/Employees.page';
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile.page';
import Establishment from './pages/Establishment/Establishment.page';
import EditEstablishment from './pages/Establishment/EditEstablishment.page';
import EstablishmentList from './pages/Establishment/EstablishmentList.page';
import Expenses from './pages/Expenses/Expenses.page';
import LandingPage from './pages/LandingPage/LandingPage.page';
import Login from './pages/Login/Login.page';
import Profile from './pages/Profile/Profile.page';
import Patients from './pages/Patients/Patients.page';
import Register from './pages/Register/Register.page';
import RegisterEmployee from './pages/Register/RegisterEmployee.page';
import RegisterEstablishment from './pages/Register/RegisterEstablishment.page';
import RegisterPatient from './pages/Register/RegisterPatient.page';
import RequestSchedule from './pages/RequestSchedule/RequestSchedule.page';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/agenda" component={Agenda} />
        <Route path="/cadastro" component={Register} />
        <Route path="/cadastro-funcionario" component={RegisterEmployee} />
        <Route path="/cadastro-paciente" component={RegisterPatient} />
        <Route
          path="/cadastro-estabelecimento"
          component={RegisterEstablishment}
        />
        <Route path="/cid" component={Cid} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/despesas" component={Expenses} />
        <Route path="/estabelecimentos" component={EstablishmentList} />
        <Route path="/estabelecimento/:id" component={EditEstablishment} />
        <Route path="/funcionarios" component={Employees} />
        <Route path="/funcionario/:id" component={EmployeeProfile} />
        <Route path="/login" exact component={Login} />
        <Route path="/mapa" component={Establishment} />
        <Route path="/medicos" component={Doctors} />
        <Route path="/medico/:id" component={DoctorProfile} />
        <Route path="/meu-perfil" component={Profile} />
        <Route path="/minhas-consultas" component={Appointment} />
        <Route path="/pacientes" component={Patients} />
        <Route path="/requisicoes-consultas" component={RequestSchedule} />
      </Switch>
    </BrowserRouter>
  );
}
