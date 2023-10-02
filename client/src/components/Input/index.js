import { useFormContext } from 'react-hook-form';
import classes from './index.module.css';
import { useState } from 'react';

import { ReactComponent as ShowPasswordIcon } from 'assets/icons/closed-eye.svg';

import { ReactComponent as HidePasswordIcon } from 'assets/icons/open-eye.svg';

const Input = ({
  id,
  validation,
  label,
  errorMessage,
  initialValue,
  type = 'text',
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { register } = useFormContext();
  let inputType;

  if (type === 'email') inputType = 'email';
  else if (type === 'text') inputType = 'text';
  else if (type === 'password' && passwordShown) inputType = 'text';
  else if (type === 'password' && !passwordShown) inputType = 'password';
  const inputClasses = errorMessage
    ? `${classes.formControlInput} 
    ${classes.formControlInputInvalid} `
    : `${classes.formControlInput}`;
  const toggleShowPassword = () => {
    setPasswordShown(prevPasswordShown => !prevPasswordShown);
  };

  return (
    <div className={classes.formControl}>
      <label className={classes.formControlLabel} htmlFor={id}>
        {label}
      </label>
      <div className={classes.inputWrapper}>
        <input
          defaultValue={initialValue}
          className={inputClasses}
          type={inputType}
          id={id}
          {...register(id, validation)}
        />
        {type === 'password' && (
          <div
            onClick={toggleShowPassword}
            className={classes.toggleShowPassword}
          >
            {!passwordShown && <ShowPasswordIcon />}
            {passwordShown && <HidePasswordIcon />}
          </div>
        )}
      </div>
      {errorMessage && (
        <p className={classes.formControlInputInvalidMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
