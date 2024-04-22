import axios from "axios";

const MOVIEDB_API = "https://api.themoviedb.org/3";

export const getTrendingMovies = async () => {
    const response = await axios.get(
        `${MOVIEDB_API}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.results;
};

export const searchMovies = async (query: string) => {
    const response = await axios.get(
        `${MOVIEDB_API}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
    );
    return response.data.results;
};
