import { useRoutes, useLocation } from 'react-router-dom';
import AuthLayoutImage from 'assets/img/auth-img.svg';
import Clips from 'assets/img/clips.svg';
import routes from './routes';
import classes from './ModuleLayout.module.css';

const ModuleLayout = () => {
  const elements = useRoutes(routes);
  const location = useLocation();
  const texts = new Map([
    ['/auth', 'Welcome!'],
    [
      '/auth/signup',
      'Create your account now and get your lectures and free storage',
    ],
    ['/auth/forgot-password', ''],
  ]);

  return (
    <main className={classes.authLayout}>
      <section className={classes.authLayoutSecondary}>
        <p className={classes.authLayoutText}>{texts.get(location.pathname)}</p>
        <div className={classes.authLayoutImage}>
          <img src={AuthLayoutImage} alt="Cloud File" />
        </div>
        <div className={classes.authLayoutClips}>
          <img src={Clips} alt="Clips" />
        </div>
        <div className={classes.circleTop}></div>
        <div className={classes.circleStart}></div>
      </section>
      <section className={classes.authLayoutContent}>{elements}</section>
    </main>
  );
};

export default ModuleLayout;
