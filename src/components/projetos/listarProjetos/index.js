import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

library.add(faLongArrowAltRight);

function ListarProjetos(props) {
    return (
        <div class="list-of-projects">
            <h3>{props.busca}</h3>

            <div class="box-project">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card-fox card-project">
                            <div class="info">
                                <p>Informações</p>
                            </div>
                            <div class="content">
                                <h3>Nome do projeto</h3>
                                <p><b>descrição</b></p>
                                <p><b>Empresa:</b> Nome da Empresa</p>
                                <p><b>Dias corridos:</b> 10 | <b>Previsão de entrega:</b> 20 dias</p>
                                <p class="text-end">
                                    <a class="btn btn-fox-dynamic" href="#"><FontAwesomeIcon icon="long-arrow-alt-right" /> Ver Projeto</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-project">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card-fox card-project">
                            <div class="info">
                                <p>Informações</p>
                            </div>
                            <div class="content">
                                <h3>Nome do projeto</h3>
                                <p><b>descrição</b></p>
                                <p><b>Empresa:</b> Nome da Empresa</p>
                                <p><b>Dias corridos:</b> 10 | <b>Previsão de entrega:</b> 20 dias</p>
                                <p class="text-end">
                                    <a class="btn btn-fox-dynamic" href="#"><FontAwesomeIcon icon="long-arrow-alt-right" /> Ver Projeto</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ListarProjetos;