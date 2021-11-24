import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Wrapper from '../../../../components/wrapper'
import '../projetos.scss';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as yup from 'yup';
import api from '../../../../api';
import { Formik } from 'formik';
import Select, { Option, ReactSelectProps } from 'react-select'

library.add(faPlus);

function EditarProjeto(referencia) {

    const [spinner, setSpinner] = useState(false);
    const [projeto, setProjeto] = useState({
        nome: '',
        cliente: '',
        data_previsao_entrega: '',
        segmento: {}
    });

    const [showModal, setShowModal] = useState(false);
    const [segmentos, setSegmentos] = useState([]);
    const [textModal, setTextModal] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const handleCloseModal = () => setShowModal(false);

    const dateValidation = new Date();
    dateValidation.setHours(0, 0, 0);

    const schema = yup.object({
        nome: yup.string().required().min(3),
        segmento: yup.string().required().ensure(),
        data_previsao_entrega: yup.date().required().min(dateValidation, 'A data deve estar no futruro.')
    });

    useEffect(() => {
        setSpinner(true);

        async function CarregarProjeto(id) {
            await api.get('v1/api/projects/' + id)
                .then(response => {
                    setProjeto(response.data);
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        async function ListarStatus() {
            await api.get('v1/api/segments')
                .then(response => {
                    let options = response.data.map((s) => {
                        return {
                            label: s.nome,
                            value: s.codigo
                        }
                    });
                    setSegmentos(options);
                    setSpinner(false);
                    CarregarProjeto(referencia.id);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        ListarStatus();
    }, [projeto.segmento.codigo]);

    async function AtualizarProjeto(values, { resetForm }) {

        setSpinner(true);

        await api.put('v1/api/projects', values)
            .then(response => {
                setSpinner(false);
                setTitleModal('Sucesso!');
                setTextModal('O projeto foi atualizado com sucesso!');
                setShowModal(true);
            })
            .catch(error => {
                setSpinner(false);
                setTitleModal('Ops!');
                setTextModal('Ocorreu um erro:' + error);
                setShowModal(true);
                console.error(error);
            });
    }

    return (
        <>
            <div className="container-spinner" hidden={!spinner}>
                <Spinner
                    id="custom-spinner"
                    style={{ 'position': 'absolute', 'top': '50%', 'left': '50%' }}
                    animation="border"
                    role="status" />
            </div>

            <Header />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Atualizar Projeto</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="card-fox">
                                <Formik
                                    enableReinitialize
                                    onSubmit={async (values, { resetForm }) => AtualizarProjeto(values, { resetForm })}
                                    initialValues={{
                                        id: projeto.id || '',
                                        nome: projeto.nome || '',
                                        data_previsao_entrega: projeto.data_previsao_entrega || '',
                                        segmento: segmentos[projeto.segmento.codigo]
                                    }} validationSchema={schema}>
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        touched,
                                        errors
                                    }) => (
                                        <Form onSubmit={handleSubmit} noValidate>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="nome"
                                                        type="text"
                                                        placeholder="Nome do Projeto"
                                                        autoComplete="off"
                                                        value={values.nome}
                                                        onChange={handleChange}
                                                        isValid={touched.nome && !errors.nome}
                                                        isInvalid={touched.nome && !!errors.nome} />
                                                </Col>
                                                <Col md={6}>
                                                    {
                                                        projeto.segmento.codigo && <Select
                                                            name="segmento"
                                                            className="form-control select2-basic-icon"
                                                            placeholder={'Selecione um segmento'}
                                                            onChange={selectedOption => {
                                                                handleChange({ target: { name: 'segmento', value: selectedOption.value } })
                                                            }}
                                                            onBlur={selectedOption => {
                                                                handleBlur({ target: { name: 'segmento', value: selectedOption.value } });
                                                            }}
                                                            options={segmentos}
                                                            defaultValue={segmentos[segmentos.findIndex(x => x.value === projeto.segmento.codigo)]}
                                                            isValid={touched.segmento && !errors.segmento}
                                                            isInvalid={touched.segmento && !!errors.segmento}
                                                            className={touched.segmento && !!errors.segmento && 'select-error'} />
                                                    }
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="data_previsao_entrega"
                                                        type="date"
                                                        placeholder="Data de Previsão de Entrega"
                                                        autoComplete="off"
                                                        value={values.data_previsao_entrega}
                                                        onChange={handleChange}
                                                        isValid={touched.data_previsao_entrega && !errors.data_previsao_entrega}
                                                        isInvalid={touched.data_previsao_entrega && !!errors.data_previsao_entrega} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        hidden={true}
                                                        name="id"
                                                        type="text"
                                                        value={values.id}
                                                        onChange={handleChange}
                                                        isValid={touched.id && !errors.id}
                                                        isInvalid={touched.id && !!errors.id} />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={12}>
                                                    <Button type="submit" className="float-end">Atualizar</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{titleModal}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{textModal}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </Wrapper>
            <Footer />
        </>
    )
}

export default EditarProjeto