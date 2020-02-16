import axios from 'axios';
import fetchFrom from './fetch-from';

jest.mock('axios');

afterEach(() => {
  axios.get.mockReset();
});

describe('fetchFrom', () => {
  test('should rethrow for invalid input', async () => {
    axios.get.mockRejectedValue(new Error('Api error'));

    await expect(fetchFrom('invalid input')).rejects.toThrow('Api error');
    expect(axios.get).toHaveBeenCalledWith('invalid input');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('should return data for a valid input', async () => {
    axios.get.mockResolvedValue({
      data: []
    });

    await expect(
      fetchFrom('https://api.npms.io/v2/search/suggestions?q=react')
    ).resolves.toEqual([]);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.npms.io/v2/search/suggestions?q=react'
    );
  });
});
