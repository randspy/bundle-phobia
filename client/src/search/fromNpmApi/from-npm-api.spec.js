import fromNpmApi from './from-npm-api';

describe('Validate npm api', () => {
  test('should return empty array for missing input', () => {
    expect(fromNpmApi()).toEqual([]);
  });

  test('should return empty array for object as input', () => {
    expect(fromNpmApi({})).toEqual([]);
  });

  test('should return empty array for empty input', () => {
    expect(fromNpmApi([])).toEqual([]);
  });

  test('should return empty array for missing package', () => {
    expect(fromNpmApi([{}])).toEqual([]);
  });

  test('should return empty array for missing name', () => {
    expect(fromNpmApi([{ package: { version: '16.12.0' } }])).toEqual([]);
  });

  test('should return empty array for missing version', () => {
    expect(fromNpmApi([{ package: { name: 'React' } }])).toEqual([]);
  });

  test('should return empty array for no string name', () => {
    expect(fromNpmApi([{ package: { name: 1, version: '16.12.0' } }])).toEqual(
      []
    );
  });

  test('should return empty array for no version name', () => {
    expect(fromNpmApi([{ package: { name: 'React', version: 16 } }])).toEqual(
      []
    );
  });

  test('should return valid input', () => {
    expect(
      fromNpmApi([{ package: { name: 'React', version: '16.12.0' } }])
    ).toEqual([{ name: 'React', version: '16.12.0' }]);
  });

  test('should return valid input for many values', () => {
    expect(
      fromNpmApi([
        { package: { name: 'React', version: '16.12.0' } },
        { package: { name: 'Vue', version: '2.6.11' } }
      ])
    ).toEqual([
      { name: 'React', version: '16.12.0' },
      { name: 'Vue', version: '2.6.11' }
    ]);
  });
});
