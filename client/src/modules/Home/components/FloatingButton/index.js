import classes from './index.module.css';

const FloatingButton = ({ onClick }) => {
  return (
    <>
      <input
        id="fb-checkbox"
        type="checkbox"
        className={classes.fbCheckbox}
        onClick={onClick}
      />
      <label htmlFor="fb-checkbox" className={classes.floatingBtn}>
        <div className={classes.btnContent}></div>
      </label>
    </>
  );
};

export default FloatingButton;
