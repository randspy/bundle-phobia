import axios from 'axios';

export default async function fetchFrom(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
}
