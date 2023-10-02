import { forwardRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppLink } from 'components/Button';

import UserStudyForm from 'components/UserStudyForm';
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_back.svg';
import classes from '../../../index.module.css';

const SignupSecondPage = forwardRef(({ initialData, onSubmit }, ref) => {
  if (!initialData || Object.keys(initialData).length === 0) {
    return <Navigate to="/auth/signup" />;
  }

  return (
    <div className={classes.page}>
      <h2 className={classes.txt}>
        <span>
          <Link to={-1} className={classes.backLink}>
            <ArrowBack />
          </Link>
        </span>
        <span>Create account</span>
      </h2>

      <UserStudyForm
        ref={ref}
        formClassName={classes.form}
        onSubmit={onSubmit}
        submitBtnClassName={classes.submitBtn}
        submitBtnText="Signup"
      />

      <p className={classes.primaryLinkText}>
        Already have an account?
        <AppLink
          to="/auth"
          text="Login"
          type="text"
          className={classes.primaryLink}
        />
      </p>
    </div>
  );
});

export default SignupSecondPage;
