import versionSort from 'version-sort';

export default function fromApi(value) {
  if (!value) {
    return [];
  }
  return addPercentageOffMaxSize(
    sort(limitItems(reverseSort(convertToArray(value))))
  );
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

function reverseSort(values) {
  values = sort(values);
  values.reverse();
  return values;
}

function limitItems(values) {
  if (!values.length) {
    return values;
  }

  const main = values.shift();
  const maxNumberOfMinors = 3;
  const maxNumberOfMajors = 1;
  const minors = getValuesFor(isMinor, main, values, maxNumberOfMinors);
  const majors = getValuesFor(isMajor, main, values, maxNumberOfMajors);

  return [main, ...minors, ...majors];
}

function getValuesFor(type, main, values, number) {
  const result = [];
  for (let value of values) {
    if (type(main, value) && result.length < number) {
      result.push(value);
    }
  }

  return result;
}

function isMinor(main, value) {
  return main.version.split('.')[0] === value.version.split('.')[0];
}

function isMajor(main, value) {
  return !isMinor(main, value);
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
