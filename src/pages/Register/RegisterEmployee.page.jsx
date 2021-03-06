import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import { removeSpecial } from '../../utils/removeSpecialCharacters';
import fetchZipCode from '../../utils/fetchZipCode';

import userContext from '../../store/UserContext';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import stateValues from '../../utils/brStatesValues';
import rolesValues from '../../utils/rolesValues';
import Roles from '../../enums/Roles.enum';
import medicineCategoriesValues from '../../utils/medicineCategoriesValues';
import professionalCoucil from '../../utils/professionalCoucil';

import LabelStyled from '../../styles/LabelForm';
import StyledTimepicker from '../../styles/StyledTimepicker';
import StyledSelect from '../../styles/StyledSelect';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: '/funcionarios', name: 'Funcionários' },
  { path: '', name: 'Cadastrar funcionário' },
];

function RegisterEmployee() {
  const currentlyUser = useContext(userContext);
  const userRole = currentlyUser?.user?.Role?.role;
  const history = useHistory();

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState({});
  const [establishments, setEstablishments] = useState([]);
  const [fieldDisabled, setDisabled] = useState(true);

  const DEFAULT_PASSWORD = 'newuser123';

  const fetchZipcode = async () => {
    let zip;
    try {
      zip = await fetchZipCode(formValues.zipcode);
      const userLocale = await api.get(
        `/city?cityName=${zip.city}&stateName=${zip.state}`
      );
      setLocale(userLocale.data[0]);
    } catch (error) {
      toast.error(error);
    }

    if (zip) {
      setFormValues({
        ...formValues,
        ...zip,
        geometry: locale?.location?.coordinates,
      });
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    const user = {
      ...formValues,
      zipcode: formValues?.zip,
      phone: removeSpecial(formValues.phone),
      cellphone: removeSpecial(formValues.cellphone),
      password: DEFAULT_PASSWORD,
      cpf: removeSpecial(formValues.cpf),
      rg: removeSpecial(formValues.rg),
      state: formValues?.state[0].value,
      role: formValues?.role?.id,
      geometry: locale?.location?.coordinates,
      establishments: [formValues?.establishment?.value],
      country: 'BR',
    };
    try {
      await api.post(`/users`, user, authToken());
      toast.success('Perfil salvo com sucesso!');
      setLoading(false);
      setFormValues({});
      history.push(`/funcionarios`);
    } catch (err) {
      toast.error(err?.response?.data?.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setEstablishments(currentlyUser?.user?.establishments);
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
                        mask="(99)9999-9999"
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
                        mask="(99)99999-9999"
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
                          setFormValues({
                            ...formValues,
                            zipcode: e.target.value,
                          })
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
                        disabled={fieldDisabled}
                        required
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
                        required
                        value={formValues?.number || ''}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            number: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Complemento</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite o complemento" maxLength="80"
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
                        disabled={fieldDisabled}
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
                        disabled={fieldDisabled}
                        onChange={e =>
                          setFormValues({ ...formValues, state: e })
                        }
                        placeholder="Selecione seu estado"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} xs={12} md={6}>
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
                    <Form.Group as={Col} xs={12} md={6}>
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
                  {formValues?.role?.id === Roles.DOCTOR && (
                    <>
                      <h3 className="mt-4">Informações médicas</h3>
                      <hr />
                      <Form.Row>
                        <Form.Group as={Col}>
                          <LabelStyled>Categoria especializada</LabelStyled>
                          <StyledSelect
                            options={medicineCategoriesValues}
                            isMulti
                            value={formValues?.categories}
                            onChange={e =>
                              setFormValues({ ...formValues, categories: e })
                            }
                            placeholder="Selecione a categoria da clínica"
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} xs={12} md={6}>
                          <LabelStyled>Conselho profissional</LabelStyled>
                          <StyledSelect
                            options={professionalCoucil}
                            value={formValues?.professionalCoucil}
                            onChange={e =>
                              setFormValues({
                                ...formValues,
                                professionalCoucil: e,
                              })
                            }
                            placeholder="Selecione o conselho"
                          />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6}>
                          <LabelStyled>
                            Número conselho profissional
                          </LabelStyled>
                          <Form.Control
                            type="text"
                            placeholder="Digite o número do seu conselho"
                            name="coucilNumber"
                            value={
                              formValues?.coucilNumber ||
                              currentlyUser?.user?.coucilNumber
                            }
                            onChange={e =>
                              setFormValues({
                                ...formValues,
                                coucilNumber: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} xs={12} md={4}>
                          <LabelStyled>Hora início trabalho</LabelStyled>
                          <StyledTimepicker
                            locale="sv-sv"
                            className="form-control"
                            onChange={e =>
                              setFormValues({ ...formValues, startHour: e })
                            }
                            value={formValues?.startHour}
                          />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={4}>
                          <LabelStyled>Hora término trabalho</LabelStyled>
                          <StyledTimepicker
                            locale="sv-sv"
                            className="form-control"
                            onChange={e =>
                              setFormValues({ ...formValues, endHour: e })
                            }
                            value={formValues?.endHour}
                          />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={4}>
                          <LabelStyled>Tempo de consulta</LabelStyled>
                          <StyledTimepicker
                            locale="sv-sv"
                            disableClock
                            className="form-control"
                            onChange={e =>
                              setFormValues({
                                ...formValues,
                                appointmentTime: e,
                              })
                            }
                            value={formValues?.appointmentTime}
                          />
                        </Form.Group>
                      </Form.Row>
                    </>
                  )}
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
