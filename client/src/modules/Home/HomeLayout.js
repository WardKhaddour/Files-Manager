import { useRoutes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import classes from './HomeLayout.module.css';
import routes from './routes';
import SVGRoundedFilter from 'components/SVGRoundedFilter';

const HomeLayout = () => {
  const element = useRoutes(routes);

  return (
    <main className={classes.homeLayout}>
      <Sidebar />
      <div className={classes.homeContent}>{element}</div>
      <SVGRoundedFilter />
    </main>
  );
};
export default HomeLayout;
