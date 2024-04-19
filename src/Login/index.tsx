import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: "USER",
    });

    const register = async () => {
        await client.register(user);
    };

    const navigate = useNavigate();
    return (
        <div>
            <h1>LOGIN</h1>

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

            <button>Sign In</button>
            <button onClick={register}>Register</button>
        </div>
    );
}
