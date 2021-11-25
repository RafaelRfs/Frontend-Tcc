import { ResponsivePie } from '@nivo/pie'
import Header from '../../../../components/header';
import Wrapper from '../../../../components/wrapper';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Footer from '../../../../components/footer';
import api from '../../../../api';
import { useState, useEffect } from 'react';

function RelatorioSegmentos() {

    const [spinner, setSpinner] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setSpinner(true);

        async function CarregarRelatorioSegmento() {
            await api.get('v1/api/projects/statistics')
                .then(response => {
                    let graphData = response.data.map((s) => {
                        return {
                            id: s.area.toLowerCase(),
                            label: s.area,
                            value: s.count
                        }
                    });
                    setData(graphData);
                    setSpinner(false);
                })
                .catch(error => {
                    setSpinner(false);
                    console.error(error);
                });
        }

        CarregarRelatorioSegmento();
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
            <Header />
            <Wrapper>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Relatórios</h2>
                            <p>Acompanhamento de relatório por área.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div style={{ height: 600 }}>
                                {data && <ResponsivePie
                                    data={data}
                                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                    innerRadius={0.5}
                                    padAngle={3}
                                    cornerRadius={4}
                                    activeOuterRadiusOffset={8}
                                    colors={{ scheme: 'set1' }}
                                    borderWidth={2}
                                    borderColor={{ from: 'color', modifiers: [['darker', '0.2']] }}
                                    arcLinkLabelsSkipAngle={20}
                                    arcLinkLabelsTextOffset={10}
                                    arcLinkLabelsTextColor="#333333"
                                    arcLinkLabelsDiagonalLength={12}
                                    arcLinkLabelsStraightLength={25}
                                    arcLinkLabelsThickness={5}
                                    arcLinkLabelsColor={{ from: 'color' }}
                                    arcLabelsSkipAngle={10}
                                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                                    legends={[
                                        {
                                            anchor: 'left',
                                            direction: 'column',
                                            justify: false,
                                            translateX: -80,
                                            translateY: 20,
                                            itemsSpacing: 0,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemTextColor: '#999',
                                            itemDirection: 'left-to-right',
                                            itemOpacity: 1,
                                            symbolSize: 13,
                                            symbolShape: 'circle',
                                            effects: [
                                                {
                                                    on: 'hover',
                                                    style: {
                                                        itemTextColor: '#000'
                                                    }
                                                }
                                            ]
                                        }
                                    ]} />
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
            <Footer />
        </>
    );
}

export default RelatorioSegmentos;