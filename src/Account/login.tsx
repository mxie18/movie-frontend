import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import "./index.css";
import toast from "react-hot-toast";
import * as movieClient from "../Home/client";

export default function Login() {
    console.log(process.env);
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

    const setBackground = async () => {
        const movies = await movieClient.getTrendingMovies();
        const random = Math.floor(Math.random() * movies.length);
        document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(https://image.tmdb.org/t/p/original/${movies[random].backdrop_path})`;
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
        setBackground();
        if (currentUser) {
            navigate("/profile");
        }
    }, []);

    return (
        <div className="m-3 d-flex justify-content-center image">
            <div className="login-container" style={{ paddingBottom: 20 }}>
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
                    type="password"
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
                <h6 style={{ fontSize: 12, textAlign: "center" }}>
                    *Refrain from entering sensitive data
                </h6>
            </div>
        </div>
    );
}
