import fetchFrom from '../../shared/fetch-from/fetch-from';
import fromNpmApi from '../fromNpmApi/from-npm-api';

export default async function fetchPackages(value) {
  if (hasAtLeastTwoCharacters(value)) {
    const response = await fetchFrom(
      `https://api.npms.io/v2/search/suggestions?q=${value}`
    );
    return fromNpmApi(response);
  }
  return [];
}

function hasAtLeastTwoCharacters(value) {
  return value && value.length > 1;
}
