import ListarTimelinePublica from "../../../components/projetos/timeline/timelinePublica";
import { Container, Row, Col, Spinner, Form, Modal, Button } from 'react-bootstrap';
import HeaderPublico from '../../../components/header/headerPublico';
import Footer from '../../../components/footer';
import Wrapper from '../../../components/wrapper';
import { useState, useEffect } from 'react';
import api from '../../../api';
import Moment from 'react-moment';
import 'moment/locale/pt-br';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import { Formik } from 'formik';
import * as yup from 'yup';

function TimelinePublica(referencia) {

    const [spinner, setSpinner] = useState(true);
    const [projeto, setProjeto] = useState({
        segmento: {
            nome: ''
        }
    });
    const [status, setStatus] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModalAcompanhamento, setShowModalAcompanhamento] = useState(false);
    const [textModal, setTextModal] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    const schema = yup.object({
        nome: yup.string().required().min(3),
        email: yup.string().email().required()
    });

    useEffect(() => {
        setSpinner(true);

        async function DetalhesProjeto() {
                await api.get('v1/api/projects/' + referencia.id)
                    .then(response => {
                        console.log(response.data);
                        setProjeto(response.data);
                        setSpinner(false);
                    })
                    .catch(error => {
                        setSpinner(false);
                        console.error(error);
                    });

            setSpinner(false);
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
            <HeaderPublico />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={10}>
                            <div className="card-fox">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>{projeto.nome}</h4>
                                        <p><span className="segmento">{projeto.segmento.nome}</span> </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>Data de Início:</b> <Moment locale="pt-br" format="LL">{projeto.data_inicio_projeto}</Moment></p>
                                        <p><b>Data prevista de conclusão:</b> <Moment locale="pt-br" format="LL">{projeto.data_previsao_entrega}</Moment></p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <a href="#" onClick={() => setShowModalAcompanhamento(true)}>
                                <div className="card-fox-gray" style={{ 'min-height': '110.86px' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="text-center">
                                                <FontAwesomeIcon icon="bell" /><br />
                                                Acompanhar projeto
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={12}>
                            {projeto.id && <ListarTimelinePublica projeto_id={projeto.id} />}
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

                <Modal show={showModalAcompanhamento} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deseja Acompanhar o projeto?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Cadastre seu e-mail</p>

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
                                            <div className="form-group">
                                                <Form.Control
                                                    name="nome"
                                                    type="text"
                                                    placeholder="Nome do Usuário"
                                                    autoComplete="off"
                                                    value={values.nome}
                                                    onChange={handleChange}
                                                    isValid={touched.nome && !errors.nome}
                                                    isInvalid={touched.nome && !!errors.nome} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
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
                                    <p className="text-right no-margin-lr">
                                        <button type="submit" className="btn btn-fox-dynamic">
                                            <i className="fas fa-cloud-upload-alt" aria-hidden="true"></i> Salvar E-mail
                                        </button>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>
            </Wrapper>
            <Footer />
        </>
    );
}

export default TimelinePublica;