import sort from 'version-sort';

export default function fromApi(value) {
  if (!value) {
    return [];
  }
  return sort(
    Object.entries(value).map(item => ({
      version: item[0],
      ...item[1]
    })),
    { nested: 'version' }
  );
}
