import HeaderPublico from '../../../components/header/headerPublico';
import Footer from '../../../components/footer';
import Wrapper from '../../../components/wrapper';
import ListarProjetosPublicos from '../../../components/projetos/listarProjetos/listarProjetosPublicos';
import '../../admin/projetos/projetos.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ProjetosPublicos() {
    return (
        <>
            <HeaderPublico />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Projetos</h2>
                            <p>Acompanhamento dos projetos.</p>
                        </Col>
                    </Row>
                    <ListarProjetosPublicos />
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
}

export default ProjetosPublicos;