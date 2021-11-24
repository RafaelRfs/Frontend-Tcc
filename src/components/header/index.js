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
    const navDropdownTitle = (<div><FontAwesomeIcon icon="user-circle" /> {nome}</div>);

    useEffect(() => {
        setNome(localStorage.getItem('usuario'));
    }, []);

    return (
        <Navbar className="navbar navbar-inverse navbar-fixed-top nav-fox">
            <Container fluid>
                <Navbar.Brand className="logo-foxaccount" href="/admin/dashboard" style={{'width': '500px'}}>
                    <FontAwesomeIcon icon="check-square" /> Módulo de Gestão Estratégica de Projetos
                </Navbar.Brand>

                <Nav className="navbar-collapse collapse">
                    <Nav.Link className="navbar-link-fox" href="/admin/dashboard">Dashboard</Nav.Link>
                    <Nav.Link className="navbar-link-fox" href="/admin/projetos">Projetos</Nav.Link>
                    <Nav.Link className="navbar-link-fox" href="#">Ajuda <FontAwesomeIcon icon="question-circle" /></Nav.Link>
                </Nav>

                <Nav>
                    <NavDropdown className="navbar-right" title={navDropdownTitle} id="collasible-nav-dropdown">
                        <NavDropdown.Item className="navbar-link-fox" href="/admin/usuario/editar">Meu Perfil</NavDropdown.Item>
                        <NavDropdown.Item className="navbar-link-fox" href="/login">Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header