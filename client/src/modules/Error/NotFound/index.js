import { Link } from 'react-router-dom';
import Img404 from 'assets/img/404.jpg';
import classes from '../index.module.css';

const NotFound = () => {
  return (
    <main className={classes.page}>
      <section className={classes.content}>
        <h2 className={classes.title}>404</h2>
        <h3 className={classes.subtitle}>Page Not Found</h3>
        <p className={classes.text}>
          The page you request could not be found.
          <br /> Do not worry and return to the previous page.
        </p>
        <div className={classes.actions}>
          <Link to="/" className={classes.linkPrimary}>
            Go Home
          </Link>
          <Link to={-1} className={classes.linkSecondary}>
            Back
          </Link>
        </div>
      </section>
      <section className={classes.img}>
        <img src={Img404} alt="Not Found " />
      </section>
    </main>
  );
};

export default NotFound;
