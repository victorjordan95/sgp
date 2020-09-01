import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import userContext from '../../store/UserContext';
import api from '../../services/api';
import authToken from '../../utils/authToken';
import { removeSpecial } from '../../utils/removeSpecialCharacters';

import AvatarPicture from '../../components/AvatarPicture';
import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import stateValues from '../../utils/brStatesValues';
import Roles from '../../enums/Roles.enum';
import medicineCategoriesValues from '../../utils/medicineCategoriesValues';
import professionalCoucil from '../../utils/professionalCoucil';
import fetchZipCode from '../../utils/fetchZipCode';

import LabelStyled from '../../styles/LabelForm';
import StyledTimepicker from '../../styles/StyledTimepicker';
import StyledSelect from '../../styles/StyledSelect';

const ChangeFormRow = styled(Form.Row)`
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: 24px auto 0;
  max-width: 500px;
  text-align: center;
`;

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: 'meu-perfil', name: 'Meu Perfil' },
];

function Profile() {
  const currentlyUser = useContext(userContext);
  const userRole = currentlyUser?.user?.Role?.role;

  const [formValues, setFormValues] = useState({});
  const [locale, setLocale] = useState({});
  const [profilePhoto, setProfilePhoto] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldDisabled, setDisabled] = useState(true);

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
    }

    if (!zip.logradouro || !zip.bairro) {
      setDisabled(false);
    }
  };

  const handleProfile = e => {
    setProfilePhoto(e.target.files[0]);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setNewPicture(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    let profilePicture;
    if (profilePhoto) {
      const data = new FormData();
      data.append('file', profilePhoto);

      if (currentlyUser?.user?.avatar?.id) {
        data.append('id', currentlyUser.user.avatar.id);
        profilePicture = await api.put('/files', data, authToken());
        await api.put(
          '/users',
          { avatar_id: profilePicture.data.id },
          authToken()
        );
      } else {
        profilePicture = await api.post('/files', data, authToken());
        await api.put(
          '/users',
          { avatar_id: profilePicture.data.id },
          authToken()
        );
      }
      setLoading(false);
    }

    const user = {
      ...formValues,
    };

    if (formValues?.state?.[0]?.value) {
      user.state = formValues?.state[0].value;
    }
    if (formValues?.geometry) {
      user.geometry = locale?.location?.coordinates;
    }
    if (formValues?.professional_coucil) {
      user.professional_coucil = formValues?.professional_coucil?.value;
    }
    if (formValues?.categories) {
      user.categories = formValues?.categories?.map(el => el.value);
    }
    console.log(user);
    try {
      await api.put('/users', user, authToken());
      toast.success('Perfil salvo com sucesso!');
      setLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

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
              <h2>Meu perfil</h2>
            </Col>

            {currentlyUser?.user?.Contact && (
              <Col xs={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <AvatarPicture
                      path={newPicture || currentlyUser?.user?.avatar?.url}
                      size="medium"
                      description="teste"
                    />
                  </Form.Row>
                  <ChangeFormRow>
                    <Form.Group as={Col}>
                      <Form.Label>Alterar foto de perfil</Form.Label>
                      <Form.Control
                        type="file"
                        name="profile"
                        accept="image/*"
                        onChange={e => handleProfile(e)}
                      />
                    </Form.Group>
                  </ChangeFormRow>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Nome completo</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite seu nome"
                        name="name"
                        value={formValues?.name || currentlyUser?.user?.name}
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
                        value={formValues?.email || currentlyUser?.user?.email}
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
                      <LabelStyled>Senha</LabelStyled>
                      <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        name="password_hash"
                        value={
                          formValues?.password || currentlyUser?.user?.password
                        }
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
                        value={formValues?.password || ''}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            password: e.target.value,
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
                        value={
                          formValues?.phone ||
                          currentlyUser?.user?.Contact?.phone ||
                          ''
                        }
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
                        value={
                          formValues?.cellphone ||
                          currentlyUser?.user?.Contact?.cellphone ||
                          ''
                        }
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            cellphone: removeSpecial(e.target.value),
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
                        value={`${formValues?.cpf} || ${currentlyUser?.user?.cpf}  || ''`}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            cpf: removeSpecial(e.target.value),
                          })
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
                        value={formValues?.rg || currentlyUser?.user?.rg || ''}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            rg: removeSpecial(e.target.value),
                          })
                        }
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} xs={12} md={4}>
                      <LabelStyled>CEP</LabelStyled>
                      <InputMask
                        mask="99999-999"
                        className="form-control"
                        type="text"
                        placeholder="Digite seu CEP"
                        name="zipcode"
                        required
                        value={
                          formValues?.zipcode ||
                          currentlyUser?.user?.address_pk?.zipcode?.toString() ||
                          ''
                        }
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            zipcode: removeSpecial(e.target.value),
                          })
                        }
                        onBlur={fetchZipcode}
                      />
                    </Form.Group>

                    <Form.Group as={Col} xs={6} md={4}>
                      <LabelStyled>Logradouro</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite seu logradouro"
                        disabled={fieldDisabled}
                        name="street"
                        required
                        value={
                          formValues?.street ||
                          currentlyUser?.user?.address_pk?.street
                        }
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            street: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} xs={6} md={4}>
                      <LabelStyled>Número</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite o número"
                        name="number"
                        required
                        value={
                          formValues?.number ||
                          currentlyUser?.user?.address_pk?.number
                        }
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
                        placeholder="Digite o complemento"
                        maxLength="80"
                        name="complement"
                        value={
                          formValues?.complement ||
                          currentlyUser?.user?.address_pk?.complement ||
                          ''
                        }
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
                        disabled={fieldDisabled}
                        name="neighborhood"
                        value={
                          formValues?.neighborhood ||
                          currentlyUser?.user?.address_pk?.neighborhood
                        }
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
                        value={
                          formValues?.city ||
                          currentlyUser?.user?.address_pk?.city
                        }
                        onChange={e =>
                          setFormValues({ ...formValues, city: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <LabelStyled>Estado</LabelStyled>
                      <Select
                        options={stateValues}
                        value={
                          formValues?.state ||
                          stateValues.filter(
                            state =>
                              state.value ===
                              currentlyUser?.user?.address_pk?.state
                          )
                        }
                        onChange={e =>
                          setFormValues({ ...formValues, state: e })
                        }
                        placeholder="Selecione seu estado"
                      />
                    </Form.Group>
                  </Form.Row>

                  {userRole === Roles.DOCTOR && (
                    <>
                      <h3 className="mt-4">Informações médicas</h3>
                      <hr />
                      <Form.Row>
                        <Form.Group as={Col}>
                          <LabelStyled>Categoria especializada</LabelStyled>
                          <StyledSelect
                            options={medicineCategoriesValues}
                            isMulti
                            value={
                              currentlyUser?.user?.doctor_info?.categories ||
                              formValues?.categories
                            }
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
                            value={
                              formValues?.professional_coucil ||
                              currentlyUser?.user?.doctor_info
                                ?.ProfessionalCoucil
                            }
                            onChange={e =>
                              setFormValues({
                                ...formValues,
                                professional_coucil: e,
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
                            name="coucil_number"
                            value={
                              formValues?.coucil_number ||
                              currentlyUser?.user?.doctor_info?.coucil_number
                            }
                            onChange={e =>
                              setFormValues({
                                ...formValues,
                                coucil_number: e.target.value,
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
                              setFormValues({ ...formValues, start_hour: e })
                            }
                            value={
                              formValues?.start_hour ||
                              currentlyUser?.user?.doctor_info?.start_hour
                            }
                          />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={4}>
                          <LabelStyled>Hora término trabalho</LabelStyled>
                          <StyledTimepicker
                            locale="sv-sv"
                            className="form-control"
                            onChange={e =>
                              setFormValues({ ...formValues, end_hour: e })
                            }
                            value={
                              formValues?.end_hour ||
                              currentlyUser?.user?.doctor_info?.end_hour
                            }
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
                                time_appointment: e,
                              })
                            }
                            value={
                              formValues?.time_appointment ||
                              currentlyUser?.user?.doctor_info?.time_appointment
                            }
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

export default Profile;
