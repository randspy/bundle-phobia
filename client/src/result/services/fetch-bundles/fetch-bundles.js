import fetchFrom from '../../../shared/fetch-from';

export default async function fetchBundles(name) {
  if (name) {
    const response = await fetchFrom(
      `http://localhost:5000/package-history?name=${name}`
    );
    return response ? response : {};
  }

  return {};
}
