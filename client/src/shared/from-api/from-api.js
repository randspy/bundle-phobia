import versionSort from 'version-sort';

export default function fromApi(value) {
  if (!value) {
    return [];
  }
  return addPercentageOffMaxSize(sort(convertToArray(value)));
}

function convertToArray(values) {
  return Object.entries(values).map(item => ({
    version: item[0],
    ...item[1]
  }));
}

function sort(values) {
  return versionSort(values, { nested: 'version' });
}

function addPercentageOffMaxSize(values) {
  let max = 0;
  for (let value of values) {
    if (value.minified > max) {
      max = value.minified;
    }
  }

  return values.map(value => {
    if (value.minified) {
      value.minifiedPercentage = `${calculatePercentage(value.minified, max)}%`;
    }
    if (value.gzip) {
      value.gzipPercentage = `${calculatePercentage(value.gzip, max)}%`;
    }

    return value;
  });
}

function calculatePercentage(value, max) {
  if (!max) {
    return 100;
  }
  return ((value / max) * 100).toFixed(0);
}
