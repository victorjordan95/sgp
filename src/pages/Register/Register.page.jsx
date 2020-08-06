import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import Loader from '../../components/Loader';

import api from '../../services/api';

import stateValues from '../../utils/brStatesValues';
import { removeSpecial } from '../../utils/removeSpecialCharacters';
import fetchZipCode from '../../utils/fetchZipCode';

import LabelStyled from '../../styles/LabelForm';

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

function Register(props) {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [fieldDisabled, setDisabled] = useState(true);

  const fetchZipcode = async () => {
    const zip = await fetchZipCode(formValues.zipcode);
    if (zip) {
      setFormValues({
        ...formValues,
        ...zip,
      });
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const user = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      phone: removeSpecial(formValues.phone),
      cellphone: removeSpecial(formValues.cellphone),
      cpf: removeSpecial(formValues.cpf),
      rg: removeSpecial(formValues.rg),
      street: formValues.street,
      number: formValues.number,
      complement: formValues.complement,
      city: formValues.city,
      state: formValues.state.value,
      country: 'BR',
      role: 4,
    };

    try {
      await api.post('/users', user);
      toast.success('Usuário criado com sucesso!');
      props.history.push('/');
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
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
                    value={formValues?.name || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Endereço de e-mail</LabelStyled>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu e-mail"
                    name="email"
                    required
                    value={formValues?.email || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Senha</LabelStyled>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    name="password"
                    required
                    value={formValues?.password || ''}
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Confirme sua senha</LabelStyled>
                  <Form.Control
                    type="password"
                    placeholder="Confirmação de senha"
                    required
                    value={formValues?.passwordConfirm || ''}
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        passwordConfirm: e.target.value,
                      })
                    }
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
                    value={formValues?.phone || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, phone: e.target.value })
                    }
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
                    value={formValues?.cellphone || ''}
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        cellphone: e.target.value,
                      })
                    }
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
                    value={formValues?.cpf || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, cpf: e.target.value })
                    }
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
                    value={formValues?.rg || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, rg: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>CEP</LabelStyled>
                  <InputMask
                    mask="99999-999"
                    className="form-control"
                    type="text"
                    placeholder="Digite seu CEP"
                    name="zipcode"
                    required
                    value={formValues?.zipcode || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, zipcode: e.target.value })
                    }
                    onBlur={fetchZipcode}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Logradouro</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu logradouro"
                    name="street"
                    required
                    disabled={fieldDisabled}
                    value={formValues?.street || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, street: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Número</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite o número"
                    name="number"
                    required
                    value={formValues?.number || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, number: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <LabelStyled>Complemento</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite o complemento"
                    name="complement"
                    value={formValues?.complement || ''}
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        complement: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Bairro</LabelStyled>
                  <Form.Control
                    type="text"
                    placeholder="Digite o bairro"
                    name="neighborhood"
                    disabled={fieldDisabled}
                    value={formValues?.neighborhood || ''}
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        neighborhood: e.target.value,
                      })
                    }
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
                    disabled={fieldDisabled}
                    value={formValues?.city || ''}
                    onChange={e =>
                      setFormValues({ ...formValues, city: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <LabelStyled>Estado</LabelStyled>
                  <Select
                    disabled={fieldDisabled}
                    options={stateValues}
                    value={formValues?.state}
                    onChange={e => setFormValues({ ...formValues, state: e })}
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
