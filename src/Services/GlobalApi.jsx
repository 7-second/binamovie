// GlobalApi.js (Assuming it's in src/Services)
import axios from 'axios';

const moviebaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const movieGenreBaseUrl = "https://api.themoviedb.org/3/discover/movie";
const genreListUrl = "https://api.themoviedb.org/3/genre/movie/list";
const searchBaseUrl = "https://api.themoviedb.org/3/search/multi";
const detailsBaseUrl = "https://api.themoviedb.org/3";

const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${moviebaseUrl}/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data;
  } catch (error) {
    console.error("GlobalApi: Error fetching trending movies:", error);
    return null;
  }
};

const getGenreID = async (genreId, page = 1) => {
  try {
    const response = await axios.get(`${movieGenreBaseUrl}?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`GlobalApi: Error fetching movies with genre ID ${genreId} on page ${page}:`, error);
    return null;
  }
};

const getAllGenres = async () => {
  try {
    const response = await axios.get(`${genreListUrl}?api_key=${API_KEY}&language=en-US`);
    return response.data.genres; // Returns an array of genre objects { id, name }
  } catch (error) {
    console.error("GlobalApi: Error fetching all genres:", error);
    return [];
  }
};

const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${searchBaseUrl}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    return response.data;
  } catch (error) {
    console.error("GlobalApi: Error searching movies:", error);
    return null;
  }
};

const getItemDetails = async (mediaType, itemId) => {
  try {
    const response = await axios.get(`${detailsBaseUrl}/${mediaType}/${itemId}?api_key=${API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    console.error(`GlobalApi: Error fetching details for ${mediaType} with ID ${itemId}:`, error);
    return null;
  }
};

export default {
  getTrendingMovies,
  getGenreID,
  getAllGenres,
  searchMovies,
  getItemDetails
};