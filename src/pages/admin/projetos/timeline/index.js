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
import Select from 'react-select'

library.add(faCog, faBell);

function ListarTimeline(referencia) {
    const [spinner, setSpinner] = useState(true);
    let [projeto, setProjeto] = useState([]);
    let [status, setStatus] = useState([]);

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
                            id: s.id
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

                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <div class="card-fox">
                                <form method="post" asp-action="UpdateProjectTimeline" asp-controller="Project">
                                    <input type="hidden" asp-for="ProjectId" value="@ViewBag.ProjectId" />
                                    <Row>
                                        <Col md={12}>
                                            <div class="form-group">
                                                <label>Adicione uma descrição de como está o projeto</label>
                                                <textarea asp-for="ProjectDesciption" rows="3" class="form-control"></textarea>
                                                <span class="alert-fox" asp-validation-for="ProjectDesciption"></span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div class="form-group">
                                                <label>Selecione uma marcação</label>
                                                <Select class="form-control select2-basic-icon" options={status} />
                                                <span class="alert-fox" asp-validation-for="ProjectFlagId"></span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div class="form-group">
                                                <label>Anexe uma URL</label>
                                                <input asp-for="AttachUrl" type="text" class="form-control" />
                                                <span class="alert-fox" asp-validation-for="AttachUrl"></span>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div class="form-group">
                                                <label>Legenda botão</label>
                                                <input asp-for="ButtonLabel" type="text" class="form-control" />
                                                <span class="alert-fox" asp-validation-for="ButtonLabel"></span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <p class="text-left no-margin-lr">
                                                <input type="checkbox" asp-for="AlertEmail" checked data-toggle="toggle" data-on="<i class='far fa-bell fa-lg'></i> Alertar" data-off="Desligado" data-onstyle="info" />
                                            </p>
                                        </Col>
                                        <Col md={6}>
                                            <p class="text-right no-margin-lr">
                                                <button type="submit" class="btn btn-fox-dynamic">
                                                    <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> Publicar
                                                </button>
                                            </p>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Col>
                    </Row>

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