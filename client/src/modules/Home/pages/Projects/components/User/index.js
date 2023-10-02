import { components } from 'react-select';
import classes from './index.module.css';

const User = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className={classes.user}>
        <div className={classes.userEmail}>{props.data.email}</div>
        <div className={classes.userPhoto}>
          <img src={props.data.photo} crossOrigin="anonymous" alt="" />
        </div>
        <div className={classes.userName}>{children}</div>
      </div>
    </components.Option>
  );
};
export default User;
