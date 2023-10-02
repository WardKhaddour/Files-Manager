import ReactSelect from 'react-select';

const Select = ({ options, onChange, initialValue }) => {
  return (
    <ReactSelect
      defaultValue={initialValue}
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
          border: 'none',
          boxShadow: 'none',
          width: '15rem',
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
      onChange={onChange}
    />
  );
};

export default Select;
