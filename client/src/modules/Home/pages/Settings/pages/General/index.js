import { FormProvider, useForm } from 'react-hook-form';
import classes from '../index.module.css';
import isValidEmail from 'utils/validation/isValidEmail';
import Input from 'components/Input';
import { Button } from 'components/Button';
import SecondaryButton from 'components/SecondaryButton';
import {
  useResendConfirmTokenMutation,
  useUpdateMeMutation,
} from '../../services/settingsSlice';
import LoadingSpinner from 'components/LoadingSpinner';
import UpdatePhoto from '../../components/UpdatePhoto';
import { useAuthStatQuery } from 'services/accessApi/accessSlice';

const General = () => {
  const methods = useForm();
  const { errors } = methods.formState;
  const { data } = useAuthStatQuery();
  const { user } = data;
  const { name, email, emailIsConfirmed } = user;
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [resendConfirmToken, { isLoading: confirmTokenLoading }] =
    useResendConfirmTokenMutation();

  const onSubmit = data => {
    updateMe(data);
  };

  const handleResendConfirmToken = () => {
    resendConfirmToken({ email });
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <section className={classes.settingsSection}>
        {!emailIsConfirmed && (
          <div className={classes.secondaryAction}>
            <p className={classes.secondaryActionTxt}>
              Your email is not confirmed, Click the below button to send you
              email confirmation link:
            </p>
            <SecondaryButton
              text="Get Confirm Email Link"
              onClick={handleResendConfirmToken}
              disabled={confirmTokenLoading}
            />
          </div>
        )}
        <h2 className={classes.title}>Update Your Photo</h2>
        <UpdatePhoto />
        <h2 className={classes.title}>Edit General Information</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={classes.form}
            noValidate
          >
            <Input
              id="name"
              label="Name"
              type="name"
              errorMessage={errors.name?.message}
              validation={{
                required: 'Name is required',
              }}
              initialValue={name}
            />
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
              initialValue={email}
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

export default General;
