import { FormProvider, useForm } from 'react-hook-form';
import Input from 'components/Input';
import SecondaryButton from 'components/SecondaryButton';
import isValidPassword from 'utils/validation/isValidPassword';
import { useState } from 'react';
import ConfirmDeleteAccount from '../../components/ConfirmDeleteAccount';

import classes from '../index.module.css';
import { useDeleteMeMutation } from '../../services/settingsSlice';
import LoadingSpinner from 'components/LoadingSpinner';

const Danger = () => {
  const methods = useForm();
  const { errors } = methods.formState;

  const [confirmDeleteAccountShown, setConfirmDeleteAccountShown] =
    useState(false);

  const [deleteMe, { isLoading }] = useDeleteMeMutation();

  const handleCloseDeleteConfirm = () => {
    setConfirmDeleteAccountShown(false);
  };

  const handleDeleteAccount = () => {
    const password = methods.getValues('password');
    deleteMe({ password });
    setConfirmDeleteAccountShown(false);
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen />}
      <div className={classes.settingsSection}>
        {confirmDeleteAccountShown && (
          <ConfirmDeleteAccount
            onConfirm={handleDeleteAccount}
            onClose={handleCloseDeleteConfirm}
          />
        )}
        <h2 className={classes.title}>Delete My Account</h2>
        <FormProvider {...methods}>
          <form
            className={classes.form}
            onSubmit={methods.handleSubmit(() =>
              setConfirmDeleteAccountShown(true)
            )}
          >
            <Input
              id="password"
              label="Password"
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
            <SecondaryButton
              text="Delete Account"
              className={classes.secondaryButton}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Danger;
