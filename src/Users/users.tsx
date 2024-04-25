import { useEffect, useState } from "react";
import * as client from "../Account/client";
import "./index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import * as movieClient from "../Home/client";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [user, setUser] = useState<any>({
        username: "",
        password: "",
        role: "USER",
        followers: [],
        following: [],
        moviesLiked: [],
    });

    console.log(user);

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const setBackground = async () => {
        const movies = await movieClient.getTrendingMovies();
        const random = Math.floor(Math.random() * movies.length);
        document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(https://image.tmdb.org/t/p/original/${movies[random].backdrop_path})`;
    };

    const { currentUser } = useSelector((state: any) => state.user);

    const [isAdmin, setIsAdmin] = useState(false);

    const deleteUser = async (user: any) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u: any) => u._id !== user._id));
            toast.success("User deleted!");
        } catch (err) {
            console.log(err);
        }
    };

    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
            toast.success("User created!");
        } catch (err) {
            toast.error("User creation failed, check username!");
        }
    };

    const updateUser = async () => {
        await client.updateUser(user);
        toast.success("User updated!");
        fetchUsers();
    };

    useEffect(() => {
        setBackground();
        fetchUsers();

        console.log("currentUser", currentUser);

        if (currentUser && currentUser.role === "ADMIN") {
            setIsAdmin(true);
        }
    }, [currentUser]);

    return (
        <div className="m-3">
            <div className="wrapper">
                <div style={{ overflowX: "auto" }} className="table-container">
                    <h2>Showing All Users</h2>

                    <table
                        className="table table-secondary table-striped table-styles table-responsive"
                        style={{ marginTop: 20 }}
                    >
                        <thead>
                            <tr className="table-light">
                                <th scope="">#</th>
                                <th scope="">Username</th>
                                <th scope="">Password</th>
                                <th scope="" style={{ width: 120 }}>
                                    Role
                                </th>
                                <th scope="">Followers</th>
                                <th scope="">Following</th>
                                <th scope="" className="text-nowrap">
                                    Movies Liked
                                </th>
                                <th style={{ width: 1 }}>&nbsp;</th>
                                {isAdmin && (
                                    <th style={{ width: 1 }}>&nbsp;</th>
                                )}
                                {isAdmin && (
                                    <th style={{ width: 1 }}>&nbsp;</th>
                                )}
                            </tr>

                            {isAdmin && (
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            className="form-control"
                                            value={user.username}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            value={user.password}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="form-select"
                                            style={{ textAlign: "center" }}
                                            value={user.role}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    role: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            value={user.followers.length}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    followers: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            value={user.following.length}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    following: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            value={user.moviesLiked.length}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    moviesLiked: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td colSpan={2}>
                                        <button
                                            className="btn btn-primary add"
                                            style={{
                                                borderColor: "transparent",
                                            }}
                                            onClick={createUser}
                                        >
                                            Add
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            style={{
                                                borderColor: "transparent",
                                            }}
                                            onClick={updateUser}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {users.map((user: any, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>{user.followers.length}</td>
                                    <td>{user.following.length}</td>
                                    <td>{user.moviesLiked.length}</td>
                                    <td>
                                        <Link
                                            to={`/profile/${user._id}`}
                                            className="btn btn-secondary"
                                            style={{
                                                borderColor: "transparent",
                                            }}
                                        >
                                            View
                                        </Link>
                                    </td>
                                    {isAdmin && (
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                style={{
                                                    borderColor: "transparent",
                                                }}
                                                onClick={() => setUser(user)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    )}
                                    {isAdmin && (
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                style={{
                                                    borderColor: "transparent",
                                                }}
                                                onClick={() => deleteUser(user)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
