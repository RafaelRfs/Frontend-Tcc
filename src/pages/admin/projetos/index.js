import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Wrapper from '../../../components/wrapper';
import ListarProjetos from '../../../components/projetos/listarProjetos';
import './projetos.scss';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import api from '../../../api';

library.add(faPlus);

function Projetos() {

    async function CarregarProjetos()
    {
        // await api.post('v1/api/projects', values)
        //     .then(response => {
        //         setTitleModal('Sucesso!');
        //         setTextModal('O projeto foi cadastrado com sucesso!');
        //         setShowModal(true);
        //         resetForm();
        //     })
        //     .catch(error => {
        //         setSpinner(false);
        //         setTitleModal('Ops!');
        //         setTextModal('Ocorreu um erro:' + error);
        //         setShowModal(true);
        //         console.error(error);
        //     });
    }

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
                        <Nav defaultActiveKey="#1" variant="tabs" className="nav-pills-fox">
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

                    <ListarProjetos busca="andamento" />
                </Container>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Projetos