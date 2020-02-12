import fetchFrom from '../../shared/fetch-from';

export default async function fetchBundles(value) {
  if (value) {
    const response = await fetchFrom(
      `http://localhost:5000/package-history?package=${value}`
    );
    return response ? response : {};
  }

  return {};
}
