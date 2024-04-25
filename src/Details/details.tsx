import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { setCurrentUser } from "../Account/reducer";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import toast from "react-hot-toast";

export default function Details() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<any>({});
    const [users, setUsers] = useState<any>([]);

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.user);

    console.log("CURRENT", currentUser);

    const [pressLike, setPressLike] = useState(false);

    const findDetails = async (id: string) => {
        const movie = await client.getMovieDetails(id);
        document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
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

            if (users.some((user: any) => user._id == currentUser._id)) {
                setPressLike(true);
            }
        }
    }, [movieId, users.length]);

    return (
        <div className="m-3 d-flex justify-content-center">
            <div className="d-flex main-container">
                <img
                    style={{
                        borderRadius: 10,
                        width: "50%",
                        objectFit: "cover",
                    }}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />

                {currentUser && (
                    <>
                        {!pressLike && (
                            <button
                                className="btn button-style d-flex align-items-center overlay"
                                style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}
                                onClick={async () => {
                                    await client.userLikesMovie({
                                        movieId: movie.id,
                                        name: movie.title,
                                    });
                                    toast.success("Movie Liked!");
                                    setPressLike(true);
                                    findUsersWhoLiked(movie.id);
                                }}
                            >
                                Like
                                <AiFillLike
                                    style={{
                                        fontSize: 16,
                                        marginLeft: 4,
                                    }}
                                />
                            </button>
                        )}
                        {pressLike && (
                            <button
                                style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}
                                className="btn button-style d-flex align-items-center overlay"
                                onClick={async () => {
                                    await client.userUnlikesMovie(movie.id);
                                    toast.success("Movie Unliked!");
                                    setPressLike(false);
                                    findUsersWhoLiked(movie.id);
                                }}
                            >
                                Unlike
                                <AiFillDislike
                                    style={{
                                        fontSize: 16,
                                        marginLeft: 4,
                                    }}
                                />
                            </button>
                        )}
                    </>
                )}

                {movie && movie.revenue != undefined && (
                    <div
                        style={{
                            overflowX: "auto",
                            margin: 20,
                            paddingRight: 10,
                            width: "50%",
                        }}
                    >
                        <h1>{movie.original_title}</h1>
                        <hr />
                        {movie.overview}
                        <table
                            className="table table-dark table-responsive details-table"
                            style={{ marginTop: 30 }}
                        >
                            <tbody>
                                <tr>
                                    <td>Budget</td>
                                    <td>${movie.budget.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>Revenue</td>
                                    <td>${movie.revenue.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>Movie Runtime</td>
                                    <td>{movie.runtime} minutes</td>
                                </tr>
                                <tr>
                                    <td>Main Genre</td>
                                    <td>{movie.genres[0].name} </td>
                                </tr>
                                <tr>
                                    <td>Origin Country</td>
                                    <td>{movie.origin_country} </td>
                                </tr>
                                <tr>
                                    <td>Release Date</td>
                                    <td>{movie.release_date} </td>
                                </tr>
                                <tr>
                                    <td>Vote Average</td>
                                    <td>{movie.vote_average} / 10 </td>
                                </tr>
                            </tbody>
                        </table>
                        {users && users.length > 0 && (
                            <>
                                <h4 style={{ marginTop: 10 }}>Liked By</h4>
                                <div className="users-who-liked-container">
                                    {users.map((user: any) => (
                                        <div key={user._id}>
                                            <Link
                                                to={`/profile/${user._id}`}
                                                className="btn btn-secondary"
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: 16,
                                                    marginRight: 10,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                {user.username}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* <img
                src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
            /> */}
            {/* <Link to="/home">back to home</Link> */}
        </div>
    );
}
