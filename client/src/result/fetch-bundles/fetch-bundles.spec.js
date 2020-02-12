import fetchFrom from '../../shared/fetch-from';
import fetchBundles from './fetch-bundles';

jest.mock('../../shared/fetch-from');

afterEach(() => {
  fetchFrom.mockReset();
});

describe('fetchBundles', () => {
  test('should return empty object for missing search input', async () => {
    await expect(fetchBundles()).resolves.toEqual({});
  });

  test('should return empty object for empty search input', async () => {
    await expect(fetchBundles('')).resolves.toEqual({});
  });

  test('should return empty object for invalid data', async () => {
    fetchFrom.mockResolvedValue(null);

    await expect(fetchBundles('react')).resolves.toEqual({});
  });

  test('should return bundles for a package name', async () => {
    const response = {
      '1.1.2': {}
    };

    fetchFrom.mockResolvedValue(response);

    await expect(fetchBundles('react')).resolves.toEqual(response);

    expect(fetchFrom).toHaveBeenCalledTimes(1);
    expect(fetchFrom).toHaveBeenCalledWith(
      'http://localhost:5000/package-history?package=react'
    );
  });
});
