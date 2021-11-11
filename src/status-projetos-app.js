import './status-projetos-app.css';
import { useRoutes, navigate } from 'hookrouter';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/admin/dashboard'
import Projetos from './pages/admin/projetos'
import CadastrarProjeto from './pages/admin/projetos/cadastrar'

const routes = {
  '/': () => <Login />,
  '/login': () => <Login />,
  '/admin/*': () => <AuthedPages />,
}

function StatusProjetosApp() {
  const result = useRoutes(routes);
  return result || 'Not found';
}

function AuthedPages() {

  const authedRoutes = {
    '/admin/dashboard': () => <Dashboard />,
    '/admin/projetos': () => <Projetos />,
    '/admin/projetos/cadastrar': () => <CadastrarProjeto />
  };

  if (!sessionStorage.getItem('token')) {
    navigate('/login');
  }

  return useRoutes(authedRoutes);
}

export { StatusProjetosApp, AuthedPages };