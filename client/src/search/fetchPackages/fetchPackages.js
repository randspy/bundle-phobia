import axios from 'axios';
import PackageBom from '../package-bom/package-bom';

export default async function fetchPackages(value) {
  if (value && value.length > 1) {
    try {
      const url = `https://api.npms.io/v2/search/suggestions?q=${value}`;
      const response = await axios.get(url);
      return response.data && Array.isArray(response.data)
        ? response.data.map(item => new PackageBom(item))
        : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  return [];
}
