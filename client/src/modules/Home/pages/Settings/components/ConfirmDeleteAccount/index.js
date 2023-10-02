import classes from './index.module.css';
import SecondaryButton from 'components/SecondaryButton';
import { ReactComponent as IconDanger } from 'assets/icons/icon-danger.svg';
import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { ReactComponent as IconCheck } from 'assets/icons/icon-check.svg';

const ConfirmDeleteAccount = ({ onClose, onConfirm }) => {
  return (
    <div className={classes.container}>
      <div className={classes.deleteAccountConfirm}>
        <div className={classes.title}>
          <div className={classes.iconDanger}>
            <IconDanger />
          </div>
          <h2>Do you want to delete your account</h2>
        </div>
        <hr />
        <div className={classes.actions}>
          <SecondaryButton className={classes.btn} onClick={onClose}>
            <IconClose />
            <span>Close</span>
          </SecondaryButton>
          <SecondaryButton className={classes.btn} onClick={onConfirm}>
            <IconCheck />
            <span>Confirm</span>
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccount;
