import React from 'react'
import './header.scss';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faQuestionCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';

library.add(faCheckSquare, faQuestionCircle, faUserCircle);

function Header() {

    const [nome, setNome] = useState('');

    useEffect(() => {
        setNome(localStorage.getItem('usuario'));
    }, []);

    return (
        <Navbar className="navbar navbar-inverse navbar-fixed-top nav-fox">
            <Container fluid>
                <Navbar.Brand className="logo-foxaccount" href="/" style={{'width': '500px'}}>
                    <FontAwesomeIcon icon="check-square" /> Módulo de Gestão Estratégica de Projetos
                </Navbar.Brand>

                <Nav className="navbar-collapse collapse">
                    <Nav.Link className="navbar-link-fox" href="/projetos">Projetos</Nav.Link>
                    <Nav.Link className="navbar-link-fox" href="#">Ajuda <FontAwesomeIcon icon="question-circle" /></Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link className="navbar-link-fox" href="/login">Login <FontAwesomeIcon icon="user-circle" /></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header