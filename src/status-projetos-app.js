import './status-projetos-app.css';
import { useRoutes } from 'hookrouter';
import Login from './pages/login';
import Home from './pages/home';

const routes = {
  '/': () => <Home />,
  '/login': () => <Login />
}

function StatusProjetosApp() {
  return useRoutes(routes);
}

export default StatusProjetosApp;