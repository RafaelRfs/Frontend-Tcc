import Timeline from "../../../../components/projetos/timeline";
import { Container, Row, Col, Spinner, Form, Modal, Button } from 'react-bootstrap';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import Wrapper from '../../../../components/wrapper';
import { useState, useEffect } from 'react';
import api from '../../../../api';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import Select, { Option, ReactSelectProps } from 'react-select'
import { Formik } from 'formik';
import * as yup from 'yup';

library.add(faCog, faBell);

function ListarTimeline(referencia) {

    const [spinner, setSpinner] = useState(true);
    const [projeto, setProjeto] = useState({
        segmento: {}
    });
    const [status, setStatus] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [textModal, setTextModal] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    useEffect(() => {
        setSpinner(true);

        async function DetalhesProjeto() {
            await api.get('v1/api/projects/' + referencia.id)
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
            await api.get('v1/api/status')
                .then(response => {
                    let options = response.data.map((s) => {
                        return {
                            label: s.nome,
                            value: s.id
                        }
                    });
                    setStatus(options);
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        DetalhesProjeto();
        ListarStatus();
    }, []);

    const schema = yup.object({
        descricao: yup.string().required().min(4),
        url: yup.string(),
        legenda: yup.string(),
        alertar: yup.bool(),
        status_id: yup.string().required().ensure(),
    });

    async function IncluirTimeline(values, { resetForm }) {

        setSpinner(true);
        values["projeto_id"] = projeto.id;

        await api.post('v1/api/timelines', values)
            .then(response => {
                setSpinner(false);
                setTitleModal('Sucesso!');
                setTextModal('O status foi inclu??do com sucesso!');
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

        setSpinner(false);
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
                            <h2>{projeto.nome}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <a href={`/admin/projetos/editar/${projeto.id}`}>
                                <div className="card-fox-gray">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="text-center">
                                                <FontAwesomeIcon icon="cog" /><br />
                                                Editar
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Col>

                        <Col md={8}>
                            <div className="card-fox">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><span className="segmento">{projeto.segmento.nome}</span> </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>Data prevista de conclus??o:</b> <br /> <Moment locale="pt-br" format="DD-MM-YYYY">{projeto.data_previsao_entrega}</Moment></p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <a href={`/admin/projetos/notificacao/${projeto.id}`}>
                                <div className="card-fox-gray">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="text-center">
                                                <FontAwesomeIcon icon="bell" /><br />
                                                Alerta
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Col>
                    </Row>

                    <hr />

                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <div className="card-fox">
                                <Formik
                                    onSubmit={async (values, { resetForm }) => IncluirTimeline(values, { resetForm })}
                                    initialValues={{
                                        descricao: '',
                                        url: '',
                                        legenda: '',
                                        alertar: true,
                                        status_id: ''
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
                                            <br />
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Control
                                                        name="descricao"
                                                        as="textarea"
                                                        placeholder="Descri????o projeto"
                                                        autoComplete="off"
                                                        style={{ height: '100px' }}
                                                        value={values.descricao}
                                                        onChange={handleChange}
                                                        isValid={touched.descricao && !errors.descricao}
                                                        isInvalid={touched.descricao && !!errors.descricao} />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={12}>
                                                    <Select
                                                        className="form-control select2-basic-icon"
                                                        placeholder={'Selecione uma marca????o'}
                                                        onChange={selectedOption => {
                                                            handleChange({ target: { name: 'status_id', value: selectedOption.value } })
                                                        }}
                                                        onBlur={selectedOption => {
                                                            handleBlur({ target: { name: 'status_id', value: selectedOption.value } });
                                                        }}
                                                        options={status}
                                                        defaultValue={status[0]}
                                                        isValid={touched.status_id && !errors.status_id}
                                                        isInvalid={touched.status_id && !!errors.status_id}
                                                        className={touched.status_id && !!errors.status_id && 'select-error'} />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="url"
                                                        type="text"
                                                        placeholder="Anexe uma URL"
                                                        autoComplete="off"
                                                        value={values.url}
                                                        onChange={handleChange}
                                                        isValid={touched.url && !errors.url}
                                                        isInvalid={touched.url && !!errors.url} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        name="legenda"
                                                        type="text"
                                                        placeholder="Legenda bot??o"
                                                        autoComplete="off"
                                                        value={values.legenda}
                                                        onChange={handleChange}
                                                        isValid={touched.legenda && !errors.legenda}
                                                        isInvalid={touched.legenda && !!errors.legenda} />
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col md={6}>
                                                    <div className="text-left no-margin-lr">
                                                        <Form.Check
                                                            type="switch"
                                                            label="Alertar?"
                                                            name="alertar"
                                                            onChange={handleChange}
                                                            defaultChecked={true}
                                                            value={values.alertar} />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <p className="text-end">
                                                        <button type="submit" className="btn btn-fox-dynamic">
                                                            <i className="fas fa-cloud-upload-alt" aria-hidden="true"></i> Publicar
                                                        </button>
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            {projeto.id && <Timeline projeto_id={projeto.id} />}
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

export default ListarTimeline;