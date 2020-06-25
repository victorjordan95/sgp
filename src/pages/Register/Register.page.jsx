import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';

import LabelStyled from '../../styles/LabelForm';

import api from '../../services/api';

import BgImg from '../../assets/img/background-register.png';

const RegisterContainer = styled.main`
  background-image: url(${BgImg});
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  min-height: 100vh;
  padding: 48px 0;

  form {
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.11) 1px 1px 8px 1px;
    border-radius: 4px;
    padding: 24px 32px;

    h1 {
      font-size: 2rem;
    }
  }
`;

const RegisterFooter = styled(Form.Row)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 48px 0 24px;
`;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [cpf, setCPF] = useState('');
  const [rg, setRG] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState({ label: '', value: '' });

  const states = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {
      name,
      email,
      password_hash: password,
      phone,
      cellphone,
      cpf,
      rg,
      street,
      number,
      complement,
      city,
      state: state.value,
      country: 'BR',
    };
    console.log(user);
    // const result = await api.post('/users', user);
    // console.log(result);
  };

  return (
    <RegisterContainer>
      <Container>
        <Row>
          <Col xs={12} md={{ offset: 2, span: 8 }}>
            <Form onSubmit={handleSubmit}>
              <h1>Crie sua conta</h1>
              <hr />
              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Nome completo</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu nome"
                    name="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicEmail">
                  <LabelStyled>Endereço de e-mail</LabelStyled>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu e-mail"
                    name="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Senha</LabelStyled>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    name="password_hash"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Confirme sua senha</LabelStyled>
                  <Form.Control
                    type="password"
                    placeholder="Confirmação de senha"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Telefone</LabelStyled>
                  <InputMask
                    mask="(99) 9999-9999"
                    className="form-control"
                    type="text"
                    placeholder="Digite seu telefone"
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Celular</LabelStyled>
                  <InputMask
                    mask="(99) 99999-9999"
                    className="form-control"
                    type="text"
                    placeholder="Digite seu celular"
                    name="cellphone"
                    value={cellphone}
                    onChange={e => setCellphone(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>CPF</LabelStyled>
                  <InputMask
                    mask="999.999.999-99"
                    className="form-control"
                    type="text"
                    placeholder="Digite seu CPF"
                    name="cpf"
                    required
                    value={cpf}
                    onChange={e => setCPF(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>RG</LabelStyled>
                  <InputMask
                    mask="99.999.999-9"
                    className="form-control"
                    type="text"
                    placeholder="Digite seu RG"
                    name="rg"
                    required
                    value={rg}
                    onChange={e => setRG(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Rua</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite sua rua"
                    name="street"
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Número</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite o número"
                    name="number"
                    required
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Complemento</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite o complemento"
                    name="complement"
                    value={complement}
                    onChange={e => setComplement(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Cidade</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite sua cidade"
                    name="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Estado</LabelStyled>
                  <Select
                    options={states}
                    value={state}
                    onChange={e => setState(e)}
                    placeholder="Selecione seu estado"
                  />
                </Form.Group>
              </Form.Row>

              <RegisterFooter>
                <Link to="/">Retornar para login</Link>
                <Button variant="primary" type="submit">
                  Cadastrar
                </Button>
              </RegisterFooter>
            </Form>
          </Col>
        </Row>
      </Container>
    </RegisterContainer>
  );
}

export default Register;
