import { download, getConfig } from './download';
import build from './build';
import statistics from './statistics';
import fetchVersions from './fetch-versions';

export const cache = {};

export default async function repository(packageName) {
  if (!packageName) {
    return {};
  }
  if (!cache[packageName]) {
    cache[packageName] = {};
  }

  const stats = {};

  for (const version of await fetchVersions(packageName)) {
    if (cache[packageName][version]) {
      stats[version] = cache[packageName][version];
    } else {
      download(packageName, version);
      await build(getConfig());
      stats[version] = {
        name: packageName,
        ...statistics(getConfig())
      };
      cache[packageName][version] = stats[version];
    }
  }
  return stats;
}
