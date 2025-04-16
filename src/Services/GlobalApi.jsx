// ../services/GlobalApi.js (Assuming this is the correct path)
import axios from 'axios';

const moviebaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const movieGenreBaseUrl = "https://api.themoviedb.org/3/discover/movie";
const tvShowBaseUrl = "https://api.themoviedb.org/3/discover/tv";
const genreListUrl = "https://api.themoviedb.org/3/genre/movie/list";
const tvGenreListUrl = "https://api.themoviedb.org/3/genre/tv/list";
const searchBaseUrl = "https://api.themoviedb.org/3/search/multi";
const detailsBaseUrl = "https://api.themoviedb.org/3";

const getTrendingMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${moviebaseUrl}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`);
        return response.data;
    } catch (error) {
        console.error("GlobalApi: Error fetching trending movies:", error);
        return null;
    }
};

const getPopularMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${moviebaseUrl}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        return response.data;
    } catch (error) {
        console.error(`GlobalApi: Error fetching popular movies on page ${page}:`, error);
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
        return response.data.genres;
    } catch (error) {
        console.error("GlobalApi: Error fetching all movie genres:", error);
        return [];
    }
};

const getPopularTvShows = async (page = 1) => {
    try {
        const response = await axios.get(`${tvShowBaseUrl}?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&page=${page}`);
        return response.data;
    } catch (error) {
        console.error(`GlobalApi: Error fetching popular TV shows on page ${page}:`, error);
        return null;
    }
};

const searchMovies = async (query, page = 1) => {
    try {
        const response = await axios.get(`${searchBaseUrl}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
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

const getAllTvShowGenres = async () => {
    try {
        const response = await axios.get(`${tvGenreListUrl}?api_key=${API_KEY}&language=en-US`);
        return response.data.genres;
    } catch (error) {
        console.error("GlobalApi: Error fetching all TV show genres:", error);
        return [];
    }
};

export default {
    getTrendingMovies,
    getPopularMovies,
    getGenreID,
    getAllGenres,
    getPopularTvShows,
    searchMovies,
    getItemDetails,
    getAllTvShowGenres,
};