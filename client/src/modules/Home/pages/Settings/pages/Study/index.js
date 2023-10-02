import UserStudyForm from 'components/UserStudyForm';
import classes from '../index.module.css';
import { useRef } from 'react';
import { useUpdateMeMutation } from '../../services/settingsSlice';
import LoadingSpinner from 'components/LoadingSpinner';

const Study = () => {
  const ref = useRef();
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const onSubmit = () => {
    const data = ref.current.getData();
    updateMe(data);
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <section className={classes.settingsSection}>
        <h2 className={classes.title}>Edit Study Information</h2>
        <UserStudyForm
          ref={ref}
          onSubmit={onSubmit}
          formClassName={classes.form}
          submitBtnClassName={classes.submitBtn}
          submitBtnText="Save"
        />
      </section>
    </>
  );
};

export default Study;
