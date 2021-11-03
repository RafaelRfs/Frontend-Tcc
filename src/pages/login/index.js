import './login.scss'
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';

function Login() {

    library.add(faCheckSquare);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setSpinner(false);
    }, []);

    return (
        <div class="login">
            { spinner && <div id="loader"></div> }

            <Form>
                <div id="login" class="position-absolute top-50 start-50 translate-middle">
                    <div class ="logo">
                        <a href="#">
                            <FontAwesomeIcon icon="check-square" /> Status Projetos
                        </a>
                    </div>

                    <div class ="wrapper-login">
                        <Form.Control type="email" placeholder="E-mail" className="user" autoComplete="off" />
                        <Form.Control type="password" placeholder="Senha" className="password" autoComplete="off" />
                    </div>

                    <Button type ="submit" className="login-button">Entrar</Button>
                </div>
            </Form>
        </div>
    )
}

export default Login