import { useEffect, useState } from "react";
import Login from "./login";
import * as client from "./client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
    const { userId } = useParams();

    const [profile, setProfile] = useState({
        _id: "",
        username: "",
        password: "",
        role: "USER",
    });

    const isOwnUser = !userId;
    const isAdmin = profile.role === "ADMIN";

    const [liked, setLiked] = useState([]);

    const [users, setUsers] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const { currentUser } = useSelector((state: any) => state.user);

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const findLiked = async (userId: string) => {
        const movies = await client.findMoviesLikedByUser(userId);
        setLiked(movies);
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

    const fetchProfile = async () => {
        try {
            console.log(" own profile fetched");
            const profile = await client.profile();
            console.log(profile);
            dispatch(setCurrentUser(profile));
            setProfile(profile);
            findLiked(profile._id);
            findFollowers(profile._id);
            findFollowing(profile._id);
        } catch {
            dispatch(setCurrentUser(null));
            navigate("/login");
        }
    };

    const fetchOtherProfile = async () => {
        try {
            if (userId) {
                console.log(" other profile fetched");

                const profile = await client.otherProfile(userId);
                setProfile(profile);
                findLiked(userId);
                findFollowers(profile._id);
                findFollowing(profile._id);
            }
        } catch (error) {
            navigate("/login");
        }
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/login");
    };

    const update = async () => {
        await client.updateUser(profile);
    };

    const follow = async (user: any) => {
        await client.followUser(user);
        fetchOtherProfile();
    };

    const unfollow = async (user: any) => {
        await client.unfollowUser(user);
        fetchOtherProfile();
    };

    useEffect(() => {
        if (currentUser && currentUser._id == userId && userId) {
            console.log(currentUser);
            navigate("/profile");
        } else {
            console.log("in else");
            if (isOwnUser) {
                fetchProfile();
            } else {
                fetchOtherProfile();
            }
        }

        fetchUsers();
    }, [userId]);

    // console.log(currentUser._id, profile._id);

    // if (currentUser._id == profile._id) {
    //     navigate("/profile");
    // }

    return (
        <div>
            <h1>PROFILE</h1>
            <div>
                <h3>Username</h3>
                <input
                    value={profile.username}
                    onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })
                    }
                />

                <h3>Password</h3>
                <input
                    value={profile.password}
                    onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })
                    }
                />

                <h3>Role</h3>
                <input
                    type="radio"
                    id="user"
                    name="role"
                    value="USER"
                    checked={profile.role == "USER"}
                    onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })
                    }
                />
                <label htmlFor="user">User</label>
                <input
                    type="radio"
                    id="user"
                    name="role"
                    value="ADMIN"
                    checked={profile.role == "ADMIN"}
                    onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })
                    }
                />
                <label htmlFor="user">Admin</label>
            </div>

            <pre>{JSON.stringify(profile, null, 2)}</pre>

            {liked && liked.length > 0 && (
                <>
                    <h2>liked</h2>
                    <ul>
                        {liked.map((movie: any) => (
                            <Link to={`/movie/details/${movie.movieId}`}>
                                <li key={movie.movieId}>{movie.name}</li>
                            </Link>
                        ))}
                    </ul>
                </>
            )}

            {followers && followers.length > 0 && (
                <>
                    <h2>followers</h2>
                    <ul>
                        {followers.map((follower: any) => (
                            <Link to={`/profile/${follower._id}`}>
                                <li key={follower._id}>{follower.username}</li>
                            </Link>
                        ))}
                    </ul>
                </>
            )}

            {following && following.length > 0 && (
                <>
                    <h2>following</h2>
                    <ul>
                        {following.map((user: any) => (
                            <Link to={`/profile/${user._id}`}>
                                <li key={user._id}>{user.username}</li>
                            </Link>
                        ))}
                    </ul>
                </>
            )}

            {isOwnUser && (
                <>
                    <button onClick={update}>Update</button>
                    <button onClick={signout}>Signout</button>

                    <h1>view all users</h1>
                    {users
                        .filter((u: any) => u.username !== profile.username)
                        .map((user: any) => (
                            <>
                                <Link to={`/profile/${user._id}`}>
                                    <h3>{user.username}</h3>
                                </Link>
                                {/* <button onClick={() => follow(user)}>
                                    follow
                                </button>
                                <button onClick={() => unfollow(user._id)}>
                                    unfollow
                                </button> */}
                            </>
                        ))}
                </>
            )}

            {!isOwnUser && (
                <>
                    <button onClick={() => follow(profile)}>follow</button>
                    <button onClick={() => unfollow(profile._id)}>
                        unfollow
                    </button>

                    <Link to="/profile"> back to my profile </Link>
                </>
            )}

            <br />

            {isAdmin && <Link to="/admin">go to admin</Link>}

            <br />

            <Link to="/home">go back home</Link>
        </div>
    );
}
