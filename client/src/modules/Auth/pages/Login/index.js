import { FormProvider, useForm } from 'react-hook-form';
import { AppLink, Button } from 'components/Button';
import Input from 'components/Input';
import classes from '../../index.module.css';
import isValidEmail from 'utils/validation/isValidEmail';
import isValidPassword from 'utils/validation/isValidPassword';
import { useLoginMutation } from 'modules/Auth/services/authApi';
import LoadingSpinner from 'components/LoadingSpinner';

const Login = () => {
  const methods = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const { errors } = methods.formState;

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <div className={classes.page}>
        <h2 className={classes.txt}>Login to your account</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(login)}
            className={classes.form}
            noValidate
          >
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
            <Input
              id="password"
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
              validation={{
                required: 'Password is required',
                validate: val =>
                  !isValidPassword(val)
                    ? 'Please input a valid password'
                    : true,
              }}
            />
            <AppLink
              type="text"
              to="/auth/forgot-password"
              text="Forgot your password?"
              className={classes.secondaryLink}
            />
            <Button className={classes.submitBtn} type="submit" text="Login" />
          </form>
        </FormProvider>
        <AppLink
          to="/auth/signup"
          text="Signup"
          type="text"
          className={classes.primaryLink}
        />
      </div>
    </>
  );
};

export default Login;
