import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Wrapper from '../../../../components/wrapper'
import '../projetos.scss';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from '../../../../api';

library.add(faPlus);

function CadastrarProjeto() {

    const [spinner, setSpinner] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextModal] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const handleCloseModal = () => setShowModal(false);

    const dateValidation = new Date();
    dateValidation.setHours(0, 0, 0);

    const schema = yup.object({
        nome: yup.string().required().min(3),
        cliente: yup.string().required().min(3),
        data_previsao_entrega: yup.date().required().min(dateValidation, 'A data deve estar no futruro.')
    });

    async function NovoProjeto(values, { resetForm }) {

        setSpinner(true);

        await api.post('v1/api/projects', values)
            .then(response => {
                setTitleModal('Sucesso!');
                setTextModal('O projeto foi cadastrado com sucesso!');
                setShowModal(true);
                resetForm();
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
            <Header />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Novo Projeto</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div class="card-fox">
                                <Formik
                                    onSubmit={async (values, { resetForm })  => NovoProjeto(values, { resetForm })}
                                    initialValues={{
                                        nome: '',
                                        cliente: '',
                                        data_previsao_entrega: ''
                                    }} validationSchema={schema}>
                                    {({
                                        handleSubmit,
                                        handleChange,
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
                                                    <Form.Control
                                                        name="cliente"
                                                        type="text"
                                                        placeholder="Cliente"
                                                        autoComplete="off"
                                                        value={values.cliente}
                                                        onChange={handleChange}
                                                        isValid={touched.cliente && !errors.cliente}
                                                        isInvalid={touched.cliente && !!errors.cliente} />
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
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={12}>
                                                    <Button type="submit" className="float-end">Salvar</Button>
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

export default CadastrarProjeto