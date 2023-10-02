import { useState } from 'react';
import classes from './index.module.css';
import Study from './pages/Study';
import General from './pages/General';
import Security from './pages/Security';
import Danger from './pages/Danger';

const Settings = () => {
  const [selectedPage, setSelectedPage] = useState('general');

  return (
    <section className={classes.settings}>
      <h2 className="title">Settings</h2>
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          <li
            onClick={() => setSelectedPage('general')}
            className={
              selectedPage === 'general'
                ? `${classes.navItem} ${classes.navItemSelected}`
                : classes.navItem
            }
          >
            General
          </li>
          <li
            onClick={() => setSelectedPage('study')}
            className={
              selectedPage === 'study'
                ? `${classes.navItem} ${classes.navItemSelected}`
                : classes.navItem
            }
          >
            Study
          </li>
          <li
            onClick={() => setSelectedPage('security')}
            className={
              selectedPage === 'security'
                ? `${classes.navItem} ${classes.navItemSelected}`
                : classes.navItem
            }
          >
            Security
          </li>
          <li
            onClick={() => setSelectedPage('danger')}
            className={
              selectedPage === 'danger'
                ? `${classes.navItem} ${classes.navItemSelected}`
                : classes.navItem
            }
          >
            Danger
          </li>
        </ul>
      </nav>
      {selectedPage === 'general' && <General />}
      {selectedPage === 'study' && <Study />}
      {selectedPage === 'security' && <Security />}
      {selectedPage === 'danger' && <Danger />}
    </section>
  );
};

export default Settings;
