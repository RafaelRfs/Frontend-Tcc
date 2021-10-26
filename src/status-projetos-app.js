import './status-projetos-app.css';
import { useRoutes } from 'hookrouter';
import Login from './componentes/login/login';
import Home from './componentes/home/home';

const routes = {
  '/': () => <Home />,
  '/login': () => <Login />
}

function StatusProjetosApp() {
  return useRoutes(routes);
}

export default StatusProjetosApp;