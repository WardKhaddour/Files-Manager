import classes from './index.module.css';

const Button = ({ text, type, className, children }) => {
  return (
    <button type={type || 'submit'} className={`${classes.btn} ${className}`}>
      {text || children}
    </button>
  );
};

export default Button;
