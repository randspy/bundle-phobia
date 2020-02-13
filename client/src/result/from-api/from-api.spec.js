import fromApi from './from-api';

describe('fromApi', () => {
  test('should create an empty map for missing object', () => {
    expect(fromApi({})).toEqual([]);
  });

  test('should create an empty map for empty object', () => {
    expect(fromApi()).toEqual([]);
  });

  test('should work for one object', () => {
    expect(
      fromApi({
        '14.5.3': {
          name: 'react'
        }
      })
    ).toEqual([{ name: 'react', version: '14.5.3' }]);
  });

  test('should sort many objects', () => {
    expect(
      fromApi({
        '16.12.0': {
          name: 'react'
        },
        '16.5.0': {
          name: 'react'
        },
        '16.7.0': {
          name: 'react'
        },
        '16.8.0': {
          name: 'react'
        },
        '13.12.0': {
          name: 'react'
        }
      })
    ).toEqual([
      { name: 'react', version: '13.12.0' },
      { name: 'react', version: '16.5.0' },
      { name: 'react', version: '16.7.0' },
      { name: 'react', version: '16.8.0' },
      { name: 'react', version: '16.12.0' }
    ]);
  });
});
