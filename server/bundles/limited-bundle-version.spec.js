import limitedBundleVersions from './limited-bundle-versions';

describe('limitedBundleVersions', () => {
  test('should do nothing for missing version list', () => {
    expect(limitedBundleVersions()).toEqual(undefined);
  });

  test('should do nothing for empty version list', () => {
    expect(limitedBundleVersions([])).toEqual([]);
  });

  test('should return single version', () => {
    expect(limitedBundleVersions(['16.3.4'])).toEqual(['16.3.4']);
  });

  test('should work when version starts with v', () => {
    expect(limitedBundleVersions(['v16.3.4'])).toEqual(['v16.3.4']);
  });

  test('should ignore when version is pre-release', () => {
    expect(limitedBundleVersions(['v16.3.4-beta'])).toEqual([]);
  });

  test('should ignore invalid versions', () => {
    expect(limitedBundleVersions(['v16.3er.4'])).toEqual([]);
  });

  test('should return last two majors', () => {
    expect(limitedBundleVersions(['15.3.4', '16.3.4', '14.3.2'])).toEqual([
      '16.3.4',
      '15.3.4'
    ]);
  });

  test('should return last major and three last minor versions', () => {
    expect(
      limitedBundleVersions(['15.9.4', '15.3.4', '15.6.2', '15.6.3', '15.1.1'])
    ).toEqual(['15.9.4', '15.6.3', '15.6.2', '15.3.4']);
  });

  test.skip('should return 2 last major and 3 last minor versions', () => {
    expect(
      limitedBundleVersions([
        '16.5.0',
        '16.4.0',
        '16.1.0',
        '16.2.0',
        '16.9.0',
        '15.4.2',
        '13.4.2',
        '16.6.0'
      ])
    ).toEqual(['15.4.2', '16.4.0', '16.5.0', '16.6.0', '16.9.0']);
  });
});
