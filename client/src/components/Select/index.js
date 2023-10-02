import ReactSelect from 'react-select';
import classes from './index.module.css';
import { Controller, useFormContext } from 'react-hook-form';

const Select = ({ options, label, id, required, onChange, loading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const rules = {};
  if (required) {
    rules.required = `${label} is required`;
  }

  return (
    <Controller
      control={control}
      name={id}
      rules={rules}
      render={({ field }) => (
        <div className={classes.select}>
          <label>{label}</label>
          <ReactSelect
            {...field}
            isLoading={loading}
            onChange={value => {
              field.onChange(value);
              if (onChange) onChange();
            }}
            options={options}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary50: 'var(--color-grey-3)',
                primary25: 'var(--color-grey-1)',
                primary: 'var(--color-blue-6)',
              },
            })}
            styles={{
              control: (baseStyle, state) => ({
                ...baseStyle,
                outline: '1px solid var(--color-blue-3)',
                borderRadius: '20px',
                padding: '.5rem',
                boxShadow: 'none',
                fontSize: '2rem',
              }),
              singleValue: (baseStyle, state) => ({
                ...baseStyle,
                color: ' var(--color-grey-2)',
                fontWeight: 'bold',
              }),
              menu: (baseStyle, state) => ({
                ...baseStyle,
                color: ' var(--color-grey-2)',
                padding: '5px',
              }),
              option: (baseStyle, state) => ({
                ...baseStyle,
                borderRadius: '10px',
                margin: '3px 0',
              }),
            }}
          />
          <p className={classes.errorMessage}>{errors[id]?.message}</p>
        </div>
      )}
    />
  );
};

export default Select;
