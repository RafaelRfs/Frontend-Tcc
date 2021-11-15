import '../../../assets/css/vertical-timeline.css';
import './timeline.scss';

function Timeline() {
    return (
        <>
            <section id="cd-timeline">

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-blue">
                        <i class="fas fa-thumbtack"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Concluído</h2>
                        <p>O modelo foi enviado no e-mail do cliente e o projeto foi finalizado</p>
                        <span class="cd-date">21 de janeiro às 16:06</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-green">
                        <i class="fas fa-check-circle"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Aprovado</h2>
                        <p>O cliente aprovou o modelo 1</p>
                        <span class="cd-date">21 de janeiro às 09:28</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-yellow">
                        <i class="fas fa-clock"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Aguardando Aprovação</h2>
                        <p>Os modelos foram desenvolvidos e enviados para o cliente, nossa equipe aguarda a aprovação</p>
                        <a href="#0" class="cd-read-more">Acessar modelos</a>
                        <span class="cd-date">20 de janeiro às 14:28</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-gray">
                        <i class="fas fa-tasks"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Em andamento - Criando os modelos</h2>
                        <p>O Briefing foi analisado, a equipe de criação está desenvolvendo os modelos</p>
                        <span class="cd-date">18 de janeiro às 17:57</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-gray">
                        <i class="fas fa-search"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Analisando Informações</h2>
                        <p>O briefing foi respondido nossa equipe de criação vai analisar as informações</p>
                        <span class="cd-date">18 de janeiro às 11:43</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-yellow">
                        <i class="fas fa-clock"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Aguardando Informações</h2>
                        <p>O briefing foi criado, o cliente deve responder para darmos continuidade no projeto</p>
                        <a href="#0" class="cd-read-more">Acessar Briefing</a>
                        <span class="cd-date">17 de janeiro às 15:23</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-gray">
                        <i class="fas fa-tasks"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Em andamento - Preparando o Briefing</h2>
                        <p>Nossa equipe de criação está preparando o briefing para o cliente</p>
                        <span class="cd-date">17 de janeiro às 10:50</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-green">
                        <i class="fas fa-check-circle"></i>
                    </div>

                    <div class="cd-timeline-content">
                        <h2>Pagamento Efetuado</h2>
                        <p>O pagamento já foi feito pelo cliente</p>
                        <span class="cd-date">16 de janeiro às 15:31</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-yellow">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="cd-timeline-content">
                        <h2>Aguardando o pagamento</h2>
                        <p>O boleto foi enviado para o e-mail do cliente, agora só falta o pagamento</p>
                        <a href="#0" class="cd-read-more">Imprimir boleto</a>
                        <span class="cd-date">15 de janeiro às 14:12</span>
                    </div>
                </div>

                <div class="cd-timeline-block">
                    <div class="cd-timeline-img project-status-gray">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="cd-timeline-content">
                        <h2>Projeto Iniciado</h2>
                        <span class="cd-date">14 de janeiro às 11:30</span>
                    </div>
                </div>


            </section>
        </>
    );
}

export default Timeline;