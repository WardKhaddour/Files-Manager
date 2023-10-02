import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/Button';
import Input from 'components/Input';
import isValidPassword from 'utils/validation/isValidPassword';
import classes from '../../index.module.css';
import { useResetPasswordMutation } from 'modules/Auth/services/passwordApi';
import LoadingSpinner from 'components/LoadingSpinner';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const methods = useForm();
  const { resetToken } = useParams();

  const { errors } = methods.formState;

  const handleSubmit = methods.handleSubmit(data => {
    resetPassword({ data, resetToken }).then(() => {
      navigate({
        pathname: '/courses',
      });
    });
  });

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <div className={classes.page}>
        <h2 className={classes.txt}>Reset your password</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className={classes.form}
            noValidate
          >
            <Input
              id="password"
              label="New Password"
              type="password"
              errorMessage={errors.password?.message}
              validation={{
                required: 'Password is required',
                validate: val =>
                  !isValidPassword(val)
                    ? 'Password must contain: capital letter, small letter, number, special symbol. and to be 8 characters long at least'
                    : true,
              }}
            />
            <Input
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              errorMessage={errors.confirmPassword?.message}
              validation={{
                required: 'Confirm Password is required',
                validate: val =>
                  methods.getValues('password') === val
                    ? true
                    : 'Passwords dose not match',
              }}
            />

            <Button
              className={classes.submitBtn}
              type="submit"
              text="Reset Password"
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ResetPassword;
