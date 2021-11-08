import './login.scss'
import { Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import api from '../../api';
import * as yup from 'yup';
import { navigate } from 'hookrouter';

function Login() {

    library.add(faCheckSquare);
    const [spinner, setSpinner] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const schema = yup.object({
        username: yup.string().required().email(),
        password: yup.string().required().min(5)
    });

    useEffect(() => {
        setSpinner(false);
    }, [spinner]);

    async function Login(values) {

        setSpinner(true);

        await api.post('api/auth/login', values)
            .then(response => {
                sessionStorage.setItem('token', response.data.token);
                navigate('/admin/dashboard');
            })
            .catch(error => {
                setSpinner(false);
                setShowModal(true);
                console.error(error);
            });
    }

    return (
        <>
            <div class="login">
                {spinner && <div id="loader"></div>}

                <Formik
                    onSubmit={async (values) => Login(values)}
                    initialValues={{
                        username: '',
                        password: ''
                    }} validationSchema={schema}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                            <div id="login" class="position-absolute top-50 start-50 translate-middle">
                                <div class="logo">
                                    <a href="#">
                                        <FontAwesomeIcon icon="check-square" /> Status Projetos
                                    </a>
                                </div>

                                <div class="wrapper-login">
                                    <Form.Control
                                        name="username"
                                        type="email"
                                        placeholder="E-mail"
                                        className="user"
                                        autoComplete="off"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.username && !errors.username}
                                        isInvalid={touched.username && !!errors.username} />

                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Senha"
                                        className="password"
                                        autoComplete="off"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={touched.password && !!errors.password} />
                                </div>

                                <Button type="submit" className="login-button">Entrar</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ops!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>O usuário ou senha estão inválidos!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login