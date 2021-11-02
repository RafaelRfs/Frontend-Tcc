import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Wrapper from '../../../components/wrapper'
import './projetos.scss';
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

function Projetos() {
    return (
        <>
            <Header />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Projetos</h2>
                            <p>Acompanhamento dos projetos.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div class="card-fox">
                                <a href="/admin/projetos/cadastrar"><FontAwesomeIcon icon="plus" /> Novo Projeto</a>
                            </div>
                        </Col>
                    </Row>
                    <div class="nav-pills-fox-container">
                        <Nav variant="tabs" className="nav-pills-fox">
                            <Nav.Item>
                                <Nav.Link href="#1">Em andamento (0)</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#2">Aguardando o cliente</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#3">Finalizados</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <hr />
                    </div>
                </Container>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Projetos