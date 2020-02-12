import fetchPackages from './fetchPackages';
import fetchFrom from '../../shared/fetch-from';
import PackageBom from '../package-bom/package-bom';

jest.mock('../../shared/fetch-from');

afterEach(() => {
  fetchFrom.mockReset();
});

describe('fetchPackages', () => {
  test('should return empty array for missing search input', async () => {
    await expect(fetchPackages()).resolves.toEqual([]);
  });

  test('should return empty array for empty search input', async () => {
    await expect(fetchPackages('')).resolves.toEqual([]);
  });

  test('should return empty array for invalid data', async () => {
    fetchFrom.mockResolvedValue({});

    await expect(fetchPackages('react')).resolves.toEqual([]);
  });

  test('should return package for a package name', async () => {
    const response = new PackageBom({ package: { name: 'React' } });
    fetchFrom.mockResolvedValue([
      {
        package: { name: 'React' }
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
