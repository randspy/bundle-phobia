import semver from 'semver';
import sort from 'semver-sort';

export default function limitedBundleVersions(versions) {
  if (!versions) {
    return versions;
  }

  versions = versions.filter(
    version => semver.valid(version) && semver.prerelease(version) == null
  );

  if (!versions.length) {
    return versions;
  }

  const maxNumberOfMinors = 3;
  const maxNumberOfMajors = 1;
  versions = sort.desc(versions);

  const headVersion = versions.shift();
  const minors = getLimitedBundleVersionsFor(
    isMinor,
    headVersion,
    versions,
    maxNumberOfMinors
  );
  const majors = getLimitedBundleVersionsFor(
    isMajor,
    headVersion,
    versions,
    maxNumberOfMajors
  );

  return [headVersion, ...minors, ...majors];
}

function isMinor(headVersion, value) {
  return headVersion.split('.')[0] === value.split('.')[0];
}

function isMajor(headVersion, value) {
  return !isMinor(headVersion, value);
}

function getLimitedBundleVersionsFor(type, headVersion, values, number) {
  const result = [];
  for (let value of values) {
    if (type(headVersion, value) && result.length < number) {
      result.push(value);
    }
  }

  return result;
}
