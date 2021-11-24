import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Wrapper from '../../../components/wrapper'
import './dashboard.scss';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBriefcase, faChartPie, faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faBriefcase, faUser, faChartPie);

function Dashboard() {
    return (
        <>
            <Header />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Dashboard</h2>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={4}>
                            <Card className="panel panel-default painel-dashboard-fox">
                                <a href="/admin/projetos">
                                    <Card.Body className="panel-body">
                                        <div className="icon">
                                            <FontAwesomeIcon icon="briefcase" />
                                        </div>
                                        <div className="text">
                                            Projetos
                                        </div>
                                    </Card.Body>
                                </a>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="panel panel-default painel-dashboard-fox">
                                <a href="/admin/usuario/editar">
                                    <Card.Body className="panel-body">
                                        <div className="icon">
                                            <FontAwesomeIcon icon="user" />
                                        </div>
                                        <div className="text">
                                            Meus dados
                                        </div>
                                    </Card.Body>
                                </a>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="panel panel-default painel-dashboard-fox">
                                <a href="/admin/relatorios/segmento">
                                    <Card.Body className="panel-body">
                                        <div className="icon">
                                            <FontAwesomeIcon icon="chart-pie" />
                                        </div>
                                        <div className="text">
                                            Relatórios
                                        </div>
                                    </Card.Body>
                                </a>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Dashboard