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

  test('should limit to 3 minor and 1 major version', () => {
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
        '16.1.0': {
          name: 'react'
        },
        '13.12.0': {
          name: 'react'
        },
        '11.12.0': {
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

  describe('addPercentageOffMaxSize', () => {
    test('should add percentage of max size', () => {
      expect(
        fromApi({
          '14.5.3': {
            name: 'react',
            minified: 10,
            gzip: 5
          }
        })
      ).toEqual([
        {
          name: 'react',
          version: '14.5.3',
          minified: 10,
          minifiedPercentage: '100%',
          gzip: 5,
          gzipPercentage: '50%'
        }
      ]);
    });

    test('should not break on minified equal 0', () => {
      expect(
        fromApi({
          '14.5.3': {
            name: 'react',
            minified: 0,
            gzip: 1
          }
        })
      ).toEqual([
        {
          name: 'react',
          version: '14.5.3',
          minified: 0,
          gzip: 1,
          gzipPercentage: '100%'
        }
      ]);
    });

    test('should add percentage of max size for many bundles', () => {
      expect(
        fromApi({
          '14.5.3': {
            name: 'react',
            minified: 10,
            gzip: 5
          },
          '14.6.3': {
            name: 'react',
            minified: 30,
            gzip: 8
          }
        })
      ).toEqual([
        {
          name: 'react',
          version: '14.5.3',
          minified: 10,
          minifiedPercentage: '33%',
          gzip: 5,
          gzipPercentage: '17%'
        },
        {
          name: 'react',
          version: '14.6.3',
          minified: 30,
          minifiedPercentage: '100%',
          gzip: 8,
          gzipPercentage: '27%'
        }
      ]);
    });
  });
});
