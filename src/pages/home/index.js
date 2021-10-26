import Header from '../../components/header'
import Footer from '../../components/footer'

function Home() {
    return (
        <>
            <Header/>
            <div>
                <h1>Página Inicial</h1>
                <p>
                    <a href="/login">Login</a>
                </p>
            </div>
            <Footer/>
        </>
    )
}

export default Home