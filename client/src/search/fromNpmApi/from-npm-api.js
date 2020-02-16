export default function fromNpmApi(values) {
  if (!values || !Array.isArray(values)) {
    return [];
  }
  return values
    .filter(
      value =>
        value.package &&
        value.package.name &&
        typeof value.package.name === 'string' &&
        value.package.version &&
        typeof value.package.version === 'string'
    )
    .map(value => {
      return { name: value.package.name, version: value.package.version };
    });
}
