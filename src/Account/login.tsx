import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import "./index.css";
import toast from "react-hot-toast";

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
            toast.error(err.response.data.message);
        }
    };

    const signin = async () => {
        try {
            await client.signin(user);
            dispatch(setCurrentUser(user));
            navigate("/home");
        } catch (err: any) {
            dispatch(setCurrentUser(null));
            toast.error(err.response.data.message);
        }
    };

    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, []);

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                className="form-control"
                value={user.username}
                style={{}}
                placeholder="Enter username..."
                onChange={(e) =>
                    setUser({
                        ...user,
                        username: e.target.value,
                    })
                }
            />
            <input
                className="form-control"
                value={user.password}
                style={{}}
                placeholder="Enter password..."
                onChange={(e) =>
                    setUser({
                        ...user,
                        password: e.target.value,
                    })
                }
            />

            <button
                className="btn button-style"
                onClick={signin}
                style={{ fontWeight: 500 }}
            >
                Sign In
            </button>
            <button
                className="btn button-style"
                onClick={register}
                style={{ fontWeight: 500 }}
            >
                Register
            </button>
        </div>
    );
}
