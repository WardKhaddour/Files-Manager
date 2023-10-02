import { useAuthStatQuery } from 'services/accessApi/accessSlice';
import classes from './index.module.css';

const User = ({ className }) => {

  const { data } = useAuthStatQuery();
  const { name, photo } = data.user;
  return (
    <div className={`${classes.user} ${className}`}>
      <div className={classes.avatar}>
        <img src={photo} alt="user name" crossOrigin="anonymous" />
      </div>
      <h4 className={classes.username}> {name}</h4>
    </div>
  );
};
export default User;
