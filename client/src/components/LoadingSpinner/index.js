import Backdrop from 'components/Backdrop';
import classes from './index.module.css';
import { createPortal } from 'react-dom';

const LoadingSpinner = ({ fullScreen }) => {
  if (fullScreen) {
    return createPortal(
      <Backdrop>
        <div className={classes.loadingSpinner}></div>
      </Backdrop>,
      document.getElementById('backdrop-root')
    );
  }
  return <div className={classes.loadingSpinner}></div>;
};

export default LoadingSpinner;
