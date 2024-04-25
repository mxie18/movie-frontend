import { useEffect, useState } from "react";
import Login from "./login";
import * as client from "./client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import toast from "react-hot-toast";
import MoviesList from "../Movies/movies";
import * as movieClient from "../Home/client";
import FollowModal from "./modal";

export default function Profile() {
    const { userId } = useParams();

    const [profile, setProfile] = useState({
        _id: "",
        username: "",
        password: "",
        role: "USER",
        address: "",
        phone: "",
    });

    const isOwnUser = !userId;

    const [liked, setLiked] = useState([]);

    const [showsLiked, setShowsLiked] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [pressFollow, setPressFollow] = useState(false);

    const { currentUser } = useSelector((state: any) => state.user);

    const findLiked = async (userId: string) => {
        const movies = await client.findMoviesLikedByUser(userId);
        setLiked(movies);
    };

    const findShowsLiked = async (userId: string) => {
        const shows = await client.findShowsLikedByUser(userId);
        setShowsLiked(shows);
    };

    const findFollowers = async (userId: string) => {
        const followers = await client.findFollowers(userId);
        setFollowers(followers);
    };

    const findFollowing = async (userId: string) => {
        const following = await client.findFollowing(userId);
        setFollowing(following);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/login");
    };

    const update = async () => {
        console.log("profile", profile);
        await client.updateUser(profile);
        dispatch(setCurrentUser(profile));
        toast.success("Profile updated!");
    };

    const follow = async (user: any) => {
        await client.followUser(user);
        setPressFollow(true);
        toast.success("User followed!");
        fetchProfile();
    };

    const unfollow = async (user: any) => {
        await client.unfollowUser(user);
        setPressFollow(false);
        toast.success("User unfollowed!");
        fetchProfile();
    };

    const fetchProfile = async () => {
        let p;
        try {
            if (userId) {
                p = await client.otherProfile(userId);
            } else {
                p = await client.profile();
                dispatch(setCurrentUser(p));
            }
            findLiked(p._id);
            findShowsLiked(p._id);
            findFollowers(p._id);
            findFollowing(p._id);
            setProfile(p);
        } catch (error) {
            if (!userId) {
                dispatch(setCurrentUser(null));
            }
            navigate("/login");
        }
    };

    const setBackground = async () => {
        const movies = await movieClient.getTrendingMovies();
        const random = Math.floor(Math.random() * movies.length);
        document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(https://image.tmdb.org/t/p/original/${movies[random].backdrop_path})`;
    };

    useEffect(() => {
        setBackground();
        if (currentUser && currentUser._id == userId && userId) {
            navigate("/profile");
        } else {
            fetchProfile();

            if (followers.some((user: any) => user._id == currentUser._id)) {
                setPressFollow(true);
            }
        }
    }, [userId, followers.length]);

    return (
        <div
            className="m-3 d-flex justify-content-center"
            style={{ height: "100%" }}
        >
            <div className="outer" style={{}}>
                <div className="top-level" style={{}}>
                    <div
                        className="profile-container"
                        style={{ minWidth: 300, flexGrow: 1 }}
                    >
                        <div style={{}} className="top-container">
                            <div className="d-flex top-header">
                                {userId && (
                                    <h2
                                        className="text-nowrap"
                                        style={{ marginBottom: 0 }}
                                    >
                                        {profile.username}'s Profile
                                    </h2>
                                )}
                                {!userId && (
                                    <h2
                                        style={{
                                            marginBottom: 0,
                                            marginRight: 15,
                                        }}
                                        className="text-nowrap"
                                    >
                                        My Profile
                                    </h2>
                                )}
                                <div style={{ marginLeft: 15 }}>
                                    {!isOwnUser && (
                                        <>
                                            {!pressFollow && (
                                                <button
                                                    className="btn button-style"
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 500,
                                                    }}
                                                    onClick={() =>
                                                        follow(profile)
                                                    }
                                                >
                                                    Follow
                                                </button>
                                            )}
                                            {pressFollow && (
                                                <button
                                                    onClick={() =>
                                                        unfollow(profile._id)
                                                    }
                                                    className="btn button-style"
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    Unfollow
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="following-tab">
                                <FollowModal
                                    array={following}
                                    type="Following"
                                />

                                <FollowModal
                                    array={followers}
                                    type="Followers"
                                />

                                {/* <span
                                    style={{ fontSize: 20, fontWeight: 500 }}
                                    className=""
                                >
                                    <span
                                        className="follow-nums"
                                        style={{ marginRight: 5 }}
                                    >
                                        {followers.length}
                                    </span>
                                    Followers
                                </span> */}
                            </div>
                        </div>

                        <div className="main-profile-container">
                            <div
                                className="edit-container"
                                style={{ flexGrow: 1 }}
                            >
                                <div>
                                    <label
                                        className="text-nowrap"
                                        htmlFor="username"
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        className="form-control"
                                        value={profile.username}
                                        readOnly={userId ? true : false}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className="text-nowrap"
                                        htmlFor="password"
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        className="form-control"
                                        value={profile.password}
                                        readOnly={userId ? true : false}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {(!userId || currentUser?.role === "ADMIN") && (
                                    <div>
                                        <label
                                            className="text-nowrap"
                                            htmlFor="address"
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Address
                                        </label>
                                        <input
                                            id="address"
                                            className="form-control"
                                            value={profile.address}
                                            readOnly={userId ? true : false}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                {(!userId || currentUser?.role === "ADMIN") && (
                                    <div>
                                        <label
                                            className="text-nowrap"
                                            htmlFor="number"
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            id="number"
                                            className="form-control"
                                            readOnly={userId ? true : false}
                                            value={profile.phone}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    phone: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                <div className="d-flex role-container">
                                    <label
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Role
                                    </label>

                                    <span
                                        className="text-nowrap"
                                        style={{ marginLeft: 10 }}
                                    >
                                        <input
                                            type="radio"
                                            id="user"
                                            name="role"
                                            value="USER"
                                            checked={profile.role == "USER"}
                                            disabled={
                                                profile.role == "ADMIN" &&
                                                userId
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    role: e.target.value,
                                                })
                                            }
                                        />
                                        <label
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 400,
                                                marginLeft: 5,
                                            }}
                                            htmlFor="user"
                                        >
                                            User
                                        </label>
                                    </span>

                                    <span
                                        className="text-nowrap"
                                        style={{ marginLeft: 10 }}
                                    >
                                        <input
                                            type="radio"
                                            id="user"
                                            name="role"
                                            value="ADMIN"
                                            checked={profile.role == "ADMIN"}
                                            disabled={
                                                profile.role == "USER" && userId
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    role: e.target.value,
                                                })
                                            }
                                        />
                                        <label
                                            htmlFor="user"
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 400,
                                                marginLeft: 5,
                                            }}
                                        >
                                            Admin
                                        </label>
                                    </span>
                                </div>

                                {isOwnUser && (
                                    <>
                                        <button
                                            className="btn button-style"
                                            onClick={update}
                                            style={{
                                                marginBottom: 10,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={signout}
                                            style={{
                                                borderColor: "transparent",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Signout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex stats">
                        <div
                            className="vr"
                            style={{
                                width: 2,
                                backgroundColor: "white",
                                opacity: 1,
                                marginLeft: 10,
                                marginRight: 10,
                                flexShrink: 0,
                            }}
                        ></div>

                        {/* <div
                                style={{}}
                                className="d-flex align-items-center"
                            >
                                <span
                                    style={{ fontSize: 20, fontWeight: 500 }}
                                    className=""
                                >
                                    <span
                                        className="follow-nums"
                                        style={{ marginRight: 10 }}
                                    >
                                        {following.length}
                                    </span>
                                    Following
                                </span>

                                {following && following.length > 0 && (
                                    <>
                                        {following.map((user: any) => (
                                            <>
                                                <Link
                                                    to={`/profile/${user._id}`}
                                                    className="btn btn-secondary"
                                                    style={{
                                                        fontWeight: 500,
                                                        marginLeft: 15,
                                                    }}
                                                >
                                                    {user.username}
                                                </Link>
                                            </>
                                        ))}
                                    </>
                                )}
                            </div>

                            <hr style={{ color: "white", opacity: 1 }} />

                            <div
                                style={{}}
                                className="d-flex align-items-center"
                            >
                                <span
                                    style={{ fontSize: 20, fontWeight: 500 }}
                                    className=""
                                >
                                    <span
                                        className="follow-nums"
                                        style={{ marginRight: 10 }}
                                    >
                                        {followers.length}
                                    </span>
                                    Followers
                                </span>

                                <div className="">
                                    {followers && followers.length > 0 && (
                                        <>
                                            {followers.map((user: any) => (
                                                <>
                                                    <Link
                                                        to={`/profile/${user._id}`}
                                                        className="btn btn-secondary"
                                                        style={{
                                                            marginLeft: 15,
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {user.username}
                                                    </Link>
                                                </>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>

                            <hr style={{ color: "white", opacity: 1 }} /> */}

                        <div style={{}} className="">
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                }}
                                className="text-nowrap"
                            >
                                <span
                                    className="follow-nums"
                                    style={{ marginRight: 8 }}
                                >
                                    {liked.length}
                                </span>
                                Movies Liked
                            </div>

                            <hr style={{ color: "white", opacity: 1 }} />
                            <div
                                className="display-column"
                                style={{
                                    paddingRight: 10,
                                    height: "45vh",
                                    overflowY: "auto",
                                }}
                            >
                                {liked && liked.length > 0 && (
                                    <>
                                        {liked.map((movie: any) => (
                                            <Link
                                                to={`/movie/details/${movie.movieId}`}
                                                className="btn btn-primary"
                                                style={{
                                                    fontWeight: 500,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                {movie.name}
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        <div
                            className="vr"
                            style={{
                                width: 2,
                                backgroundColor: "white",
                                opacity: 0,
                                marginLeft: 10,
                                marginRight: 10,
                                flexShrink: 0,
                            }}
                        ></div>

                        <div style={{}} className="">
                            <span
                                style={{ fontSize: 20, fontWeight: 500 }}
                                className="text-nowrap"
                            >
                                <span
                                    className="follow-nums"
                                    style={{ marginRight: 8 }}
                                >
                                    {showsLiked.length}
                                </span>
                                Shows Liked
                            </span>
                            <hr style={{ color: "white", opacity: 1 }} />
                            <div
                                className="display-column"
                                style={{
                                    paddingRight: 10,
                                    height: "45vh",
                                    overflowY: "auto",
                                }}
                            >
                                {showsLiked && showsLiked.length > 0 && (
                                    <>
                                        {showsLiked.map((show: any) => (
                                            <Link
                                                to={`/shows/details/${show.showId}`}
                                                className="btn btn-primary"
                                                style={{
                                                    fontWeight: 500,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                {show.name}
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
