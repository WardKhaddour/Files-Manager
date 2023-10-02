import { components } from 'react-select';
import classes from './index.module.css';

const Menu = props => {
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < 2 ? (
        props.children
      ) : (
        <div className={classes.maxLimit}>Max limit achieved</div>
      )}
    </components.Menu>
  );
};

export default Menu;
