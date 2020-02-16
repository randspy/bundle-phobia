import fetchFrom from '../../shared/fetch-from/fetch-from';
import PackageBom from '../package-bom/package-bom';

export default async function fetchPackages(value) {
  if (hasAtLeastTwoCharacters(value)) {
    const response = await fetchFrom(
      `https://api.npms.io/v2/search/suggestions?q=${value}`
    );
    return response && Array.isArray(response)
      ? response.map(item => new PackageBom(item))
      : [];
  }
  return [];
}

function hasAtLeastTwoCharacters(value) {
  return value && value.length > 1;
}
