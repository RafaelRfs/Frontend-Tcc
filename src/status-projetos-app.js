import './status-projetos-app.css';
import { useRoutes } from 'hookrouter';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/admin/dashboard'

const routes = {
  '/': () => <Home />,
  '/login': () => <Login />,
  '/admin/dashboard': () => <Dashboard />
}

function StatusProjetosApp() {
  return useRoutes(routes);
}

export default StatusProjetosApp;