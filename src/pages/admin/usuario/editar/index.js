import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Wrapper from '../../../../components/wrapper'
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import api from '../../../../api';
import { Formik } from 'formik';

function EditarUsuario() {

    const [spinner, setSpinner] = useState(false);
    const [usuario, setUsuario] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextModal] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const handleCloseModal = () => setShowModal(false);

    const schema = yup.object({
        nome: yup.string().required().min(3),
        email: yup.string().email().required().min(3),
        senha: yup.string().required().min(3),
        nova_senha: yup.string().required().min(3),
        confirmacao_nova_senha: yup.string().required().oneOf([yup.ref('nova_senha'), null], 'a senha não confere.'),
    });

    useEffect(() => {
        setSpinner(true);

        async function CarregarUsuario() {
            await api.get('v1/api/users')
                .then(response => {
                    setUsuario(response.data);
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        CarregarUsuario();
    }, []);

    async function AtualizarUsuario(values, { resetForm }) {

        setSpinner(true);

        await api.put('v1/api/users', values)
            .then(response => {
                localStorage.setItem('usuario', response.data.nome);
                setSpinner(false);
                setTitleModal('Sucesso!');
                setTextModal('O usuario foi atualizado com sucesso!');
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
                            <h2>Atualizar Usuário</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="card-fox">
                                <Formik
                                    enableReinitialize
                                    onSubmit={async (values, { resetForm }) => AtualizarUsuario(values, { resetForm })}
                                    initialValues={{
                                        user_id: usuario.id || '',
                                        nome: usuario.nome || '',
                                        email: usuario.email || '',
                                        senha: '',
                                        nova_senha: '',
                                        confirmacao_nova_senha: ''
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
                                                        hidden={true}
                                                        name="user_id"
                                                        type="text"
                                                        value={values.user_id}
                                                        onChange={handleChange}
                                                        isValid={touched.user_id && !errors.user_id}
                                                        isInvalid={touched.user_id && !!errors.user_id} />
                                                    <Form.Control
                                                        name="nome"
                                                        type="text"
                                                        placeholder="Nome do usuario"
                                                        autoComplete="off"
                                                        value={values.nome}
                                                        onChange={handleChange}
                                                        isValid={touched.nome && !errors.nome}
                                                        isInvalid={touched.nome && !!errors.nome} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="email"
                                                        type="text"
                                                        placeholder="E-mail"
                                                        autoComplete="off"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        isValid={touched.email && !errors.email}
                                                        isInvalid={touched.email && !!errors.email} />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="senha"
                                                        type="password"
                                                        placeholder="Senha"
                                                        autoComplete="off"
                                                        value={values.senha}
                                                        onChange={handleChange}
                                                        isValid={touched.senha && !errors.senha}
                                                        isInvalid={touched.senha && !!errors.senha} />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="nova_senha"
                                                        type="password"
                                                        placeholder="Nova Senha"
                                                        autoComplete="off"
                                                        value={values.nova_senha}
                                                        onChange={handleChange}
                                                        isValid={touched.nova_senha && !errors.nova_senha}
                                                        isInvalid={touched.nova_senha && !!errors.nova_senha} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="confirmacao_nova_senha"
                                                        type="password"
                                                        placeholder="Confirmação Nova Senha"
                                                        autoComplete="off"
                                                        value={values.confirmacao_nova_senha}
                                                        onChange={handleChange}
                                                        isValid={touched.confirmacao_nova_senha && !errors.confirmacao_nova_senha}
                                                        isInvalid={touched.confirmacao_nova_senha && !!errors.confirmacao_nova_senha} />
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
    );
}

export default EditarUsuario;