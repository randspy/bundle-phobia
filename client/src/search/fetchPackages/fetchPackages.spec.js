import fetchPackages from './fetchPackages';
import fetchFrom from '../../shared/fetch-from/fetch-from';

jest.mock('../../shared/fetch-from/fetch-from');

afterEach(() => {
  fetchFrom.mockReset();
});

describe('fetchPackages', () => {
  test('should return empty array for missing search input', async () => {
    await expect(fetchPackages()).resolves.toEqual([]);
    await expect(fetchFrom).toHaveBeenCalledTimes(0);
  });

  test('should return empty array for empty search input', async () => {
    await expect(fetchPackages('')).resolves.toEqual([]);
    await expect(fetchFrom).toHaveBeenCalledTimes(0);
  });

  test('should return package for a package name', async () => {
    const response = { name: 'React', version: '16.2.1' };
    fetchFrom.mockResolvedValue([
      {
        package: response
      }
    ]);

    await expect(fetchPackages('react')).resolves.toEqual([response]);

    expect(fetchFrom).toHaveBeenCalledTimes(1);
    expect(fetchFrom).toHaveBeenCalledWith(
      'https://api.npms.io/v2/search/suggestions?q=react'
    );
  });

  test('should not call api when name has one character', async () => {
    await expect(fetchPackages('r')).resolves.toEqual([]);

    expect(fetchFrom).toHaveBeenCalledTimes(0);
  });
});
