import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';

library.add(faLongArrowAltRight);

function ListarProjetos(props) {
    return (
        <div class="list-of-projects">
            <h3>{props.busca}</h3>

            {
                props.projetos.map((projeto, index) => {
                    return (
                        <div class="box-project">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card-fox card-project">
                                        <div class="info">
                                            <p>Informações</p>
                                        </div>
                                        <div class="content">
                                            <h3>{projeto.nome}</h3>
                                            <p><b>Cliente:</b> {projeto.cliente}</p>
                                            <p><b>Previsão de entrega:</b>  <Moment locale="pt-br" format="DD-MM-YYYY">{projeto.data_previsao_entrega}</Moment></p>
                                            <p class="text-end">
                                                <a class="btn btn-fox-dynamic" href="#"><FontAwesomeIcon icon="long-arrow-alt-right" /> Ver Projeto</a>
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
    );
}

export default ListarProjetos;