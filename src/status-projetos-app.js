import './status-projetos-app.css';
import { useRoutes } from 'hookrouter';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/admin/dashboard'
import Projetos from './pages/admin/projetos'
import CadastrarProjeto from './pages/admin/projetos/cadastrar'

const routes = {
  '/': () => <Home />,
  '/login': () => <Login />,
  '/admin/dashboard': () => <Dashboard />,
  '/admin/projetos': () => <Projetos />,
  '/admin/projetos/cadastrar': () => <CadastrarProjeto />
}

function StatusProjetosApp() {
  return useRoutes(routes);
}

export default StatusProjetosApp;