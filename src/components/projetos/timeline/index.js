import '../../../assets/css/vertical-timeline.css';
import './timeline.scss';
import api from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faClock, faPlayCircle, faSearch, faTasks, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/pt-br';

library.add(
    faCheckCircle,
    faThumbtack,
    faClock,
    faTasks,
    faSearch,
    faCheckCircle,
    faPlayCircle
);

function Timeline(props) {

    const [spinner, setSpinner] = useState(true);
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        setSpinner(true);

        async function CarregarTimeline() {
            await api.get('v1/api/timelines/by-project/' + props.projeto_id)
                .then(response => {
                    setTimeline([...response.data].reverse());
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        CarregarTimeline();
    }, [])

    return (
        <>
            <section id="cd-timeline">
                {
                    timeline.map((timelineStatus, index) => {
                        return (
                            <div className="cd-timeline-block" key={index}>
                                <div className={['cd-timeline-img', timelineStatus.status.cor].join(' ')}>
                                    <FontAwesomeIcon icon={timelineStatus.status.icone} />
                                </div>

                                <div className="cd-timeline-content">
                                    <h2>{timelineStatus.status.descricao}</h2>
                                    <p>{timelineStatus.descricao}</p>
                                    {timelineStatus.url && <a href={timelineStatus.url} target="_blank" className="cd-read-more">{timelineStatus.legenda ? timelineStatus.legenda : "Visualizar"}</a>}
                                    <span className="cd-date"><Moment locale="pt-br" format="LLLL">{timelineStatus.data_postagem}</Moment></span>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </>
    );
}

export default Timeline;