import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Wrapper from '../../../../components/wrapper'
import '../projetos.scss';
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

function CadastrarProjeto() {
    return (
        <>
            <Header />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Novo Projeto</h2>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
            <Footer />
        </>
    )
}

export default CadastrarProjeto