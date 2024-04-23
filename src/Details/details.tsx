import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { setCurrentUser } from "../Account/reducer";

export default function Details() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<any>({});
    const [users, setUsers] = useState<any>([]);

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.user);

    const findDetails = async (id: string) => {
        const movie = await client.getMovieDetails(id);
        setMovie(movie);
    };

    const findUsersWhoLiked = async (movieId: string) => {
        const users = await client.findUsersWhoLikedMovie(movieId);
        setUsers(users);
    };

    useEffect(() => {
        if (movieId) {
            findDetails(movieId);
            findUsersWhoLiked(movieId);
        }
    }, [movieId]);

    return (
        <div className="m-3">
            <div className="d-flex main-container">
                <img
                    style={{ borderRadius: 10 }}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />

                <div className="movie-info">
                    <h2>{movie.original_title}</h2>
                    {movie.overview}

                    <h3>Budget {movie.budget}</h3>
                    <h3>Revenue {movie.revenue} </h3>

                    <h3>Length {movie.runtime} minutes </h3>
                </div>
            </div>

            {/* <img
                src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
            /> */}
            {/* <Link to="/home">back to home</Link> */}
            {currentUser && (
                <>
                    <button
                        onClick={async () => {
                            await client.userLikesMovie({
                                movieId: movie.id,
                                name: movie.title,
                            });
                            findUsersWhoLiked(movie.id);
                        }}
                    >
                        like
                    </button>
                    <button
                        onClick={async () => {
                            await client.userUnlikesMovie(movie.id);
                            findUsersWhoLiked(movie.id);
                        }}
                    >
                        unlike
                    </button>
                </>
            )}

            {users && users.length > 0 && (
                <>
                    <h3>users who liked</h3>
                    {users.map((user: any) => (
                        <div key={user._id}>
                            <Link to={`/profile/${user._id}`}>
                                {user.username}
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
