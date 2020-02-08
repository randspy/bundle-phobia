import axios from 'axios';
import fetchPackages from './fetchPackages'

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


    test('should return packages for a package name', async () => {
        const response = [
            {
                name: 'react',
                describe: 'react is a JavaScript library for building user interfaces',
                version: "16.12.0"
            }
        ];
        axios.get.mockResolvedValue({ data: response });

        await expect(fetchPackages('react')).resolves.toEqual(response);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('https://api.npms.io/v2/search/suggestions?q=react');
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

