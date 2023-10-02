import { Link } from 'react-router-dom';
import Img500 from 'assets/img/500.jpg';
import classes from '../index.module.css';

const ErrorElement = () => {
  return (
    <main className={classes.page}>
      <section className={classes.img}>
        <img src={Img500} alt="Not Found " />
      </section>
      <section className={classes.content}>
        <h3 className={classes.subtitle}>Something went wrong!</h3>
        <p className={classes.text}>Please try again later</p>
        <div className={classes.actions}>
          <Link to={0} className={classes.linkPrimary}>
            Refresh
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ErrorElement;
