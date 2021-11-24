import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';
import { Nav, Spinner } from 'react-bootstrap';
import api from '../../../api';
import { useState, useEffect } from 'react';

library.add(faLongArrowAltRight);

function ListarProjetos(props) {

    const [spinner, setSpinner] = useState(true);
    const [projetos, setProjetos] = useState([]);
    const [countProjetos, setCountProjetos] = useState(0);

    const [habilitaEmAndamento, setHabilitaEmAndamento] = useState(true);
    const [habilitaAguardandoCliente, setHabilitaAguardandoCliente] = useState(false);
    const [habilitaConcluido, setHabilitaConcluido] = useState(false);

    async function CarregarProjetos(status) {
        await api.get('v1/api/projects/by-status/' + status)
            .then(response => {
                setProjetos(response.data);
                setCountProjetos(response.data.length);
                setSpinner(false);
            })
            .catch(error => {
                setSpinner(false);
                setProjetos([]);
                console.error(error);
            });

        setProjetos([
            {
                'id': '3',
                'nome': 'projeto',
                'segmento': 'Saúde'
            }
        ]);

        setSpinner(false);
    }

    function SelecionaStatusProjeto(status) {

        setSpinner(true);

        setHabilitaEmAndamento(false);
        setHabilitaAguardandoCliente(false);
        setHabilitaConcluido(false);

        switch (status) {
            case 'em-andamento':
                setHabilitaEmAndamento(true);
                CarregarProjetos('EM_ANDAMENTO');
                break;
            case 'aguardando-cliente':
                setHabilitaAguardandoCliente(true);
                CarregarProjetos('AGUARDANDO_CLIENTE');
                break;
            case 'concluido':
                setHabilitaConcluido(true);
                CarregarProjetos('FINALIZADO');
                break;
        }
    }

    useEffect(() => {
        setSpinner(true);
        CarregarProjetos('EM_ANDAMENTO');
    }, []);

    return (
        <>
            <div className="container-spinner" hidden={!spinner}>
                <Spinner
                    id="custom-spinner"
                    style={{ 'position': 'absolute', 'top': '50%', 'left': '50%' }}
                    animation="border"
                    role="status" />
            </div>
            <div className="nav-pills-fox-container">
                <Nav defaultActiveKey="#1" variant="tabs" className="nav-pills-fox">
                    <Nav.Item>
                        <Nav.Link href="#1" onClick={() => SelecionaStatusProjeto('em-andamento')}>Em andamento {habilitaEmAndamento && `(` + countProjetos + `)`}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#2" onClick={() => SelecionaStatusProjeto('aguardando-cliente')}>Aguardando o cliente {habilitaAguardandoCliente && `(` + countProjetos + `)`}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#3" onClick={() => SelecionaStatusProjeto('concluido')}>Finalizados {habilitaConcluido && `(` + countProjetos + `)`}</Nav.Link>
                    </Nav.Item>
                </Nav>
                <hr />
            </div>
            <div className="list-of-projects">
                {
                    projetos.map((projeto, index) => {
                        return (
                            <div className="box-project" key={index}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-fox card-project">
                                            <div className="info">
                                                <p>Informações</p>
                                            </div>
                                            <div className="content">
                                                <h3>{projeto.nome}</h3>
                                                <p><b>Cliente:</b> {projeto.cliente}</p>
                                                <p><b>Previsão de entrega:</b>  <Moment locale="pt-br" format="DD-MM-YYYY">{projeto.data_previsao_entrega}</Moment></p>
                                                <p><span className="segmento">{projeto.segmento}</span> </p>
                                                <p className="text-end">
                                                    <a className="btn btn-fox-dynamic" href={`/timeline/${projeto.id}`}><FontAwesomeIcon icon="long-arrow-alt-right" /> Ver Projeto</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default ListarProjetos;