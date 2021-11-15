import { Container, Row, Col, Spinner, Modal, Button, Form } from 'react-bootstrap';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import Wrapper from '../../../../components/wrapper';
import { useState, useEffect } from 'react';
import api from '../../../../api';
import { Formik } from 'formik';
import * as yup from 'yup';

function GerenciarNotificacoes(referencia) {

    const [spinner, setSpinner] = useState(false);
    const [emails, setEmails] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextModal] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const handleCloseModal = () => setShowModal(false);

    const schema = yup.object({
        nome: yup.string().required().min(3),
        email: yup.string().email().required()
    });

    useEffect(() => {
        setSpinner(true);

        async function DetalhesProjeto() {
            await api.get('v1/api/notifications/by-project/' + referencia.id)
                .then(response => {
                    console.log(response);
                    setEmails(response.data);
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        DetalhesProjeto();
    }, []);

    async function SalvaEmailNotificacao(values, { resetForm }) {

        setSpinner(true);

        await api.post('v1/api/notifications', values)
            .then(response => {
                setSpinner(false);
                setTitleModal('Sucesso!');
                setTextModal('O email foi cadastrado com sucesso!');
                setShowModal(true);
                resetForm();
                setEmails(emails => [...emails, values]);
            })
            .catch(error => {
                setSpinner(false);
                setTitleModal('Ops!');
                setTextModal('Ocorreu um erro:' + error);
                setShowModal(true);
                console.error(error);
            });
    }

    async function CancelarEmailNotificacao(id) {

        setSpinner(true);

        await api.delete('v1/api/notifications/' + id)
            .then(response => {
                setSpinner(false);
                window.location.reload();
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
                            <h2>Gerenciar Notificações</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div class="card-fox">

                                <Formik
                                    onSubmit={async (values, { resetForm }) => SalvaEmailNotificacao(values, { resetForm })}
                                    initialValues={{
                                        projeto_id: referencia.id,
                                        nome: '',
                                        email: ''
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
                                                    <div class="form-group">
                                                        <Form.Control
                                                            name="nome"
                                                            type="text"
                                                            placeholder="Nome do Projeto"
                                                            autoComplete="off"
                                                            value={values.nome}
                                                            onChange={handleChange}
                                                            isValid={touched.nome && !errors.nome}
                                                            isInvalid={touched.nome && !!errors.nome} />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div class="form-group">
                                                        <Form.Control
                                                            name="email"
                                                            type="email"
                                                            placeholder="E-mail"
                                                            autoComplete="off"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            isValid={touched.email && !errors.email}
                                                            isInvalid={touched.email && !!errors.email} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p class="text-right no-margin-lr">
                                                <button type="submit" class="btn btn-fox-dynamic">
                                                    <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Salvar E-mail
                                                </button>
                                            </p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {
                                emails.map((inscrito, index) => {
                                    return (
                                        <div class="card-fox email-manage-list">
                                            <Row>
                                                <Col md={5}>
                                                    <p>Nome: <strong>{inscrito.nome}</strong></p>
                                                </Col>
                                                <Col md={5}>
                                                    <p>E-mail: <strong>{inscrito.email}</strong></p>
                                                </Col>
                                                <Col md={2}>
                                                    <Button variant="danger" onClick={() => CancelarEmailNotificacao(inscrito.id)}>Cancelar</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
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
    );
}

export default GerenciarNotificacoes;