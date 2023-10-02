import byteSize from 'byte-size';

const byteToString = size => {
  const customUnits = {
    simple: [
      { from: 0, to: 1e3, unit: 'B' },
      { from: 1e3, to: 1e6, unit: 'KB', long: 'thousand' },
      { from: 1e6, to: 1e9, unit: 'MB', long: 'million' },
      { from: 1e9, to: 1e12, unit: 'GB', long: 'billion' },
      { from: 1e12, to: 1e15, unit: 'TB', long: 'trillion' },
    ],
  };
  return byteSize(size, {
    customUnits,
    units: 'simple',
  }).toString();
};

export default byteToString;
