import axios from 'axios';
import limitedBundleVersions from './limited-bundle-versions';

export default async function fetchVersions(packageName) {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/${packageName}`
    );

    const versions = Object.keys(response.data.versions);
    return limitedBundleVersions(versions);
  } catch (error) {
    return [];
  }
}
