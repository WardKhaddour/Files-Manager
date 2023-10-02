import NavItem from '../NavItem';
import classes from './index.module.css';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Saved } from 'assets/icons/saved.svg';
import { ReactComponent as Files } from 'assets/icons/files.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';
import { useLogoutMutation } from 'services/accessApi/accessSlice';
import LoadingSpinner from 'components/LoadingSpinner';
import { useLocation } from 'react-router-dom';

const Nav = ({ className }) => {
  const [logout, { isLoading }] = useLogoutMutation();

  const location = useLocation();

  const homeLinks = [
    {
      label: 'Home',
      path: '/courses',
      Icon: Home,
    },
    {
      label: 'Saved',
      path: '/saved',
      Icon: Saved,
    },
    {
      label: 'My Files',
      path: '/my-files',
      Icon: Files,
    },
  ];

  const userLinks = [
    {
      label: 'Settings',
      path: '/settings',
      Icon: Settings,
    },
    {
      label: 'Logout',
      action: logout,
      Icon: Logout,
    },
  ];

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <nav className={`${classes.nav} ${className}`}>
        <ul className={classes.homeLinks}>
          {homeLinks.map(link => (
            <NavItem
              key={link.label}
              {...link}
              selected={location.pathname.startsWith(link.path)}
            />
          ))}
        </ul>
        <ul className={classes.userLinks}>
          {userLinks.map(link => (
            <NavItem
              key={link.label}
              {...link}
              selected={location.pathname === link.path}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
