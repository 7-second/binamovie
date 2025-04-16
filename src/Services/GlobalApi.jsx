// GlobalApi.js
import axios from 'axios';

const moviebaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getTrendingMovies = async () => {
  console.log("GlobalApi: Movie Base URL:", moviebaseUrl);
  console.log("GlobalApi: API Key:", API_KEY);
  try {
    const response = await axios.get(`${moviebaseUrl}/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`);
    console.log("GlobalApi: API Response:", response);
    return response.data;
  } catch (error) {
    console.error("GlobalApi: Error fetching trending movies:", error);
    return null;
  }
};

export default {
  getTrendingMovies
};