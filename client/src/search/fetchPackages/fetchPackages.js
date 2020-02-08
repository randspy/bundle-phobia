import axios from 'axios';

export default async function fetchPackages(value) {
    if (value && value.length > 1) {
        try {
            const url = `https://api.npms.io/v2/search/suggestions?q=${value}`
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }

    }
    return [];
}