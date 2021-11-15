import Timeline from "../../../../components/projetos/timeline";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import Wrapper from '../../../../components/wrapper';
import { useState, useEffect } from 'react';
import api from '../../../../api';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";

library.add(faCog, faBell);

function ListarTimeline(referencia) {
    const [spinner, setSpinner] = useState(true);
    let [projeto, setProjeto] = useState([]);

    useEffect(() => {
        setSpinner(true);

        async function DetalhesProjeto() {
            await api.get('v1/api/projects/' + referencia.id)
                .then(response => {
                    console.log(response);
                    setProjeto(response.data);
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        DetalhesProjeto();
    }, []);

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
                                <div class="card-fox-gray">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p class="text-center">
                                                <FontAwesomeIcon icon="cog" /><br />
                                                Editar
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Col>

                        <Col md={8}>
                            <div class="card-fox">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p><b>Cliente:</b> <br /> {projeto.cliente}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><b>Data prevista de conclusão:</b> <br /> <Moment locale="pt-br" format="DD-MM-YYYY">{projeto.data_previsao_entrega}</Moment></p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                        <a href={`/admin/projetos/notificacao/${projeto.id}`}>
                                <div class="card-fox-gray">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p class="text-center">
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

                    <Row>
                        <Col md={12}>
                            <Timeline />
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
}

export default ListarTimeline;