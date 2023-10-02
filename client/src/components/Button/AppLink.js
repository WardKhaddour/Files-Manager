import { Link } from 'react-router-dom';
import classes from './index.module.css';

const AppLink = ({ text, to, type, className }) => {
  let linkClasses = classes.btn;
  if (type === 'text') {
    linkClasses = classes.linkText;
  }

  return (
    <Link to={to} className={`${linkClasses} ${className}`}>
      {text}
    </Link>
  );
};

export default AppLink;
