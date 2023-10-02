import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { setNotificationStatus } from 'store/notification';
import classes from './index.module.css';
import { useCallback, useEffect } from 'react';

const Notification = () => {
  const dispatch = useDispatch();
  const { isShown, isSuccess, content, noTimeout } = useSelector(
    state => state.notification
  );

  const handleCloseNotification = useCallback(() => {
    dispatch(
      setNotificationStatus({
        isShown: false,
        content: '',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (noTimeout) {
      return;
    }
    const timer = setTimeout(() => {
      if (isShown) {
        handleCloseNotification();
      }
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [isShown, dispatch, handleCloseNotification, noTimeout]);

  const classesNames = [classes.notification];
  if (isShown) classesNames.push(classes.shown);
  if (isSuccess) classesNames.push(classes.success);
  else classesNames.push(classes.fail);

  return createPortal(
    <div className={classesNames.join(' ')}>
      <p>{content}</p>
      <button onClick={handleCloseNotification} className={classes.close}>
        <IconClose />
      </button>
    </div>,
    document.getElementById('notification-root')
  );
};

export default Notification;
