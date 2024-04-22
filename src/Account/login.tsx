import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: "USER",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const register = async () => {
        try {
            await client.register(user);
            dispatch(setCurrentUser(user));
            navigate("/home");
        } catch (err: any) {
            dispatch(setCurrentUser(null));
            alert(err.response.data.message);
        }
    };

    const signin = async () => {
        try {
            await client.signin(user);
            dispatch(setCurrentUser(user));
            navigate("/home");
        } catch (err: any) {
            dispatch(setCurrentUser(null));
            alert(err.response.data.message);
        }
    };

    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, []);

    return (
        <div>
            <h1>LOGIN</h1>
            <Link to={"/home"}> back to home</Link>
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
            <button onClick={signin}>Sign In</button>
            <button onClick={register}>Register</button>
        </div>
    );
}
