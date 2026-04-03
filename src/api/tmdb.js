// src/api/tmdb.js
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "6771c948770a7f8fd149a743f8138335";

// Trend filmler
export const getTrendingMovies = async () => {
    const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
        params: { api_key: API_KEY },
    });
    return data.results;
};

// Film arama
export const searchMovies = async (query) => {
    const { data } = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query, include_adult: false, language: "en-US", page: 1 },
    });
    return data.results;
};

// Film detayları
export const getMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY, language: "en-US" },
    });
    return data;
};

// Film cast
export const getMovieCast = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        params: { api_key: API_KEY },
    });
    return data.cast;
};

// Film reviews
export const getMovieReviews = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        params: { api_key: API_KEY, language: "en-US", page: 1 },
    });
    return data.results;
};