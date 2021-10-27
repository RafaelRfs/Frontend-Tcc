import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Wrapper from '../../../components/wrapper'

function Dashboard() {
    return (
        <>
            <Header />
            <Wrapper>
                <h1>Dashboard</h1>
                <p>
                    <a href="/">Voltar</a>
                </p>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Dashboard