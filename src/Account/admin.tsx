import { useEffect, useState } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";

export default function Admin() {
    const [users, setUsers] = useState<any>([]);
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: "USER",
    });

    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            alert("couldn't create user, make sure username is unique");
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const deleteUser = async (user: any) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u: any) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const updateUser = async () => {
        await client.updateUser(user);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <input
                value={user.username}
                onChange={(e) =>
                    setUser({
                        ...user,
                        username: e.target.value,
                    })
                }
            />
            <input
                value={user.password}
                onChange={(e) =>
                    setUser({
                        ...user,
                        password: e.target.value,
                    })
                }
            />

            <input
                type="radio"
                id="user"
                name="role"
                value="USER"
                checked={user.role == "USER"}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
            />
            <label htmlFor="user">User</label>
            <input
                type="radio"
                id="user"
                name="role"
                value="ADMIN"
                checked={user.role == "ADMIN"}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
            />
            <label htmlFor="user">Admin</label>

            <button onClick={createUser}>create user</button>
            <button onClick={updateUser}>update user</button>
            {users.map((user: any) => (
                <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>
                        <button onClick={() => deleteUser(user)}>
                            delete user
                        </button>

                        <button
                            onClick={(event) => {
                                setUser(user);
                            }}
                        >
                            edit user
                        </button>
                    </td>
                </tr>
            ))}

            <Link to="/home">back home</Link>
        </>
    );
}
