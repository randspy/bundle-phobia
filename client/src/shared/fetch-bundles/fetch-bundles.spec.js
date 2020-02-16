import fetchFrom from '../fetch-from/fetch-from';
import fetchBundles from './fetch-bundles';

jest.mock('../fetch-from/fetch-from');

afterEach(() => {
  fetchFrom.mockReset();
});

describe('fetchBundles', () => {
  test('should return empty object for missing search input', async () => {
    await expect(fetchBundles()).resolves.toEqual({});
    await expect(fetchFrom).toHaveBeenCalledTimes(0);
  });

  test('should return empty object for empty name', async () => {
    await expect(fetchBundles('', '1.1.0')).resolves.toEqual({});
    await expect(fetchFrom).toHaveBeenCalledTimes(0);
  });

  test('should return empty object for invalid data', async () => {
    fetchFrom.mockResolvedValue(null);

    await expect(fetchBundles('react')).resolves.toEqual({});
    await expect(fetchFrom).toHaveBeenCalledTimes(1);
  });

  test('should return bundles for a package name', async () => {
    const response = {
      '1.1.2': {}
    };

    fetchFrom.mockResolvedValue(response);

    await expect(fetchBundles('react')).resolves.toEqual(response);

    expect(fetchFrom).toHaveBeenCalledTimes(1);
    expect(fetchFrom).toHaveBeenCalledWith(
      'http://localhost:5000/package-history?name=react'
    );
  });
});
