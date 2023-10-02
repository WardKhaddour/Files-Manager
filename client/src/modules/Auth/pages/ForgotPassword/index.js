import { FormProvider, useForm } from 'react-hook-form';
import classes from '../../index.module.css';
import Input from 'components/Input';
import isValidEmail from 'utils/validation/isValidEmail';
import { AppLink, Button } from 'components/Button';
import { useForgotPasswordMutation } from 'modules/Auth/services/passwordApi';
import LoadingSpinner from 'components/LoadingSpinner';

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const methods = useForm();
  const { errors } = methods.formState;

  const handleSubmit = methods.handleSubmit(async data => {
    await forgotPassword(data);
  });

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <div className={classes.page}>
        <h2 className={classes.txt}>Forgot your password?</h2>
        <p className={classes.secondaryTxt}>
          Enter your user account's email address and we will send you a
          password reset link.
        </p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Input
              id="email"
              label="Email"
              type="email"
              errorMessage={errors.email?.message}
              validation={{
                required: 'Email is required',
                validate: val =>
                  !isValidEmail(val) ? 'Please input a valid email' : true,
              }}
            />
            <Button className={classes.submitBtn} type="submit" text="Send" />
          </form>
        </FormProvider>
        <AppLink
          to="/auth"
          text="Login"
          type="text"
          className={classes.primaryLink}
        />
      </div>
    </>
  );
};

export default ForgotPassword;
