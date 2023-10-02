import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';

const generateObjectsOptions = data => {
  if (!data) return undefined;
  return data.map(el => ({
    label: capitalizeFirstLetter(el.name),
    value: el.id,
  }));
};

const generateTextsOptions = data => {
  if (!data) return undefined;
  return data.map(el => ({
    label: capitalizeFirstLetter(el),
    value: el,
  }));
};

export { generateObjectsOptions, generateTextsOptions };
