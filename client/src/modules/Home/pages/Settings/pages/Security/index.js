import { FormProvider, useForm } from 'react-hook-form';
import classes from '../index.module.css';
import Input from 'components/Input';
import { Button } from 'components/Button';
import isValidPassword from 'utils/validation/isValidPassword';
import { useUpdatePasswordMutation } from '../../services/settingsSlice';
import LoadingSpinner from 'components/LoadingSpinner';

const Security = () => {
  const methods = useForm();
  const { errors } = methods.formState;
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = data => {
    updatePassword(data);
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <section className={classes.settingsSection}>
        <h2 className={classes.title}>Edit Password</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className={classes.form}
            noValidate
          >
            <Input
              id="currentPassword"
              label="Current Password"
              type="password"
              errorMessage={errors.currentPassword?.message}
              validation={{
                required: 'Password is required',
                validate: val =>
                  !isValidPassword(val)
                    ? 'Password must contain: capital letter, small letter, number, special symbol. and to be 8 characters long at least'
                    : true,
              }}
            />
            <Input
              id="newPassword"
              label="New Password"
              type="password"
              errorMessage={errors.newPassword?.message}
              validation={{
                required: 'Password is required',
                validate: val =>
                  !isValidPassword(val)
                    ? 'Password must contain: capital letter, small letter, number, special symbol. and to be 8 characters long at least'
                    : true,
              }}
            />
            <Input
              id="confirmNewPassword"
              label="Confirm Password"
              type="password"
              errorMessage={errors.confirmNewPassword?.message}
              validation={{
                required: 'Confirm Password is required',
                validate: val =>
                  methods.getValues('newPassword') === val
                    ? true
                    : 'Passwords dose not match',
              }}
            />
            <Button className={classes.submitBtn} type="submit">
              Save Changes
            </Button>
          </form>
        </FormProvider>
      </section>
    </>
  );
};

export default Security;
