import { useRoutes } from 'react-router-dom';
import routes from './routes';

function ModuleLayout() {
  const elements = useRoutes(routes);
  return <div>{elements}</div>;
}
export default ModuleLayout;
