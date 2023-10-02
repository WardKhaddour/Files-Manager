import { FormProvider, useForm } from 'react-hook-form';
import { AppLink, Button } from 'components/Button';
import { ReactComponent as ArrowNext } from 'assets/icons/arrow-next.svg';
import Input from 'components/Input';
import classes from '../../../index.module.css';
import isValidEmail from 'utils/validation/isValidEmail';
import isValidPassword from 'utils/validation/isValidPassword';
import { forwardRef, useImperativeHandle } from 'react';

const SignupFirstPage = forwardRef(({ initialData, onSubmit }, ref) => {
  const methods = useForm({ defaultValues: initialData });
  useImperativeHandle(ref, () => ({
    getData() {
      return methods.getValues();
    },
  }));

  const { errors } = methods.formState;

  return (
    <div className={classes.page}>
      <h2 className={classes.txt}>Create account</h2>
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
                  ? 'Password must contain: capital letter, small letter, number, special symbol. and to be 8 characters long at least'
                  : true,
            }}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
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

          <Button className={classes.submitBtn} type="submit">
            <span>Next</span>
            <span className={classes.btnIcon}>
              <ArrowNext />
            </span>
          </Button>
        </form>
      </FormProvider>
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

export default SignupFirstPage;
