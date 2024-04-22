import axios from "axios";

const MOVIEDB_API = "https://api.themoviedb.org/3";
const LIKES_API = `${process.env.REACT_APP_SERVER_URL}/api/likes`;

const axiosWithCreds = axios.create({
    withCredentials: true,
});

export const getMovieDetails = async (movieId: string) => {
    const response = await axios.get(
        `${MOVIEDB_API}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data;
};

export const userLikesMovie = async (movie: any) => {
    const response = await axiosWithCreds.post(`${LIKES_API}`, movie);
    return response.data;
};

export const userUnlikesMovie = async (movieId: any) => {
    const response = await axiosWithCreds.delete(`${LIKES_API}/${movieId}`);
    return response.data;
};

export const findUsersWhoLikedMovie = async (movieId: string) => {
    const response = await axiosWithCreds.get(
        `${process.env.REACT_APP_SERVER_URL}/api/movies/${movieId}/likes`
    );
    return response.data;
};
