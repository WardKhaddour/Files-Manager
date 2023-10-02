import classes from './index.module.css';

const Backdrop = ({ children }) => {
  return <div className={classes.backdrop}>{children}</div>;
};

export default Backdrop;
