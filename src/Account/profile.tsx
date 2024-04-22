import { useEffect, useState } from "react";
import Login from "./login";
import * as client from "./client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const findLiked = async (userId: string) => {
        const movies = await client.findMoviesLikedByUser(userId);
        setLiked(movies);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchProfile = async () => {
        try {
            const profile = await client.profile();
            console.log(profile);
            // dispatch(setCurrentUser(profile));
            setProfile(profile);
            findLiked(profile._id);
        } catch {
            // dispatch(setCurrentUser(null));
            console.log("goping back to login");
            navigate("/login");
        }
    };

    const fetchOtherProfile = async () => {
        try {
            if (userId) {
                const profile = await client.otherProfile(userId);
                setProfile(profile);
                findLiked(userId);
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

    useEffect(() => {
        if (isOwnUser) {
            fetchProfile();
        } else {
            fetchOtherProfile();
        }
        fetchUsers();
    }, []);

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
                        setProfile({ ...profile, username: e.target.value })
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
                            <Link to={`/movie/${movie.movieId}`}>
                                <li key={movie.movieId}>{movie.name}</li>
                            </Link>
                        ))}
                    </ul>
                </>
            )}

            {isOwnUser && (
                <>
                    <button onClick={update}>Update</button>
                    <button onClick={signout}>Signout</button>
                    <h1>all useres</h1>
                    {users.map((user: any) => (
                        <h3>{user.username}</h3>
                    ))}
                </>
            )}

            {isAdmin && <Link to="/admin">go to admin</Link>}

            <br />

            <Link to="/home">go back home</Link>
        </div>
    );
}
