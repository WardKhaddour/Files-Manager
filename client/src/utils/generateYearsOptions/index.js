import toWordsOrdinal from 'number-to-words/src/toWordsOrdinal';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';

const generateYearsOptions = yearsNm => {
  if (!yearsNm) return undefined;
  return Array.from({ length: yearsNm }, (_, a) => a + 1).map(el => ({
    label: capitalizeFirstLetter(toWordsOrdinal(el)),
    value: el,
  }));
};

export default generateYearsOptions;
