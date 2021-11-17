import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Wrapper from '../../../../components/wrapper'
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react';

function EditarUsuario() {

    const [spinner, setSpinner] = useState(false);

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
                            <h2>Atualizar Usuário</h2>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
}

export default EditarUsuario;