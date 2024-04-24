import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { setCurrentUser } from "../Account/reducer";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import toast from "react-hot-toast";

export default function ShowDetails() {
    const { showId } = useParams();
    const [show, setShow] = useState<any>({});
    const [users, setUsers] = useState<any>([]);

    const { currentUser } = useSelector((state: any) => state.user);

    const [pressLike, setPressLike] = useState(false);

    const findDetails = async (id: string) => {
        const show = await client.getShowDetails(id);
        setShow(show);
    };

    const findUsersWhoLiked = async (showId: string) => {
        const users = await client.findUsersWhoLikedShow(showId);
        setUsers(users);
    };

    useEffect(() => {
        if (showId) {
            findDetails(showId);
            findUsersWhoLiked(showId);

            if (users.some((user: any) => user._id == currentUser._id)) {
                setPressLike(true);
            }
        }
    }, [showId, users.length]);

    return (
        <div className="m-3 d-flex justify-content-center">
            <div className="d-flex main-container">
                <img
                    style={{
                        borderRadius: 10,
                        width: "50%",
                        objectFit: "cover",
                    }}
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
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
                                    await client.userLikesShow({
                                        showId: show.id,
                                        name: show.name,
                                    });
                                    toast.success("Show Liked!");
                                    setPressLike(true);
                                    findUsersWhoLiked(show.id);
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
                                    await client.userUnlikesShow(show.id);
                                    toast.success("Show Unliked!");
                                    setPressLike(false);
                                    findUsersWhoLiked(show.id);
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

                {show && show.genres && (
                    <div className="movie-info">
                        <h1>{show.original_name}</h1>
                        <hr />
                        {show.overview}

                        <table
                            className="table table-dark table-responsive details-table"
                            style={{ marginTop: 30 }}
                        >
                            <tbody>
                                <tr>
                                    <td>First Air Date</td>
                                    <td>{show.first_air_date}</td>
                                </tr>
                                <tr>
                                    <td>Number of Seasons</td>
                                    <td>{show.number_of_seasons}</td>
                                </tr>
                                <tr>
                                    <td>Number of Episodes</td>
                                    <td>{show.number_of_episodes}</td>
                                </tr>
                                <tr>
                                    <td>Main Genre</td>
                                    <td>{show.genres[0].name} </td>
                                </tr>
                                <tr>
                                    <td>Origin Country</td>
                                    <td>{show.origin_country} </td>
                                </tr>
                                <tr>
                                    <td>Vote Average</td>
                                    <td>{show.vote_average} / 10 </td>
                                </tr>
                                <tr>
                                    <td>Show Status</td>
                                    <td>{show.status} </td>
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
