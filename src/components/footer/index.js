import './footer.scss';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; {new Date().getFullYear()}  - Status Projetos TCC PUC Minas</p>
                    </div>
                    <div className="col-md-6">
                        <p className="text-right">Desenvolvido por Erik Cavalcanti e Rafael Ferreira</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer