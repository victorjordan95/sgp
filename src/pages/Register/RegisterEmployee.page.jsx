import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import { removeSpecial } from '../../utils/removeSpecialCharacters';
import userContext from '../../store/UserContext';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import stateValues from '../../utils/brStatesValues';
import rolesValues from '../../utils/rolesValues';

import LabelStyled from '../../styles/LabelForm';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: '/funcionarios', name: 'Funcionários' },
  { path: '', name: 'Cadastrar funcionário' },
];

const fillEstablishments = list => {
  const establishmentsList = [];
  list.forEach(estab => {
    establishmentsList.push({ label: estab.name, value: estab.id });
  });
  return establishmentsList;
};

function RegisterEmployee() {
  const currentlyUser = useContext(userContext);

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [establishments, setEstablishments] = useState([]);

  const DEFAULT_PASSWORD = 'newuser123';

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    const user = {
      name: formValues.name,
      email: formValues.email,
      phone: removeSpecial(formValues.phone),
      cellphone: removeSpecial(formValues.cellphone),
      password: DEFAULT_PASSWORD,
      cpf: removeSpecial(formValues.cpf),
      rg: removeSpecial(formValues.rg),
      street: formValues.street,
      number: formValues.number,
      complement: formValues.complement,
      city: formValues.city,
      state: formValues?.state?.value,
      role: [formValues?.role?.id],
      establishments: [formValues?.establishment?.value],
      country: 'BR',
    };
    console.log(user);
    try {
      await api.post(`/users`, user, authToken());
      toast.success('Perfil salvo com sucesso!');
      setLoading(false);
      setFormValues({});
    } catch (err) {
      toast.error(err?.response?.data?.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const estabs =
      currentlyUser?.user?.establishments &&
      fillEstablishments(currentlyUser?.user?.establishments);
    setEstablishments(estabs);
  }, [currentlyUser]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <main>
        <Container>
          <Row>
            <Breadcrumb siteMap={siteMap} />
            <Col xs={12}>
              <h2>{formValues.name}</h2>
            </Col>

            {formValues && (
              <Col xs={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Nome completo</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite seu nome"
                        name="name"
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
                        value={formValues?.email || ''}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            email: e.target.value,
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
                          setFormValues({
                            ...formValues,
                            phone: e.target.value,
                          })
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
                        value={formValues?.rg || ''}
                        onChange={e =>
                          setFormValues({ ...formValues, rg: e.target.value })
                        }
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
                        value={formValues?.street || ''}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            street: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <LabelStyled>Número</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite o número"
                        name="number"
                        value={formValues?.number || ''}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            number: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

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
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Cidade</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite sua cidade"
                        name="city"
                        value={formValues?.city || ''}
                        onChange={e =>
                          setFormValues({ ...formValues, city: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <LabelStyled>Estado</LabelStyled>
                      <Select
                        options={stateValues}
                        value={formValues?.state}
                        onChange={e =>
                          setFormValues({ ...formValues, state: e })
                        }
                        placeholder="Selecione seu estado"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Tipo de usuário</LabelStyled>
                      <Select
                        options={rolesValues}
                        value={formValues?.role}
                        onChange={e =>
                          setFormValues({ ...formValues, role: e })
                        }
                        placeholder="Selecione o tipo de usuário"
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <LabelStyled>Estabelecimento</LabelStyled>
                      <Select
                        options={establishments}
                        value={formValues?.establishment}
                        onChange={e =>
                          setFormValues({ ...formValues, establishment: e })
                        }
                        placeholder="Selecione o estabelecimento"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row className="d-flex flex-row justify-content-end my-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="d-flex align-items-center"
                    >
                      <FiSave size={16} />
                      <span className="ml-2">Salvar</span>
                    </Button>
                  </Form.Row>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </main>
    </>
  );
}

export default RegisterEmployee;
