import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Default() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<any>({});
    const [users, setUsers] = useState<any>([]);

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

    const { currentUser } = useSelector((state: any) => state.user);

    return (
        <div>
            <h1>{movie.original_title}</h1>
            <Link to="/home">back to home</Link>
            {currentUser && (
                <>
                    <button
                        onClick={() => {
                            client.userLikesMovie({
                                movieId: movie.id,
                                name: movie.title,
                            });
                        }}
                    >
                        like
                    </button>
                    <button
                        onClick={() => {
                            client.userUnlikesMovie(movie.id);
                        }}
                    >
                        dislike
                    </button>
                </>
            )}
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />

            {users && users.length > 0 && (
                <>
                    <h3>users who liked</h3>
                    {users.map((user: any) => (
                        <div key={user._id}>
                            <Link to={`/account/${user._id}`}>
                                {user.username}
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
