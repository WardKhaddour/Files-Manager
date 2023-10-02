import ReactSelect from 'react-select';
import User from '../User';
import Menu from '../Menu';

const Select = ({ isLoading, onInputChange, data, onChange }) => {
  return (
    <ReactSelect
      onChange={onChange}
      closeMenuOnSelect
      components={{ Option: User, Menu }}
      isMulti
      isLoading={isLoading}
      isSearchable
      onInputChange={data => {
        if (data.length > 3) onInputChange(data);
      }}
      options={data}
      styles={{
        control: (baseStyle, state) => ({
          ...baseStyle,
          outline: '1px solid var(--color-blue-3)',
          borderRadius: '15px',
          padding: '.5rem',
          boxShadow: 'none',
          fontSize: '2rem',
        }),
      }}
    />
  );
};

export default Select;
