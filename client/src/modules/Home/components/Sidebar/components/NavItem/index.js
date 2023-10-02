import { Link } from 'react-router-dom';
import classes from './index.module.css';

const NavItemContent = ({ label, Icon }) => {
  return (
    <div className={classes.navItemContent}>
      <span className={classes.navItemContentIcon}>
        <Icon />
      </span>
      <span className={classes.navItemContentLabel}>{label}</span>
    </div>
  );
};

const NavItem = ({ label, Icon, path, action, selected }) => {
  return (
    <li className={`${classes.navItem} ${selected ? classes.selected : ''}`}>
      {path && (
        <Link className={classes.navItemLink} to={path}>
          <NavItemContent label={label} Icon={Icon} />
        </Link>
      )}
      {action && (
        <button
          onClick={action}
          className={`${classes.navItemButton} ${classes.navItemLink}`}
        >
          <NavItemContent label={label} Icon={Icon} />
        </button>
      )}
    </li>
  );
};

export default NavItem;
