import heroSrc from 'assets/img/landing-img.svg';
import { AppLink } from 'components/Button';
import classes from './index.module.css';

function LandingPage() {
  return (
    <main className={classes.page}>
      <section className={classes.main}>
        <h2 className={classes.title}>
          All your files and lectures
          <br />
          in one safe place
        </h2>
        <p className={classes.paragraph}>
          Free storage for all. Store your <br /> files and get all your
          lectures.
        </p>
        <AppLink to="/auth" text="Get Started Now!" />
      </section>
      <section className={classes.img}>
        <img src={heroSrc} alt="man holding big file" />
      </section>
    </main>
  );
}
export default LandingPage;
