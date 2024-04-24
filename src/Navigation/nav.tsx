import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Search from "../Search/search";
import "./index.css";
import { useSelector } from "react-redux";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as client from "../Search/client";
import MoviesList from "../Movies/movies";
import { HiUserGroup } from "react-icons/hi2";
import SmallNav from "./smallnav";
import { FaSignInAlt } from "react-icons/fa";

export default function Nav() {
    const { currentUser } = useSelector((state: any) => state.user);
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        if (query && pathname == "/home") {
            setQuery("");
        }

        if (pathname.includes("/search")) {
            setQuery(pathname.split("/").slice(-1)[0]);
        }
    }, [pathname, isSmallScreen]);

    window.onresize = () => {
        setIsSmallScreen(window.innerWidth < 768);
    };

    return (
        <>
            {isSmallScreen && <SmallNav query={query} setQuery={setQuery} />}
            <div className="d-none d-md-flex nav-container p-3" id="nav">
                <Link to="/home" className="nav-title" style={{ fontSize: 45 }}>
                    MovieHub
                </Link>

                <div className="search-box">
                    <div
                        className="input-group"
                        style={{ height: 40, flexWrap: "nowrap" }}
                    >
                        <input
                            value={query}
                            className="form-control"
                            style={{
                                boxShadow: "none",
                                outline: "none",
                            }}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for movies/shows..."
                        />
                        <button
                            className="btn button-style"
                            onClick={() => navigate(`/search/${query}`)}
                        >
                            <FaSearch style={{ fontSize: 20 }} />
                        </button>
                    </div>
                </div>

                <div className="nav-options">
                    <Link
                        to="/home"
                        className="btn button-style d-flex align-items-center"
                        style={{ fontSize: 18, fontWeight: 500 }}
                    >
                        Home
                        <FaHome style={{ fontSize: 20, marginLeft: 5 }} />
                    </Link>

                    <Link
                        className="d-flex btn button-style align-items-center"
                        to="/users"
                        style={{ fontSize: 18, fontWeight: 500 }}
                    >
                        Users
                        <HiUserGroup style={{ fontSize: 20, marginLeft: 5 }} />
                    </Link>

                    {currentUser && (
                        <Link
                            className="d-flex btn button-style align-items-center"
                            to="/profile"
                            style={{ fontSize: 18, fontWeight: 500 }}
                        >
                            {currentUser.username}
                            <FaUserCircle
                                style={{ fontSize: 20, marginLeft: 5 }}
                            />
                        </Link>
                    )}

                    {!currentUser && (
                        <>
                            <Link
                                to="/login"
                                className="d-flex align-items-center btn button-style"
                                style={{
                                    fontSize: 18,
                                    fontWeight: 500,
                                    height: 40,
                                }}
                            >
                                Login
                                <FaSignInAlt
                                    style={{ fontSize: 20, marginLeft: 5 }}
                                />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
