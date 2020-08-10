import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../services/api';
import authToken from '../../utils/authToken';
import { removeSpecial } from '../../utils/removeSpecialCharacters';
import userContext from '../../store/UserContext';
import fetchZipCode from '../../utils/fetchZipCode';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import stateValues from '../../utils/brStatesValues';
import medicineCategoriesValues from '../../utils/medicineCategoriesValues';

import LabelStyled from '../../styles/LabelForm';

const siteMap = [
  { path: 'dashboard', name: 'Início' },
  { path: '/estabelecimentos', name: 'Meus estabelecimentos' },
  { path: '', name: 'Cadastrar estabelecimento' },
];

function RegisterEstablishment() {
  const currentlyUser = useContext(userContext);

  const [formValues, setFormValues] = useState({});
  const [locale, setLocale] = useState({});
  const [loading, setLoading] = useState(false);
  const [fieldDisabled, setDisabled] = useState(true);

  const fetchZipcode = async () => {
    let zip;
    let userLocale;
    try {
      zip = await fetchZipCode(formValues.zipcode);
      userLocale = await api.get(
        `/city?cityName=${zip.city}&stateName=${zip.state[0].value}`
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

    const establishment = {
      ...formValues,
      name: formValues.name,
      phone: removeSpecial(formValues.phone),
      geometry: locale?.location?.coordinates,
      cellphone: removeSpecial(formValues.cellphone),
      cnpj: removeSpecial(formValues.cnpj),
      state: formValues?.state[0]?.value,
      categories: formValues.categories.map(el => el.value),
      country: 'BR',
    };
    try {
      const newEstab = await api.post(
        `/establishment`,
        establishment,
        authToken()
      );
      await api.put(
        `/users/${currentlyUser?.user?.id}`,
        {
          establishments: [
            ...currentlyUser?.user?.establishments.map(estab => estab.id),
            newEstab.data.id,
          ],
        },
        authToken()
      );
      toast.success('Perfil salvo com sucesso!');
      setLoading(false);
      setFormValues({});
    } catch (err) {
      toast.error(err?.response?.data?.error);
      setLoading(false);
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
              <h2>{formValues.name}</h2>
            </Col>

            {formValues && (
              <Col xs={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Nome</LabelStyled>
                      <Form.Control
                        type="text"
                        placeholder="Digite o nome"
                        name="name"
                        value={formValues?.name || ''}
                        onChange={e =>
                          setFormValues({ ...formValues, name: e.target.value })
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
                        placeholder="Digite o telefone"
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
                        placeholder="Digite o celular"
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
                      <LabelStyled>CNPJ</LabelStyled>
                      <InputMask
                        mask="99.999.999/9999-99"
                        className="form-control"
                        type="text"
                        placeholder="Digite o CNPJ"
                        name="cnpj"
                        value={formValues?.cnpj || ''}
                        onChange={e =>
                          setFormValues({ ...formValues, cnpj: e.target.value })
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
                        placeholder="Digite o logradouro"
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
                        placeholder="Digite a cidade"
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
                        placeholder="Selecione o estado"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <LabelStyled>Categoria da Clínica</LabelStyled>
                      <Select
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

export default RegisterEstablishment;
