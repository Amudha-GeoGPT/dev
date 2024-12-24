import { useRoutes } from 'react-router-dom';
import routes from './route';


function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

export default AppRoutes;
