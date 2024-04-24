import axios from "axios";

const MOVIEDB_API = "https://api.themoviedb.org/3";

const API = `${process.env.REACT_APP_SERVER_URL}/api`;

export const getTrendingMovies = async () => {
    const response = await axios.get(
        `${MOVIEDB_API}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.results;
};

export const getTrendingShows = async () => {
    const response = await axios.get(
        `${MOVIEDB_API}/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.results;
};

export const searchMovies = async (query: string) => {
    const response = await axios.get(
        `${MOVIEDB_API}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
    );
    return response.data.results;
};

export const getExternalMovieID = async (movieId: string) => {
    const response = await axios.get(`${API}/movies/${movieId}`);
    return response.data;
};

export const getExternalShowID = async (showId: string) => {
    const response = await axios.get(`${API}/shows/${showId}`);
    return response.data;
};

export const getRecommendedMovies = async (movieId: string) => {
    const response = await axios.get(
        `${MOVIEDB_API}/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.results;
};

export const getRecommendedShows = async (showId: string) => {
    const response = await axios.get(
        `${MOVIEDB_API}/tv/${showId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.results;
};
