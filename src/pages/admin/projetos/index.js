import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Wrapper from '../../../components/wrapper';
import ListarProjetos from '../../../components/projetos/listarProjetos';
import './projetos.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                    <ListarProjetos />
                </Container>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Projetos