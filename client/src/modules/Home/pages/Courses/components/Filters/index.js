import { useSearchParams } from 'react-router-dom';
import Select from '../Select';
import classes from './index.module.css';
import generateYearsOptions from 'utils/generateYearsOptions';
import { generateTextsOptions } from 'utils/generateOptions';

const Filters = ({ sections, years, section, year }) => {
  const [, setSearchParams] = useSearchParams();

  sections = sections && generateTextsOptions(sections);
  years = years && generateYearsOptions(years);

  const initialSection = sections?.find(el => el.value === section);
  const initialYear = years?.find(el =>  el.value === year)
  const onYearChange = data => {
    setSearchParams(prev => {
      prev.set('year', data.value);
      return prev;
    });
  };
  const onSectionChange = data => {
    setSearchParams(prev => {
      prev.set('section', data.value);
      return prev;
    });
  };
  return (
    <div className={classes.filters}>
      <span className={classes.filterBy}>Filter by:</span>
      <Select
        initialValue={initialYear}
        options={years}
        onChange={onYearChange}
      />
      <Select
        initialValue={initialSection}
        options={sections}
        onChange={onSectionChange}
      />
    </div>
  );
};

export default Filters;
