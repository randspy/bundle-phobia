import fetchFrom from '../../../shared/fetch-from';

export default async function fetchBundles(name, version) {
  if (name && version) {
    const response = await fetchFrom(
      `http://localhost:5000/package-history?name=${name}&version=${version}`
    );
    return response ? response : {};
  }

  return {};
}
