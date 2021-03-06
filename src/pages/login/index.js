import './login.scss'
import { Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import api from '../../api';
import axios from 'axios';
import * as yup from 'yup';
import { navigate } from 'hookrouter';

function Login() {

    const baseURL = 'https://api-gerenciador-projetos-tcc.herokuapp.com/';

    const Api = axios.create({
        baseURL: baseURL,
    });

    localStorage.removeItem('token');

    library.add(faCheckSquare);
    const [spinner, setSpinner] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const schema = yup.object({
        username: yup.string().required().email(),
        password: yup.string().required().min(5)
    });

    async function Login(values) {

        setSpinner(true);

        await Api.post('api/auth/login', values)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                CarregarUsuario();
            })
            .catch(error => {
                setSpinner(false);
                setShowModal(true);
                console.error(error);
            });
    }

    async function CarregarUsuario() {
        await api.get('v1/api/users')
            .then(response => {
                localStorage.setItem('usuario', response.data.nome);
                setSpinner(false);
                navigate('/admin/dashboard');
                window.location.reload(false);
            })
            .catch(error => {
                setSpinner(false);
                console.error(error);
            });
    }

    useEffect(() => {
        setSpinner(false);
    }, [spinner]);

    return (
        <>
            <div className="login">
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
                            <div id="login" className="position-absolute top-50 start-50 translate-middle">
                                <div className="logo">
                                    <a href="#">
                                        <FontAwesomeIcon icon="check-square" /> Status Projetos
                                    </a>
                                </div>

                                <div className="wrapper-login">
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
                    <p>O usu??rio ou senha est??o inv??lidos!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login