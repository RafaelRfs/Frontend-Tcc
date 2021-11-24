import './status-projetos-app.css';
import { useRoutes, navigate } from 'hookrouter';
import Login from './pages/login';
import Dashboard from './pages/admin/dashboard';
import Projetos from './pages/admin/projetos';
import RelatorioSegmentos from './pages/admin/relatorios/segmentos';
import CadastrarProjeto from './pages/admin/projetos/cadastrar';
import EditarProjeto from './pages/admin/projetos/editar';
import ListarTimeline from './pages/admin/projetos/timeline';
import GerenciarNotificacoes from './pages/admin/projetos/notificacao';
import EditarUsuario from './pages/admin/usuario/editar';
import TimelinePublica from './pages/public/timeline';
import ProjetosPublicos from './pages/public/projetos';

const routes = {
  '/': () => <ProjetosPublicos />,
  '/projetos': () => <ProjetosPublicos />,
  '/timeline/:id': ({id}) => <TimelinePublica id={id} />,
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
    '/admin/relatorios/segmento': () => <RelatorioSegmentos />,
    '/admin/projetos': () => <Projetos />,
    '/admin/projetos/cadastrar': () => <CadastrarProjeto />,
    '/admin/projetos/editar/:id': ({id}) => <EditarProjeto id={id} />,
    '/admin/projetos/timeline/:id': ({id}) => <ListarTimeline id={id} />,
    '/admin/projetos/notificacao/:id': ({id}) => <GerenciarNotificacoes id={id} />,
    '/admin/usuario/editar': () => <EditarUsuario />
  };

  console.log(window.location.href);

  if (window.location.href.includes('admin') && !localStorage.getItem('token')) {
    navigate('/login');
  }

  return useRoutes(authedRoutes);
}

export { StatusProjetosApp, AuthedPages };