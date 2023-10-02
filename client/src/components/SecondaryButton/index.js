import classes from './index.module.css';

const SecondaryButton = ({
  text,
  type,
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type || 'submit'}
      className={`${classes.btn} ${className} ${
        disabled ? classes.disabled : ''
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

export default SecondaryButton;
