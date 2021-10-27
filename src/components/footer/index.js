import './footer.scss';

function Footer() {
    return (
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <p>&copy; {new Date().getFullYear()}  - Status Projetos TCC PUC Minas</p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-right">Desenvolvido por Erik Cavalcanti e Rafael Ferreira</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer