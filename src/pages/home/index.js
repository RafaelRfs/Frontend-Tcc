import Header from '../../components/header'
import Footer from '../../components/footer'
import Wrapper from '../../components/wrapper'

function Home() {
    return (
        <>
            <Header/>
            <Wrapper>
                <h1>Página Inicial</h1>
                <p>
                    <a href="/login">Login</a>
                </p>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default Home