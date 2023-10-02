import Nav from './components/Nav';
import User from './components/User';
import { ReactComponent as IconMenu } from 'assets/icons/menu.svg';
import classes from './index.module.css';

const Sidebar = () => {
  return (
    <>
      <input
        id="sidebarCheckbox"
        htmlFor={classes.toggleSidebarCheckbox}
        className={classes.toggleSidebarCheckbox}
        type="checkbox"
      />{' '}
      <label htmlFor="sidebarCheckbox" className={classes.toggleSidebarLabel}>
        <IconMenu />
      </label>
      <section className={classes.sidebar}>
        <User className={classes.sidebarUser} />
        <Nav className={classes.sidebarNav} />
      </section>
    </>
  );
};

export default Sidebar;
