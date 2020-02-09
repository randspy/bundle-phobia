import axios from 'axios';
import fetchPackages from './fetchPackages';
import PackageBom from '../package-bom/package-bom';

jest.mock('axios');

afterEach(() => {
  axios.get.mockReset();
});

describe('FetchPackages', () => {
  test('should return empty array for missing search input', async () => {
    await expect(fetchPackages()).resolves.toEqual([]);
  });

  test('should return empty array for empty search input', async () => {
    await expect(fetchPackages('')).resolves.toEqual([]);
  });

  test('should return empty array for missing data', async () => {
    axios.get.mockResolvedValue({});

    await expect(fetchPackages('react')).resolves.toEqual([]);
  });

  test('should return empty array for invalid data', async () => {
    axios.get.mockResolvedValue({ data: {} });

    await expect(fetchPackages('react')).resolves.toEqual([]);
  });

  test('should return package for a package name', async () => {
    const response = new PackageBom({ package: { name: 'React' } });
    axios.get.mockResolvedValue({
      data: [
        {
          package: { name: 'React' }
        }
      ]
    });

    await expect(fetchPackages('react')).resolves.toEqual([response]);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.npms.io/v2/search/suggestions?q=react'
    );
  });

  test('should not call api when name has one character', async () => {
    await expect(fetchPackages('r')).resolves.toEqual([]);

    expect(axios.get).toHaveBeenCalledTimes(0);
  });

  test('should return empty array on thrown error from the api', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    axios.get.mockRejectedValue(new Error('Api error'));

    await expect(fetchPackages('react')).resolves.toEqual([]);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});
