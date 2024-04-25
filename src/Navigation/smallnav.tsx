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
import { FaSignInAlt } from "react-icons/fa";

export default function SmallNav({
    query,
    setQuery,
}: {
    query: string;
    setQuery: (string: any) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.user);

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const searchMovies = async (query: string) => {
        navigate(`/search/${query}`);
    };

    useEffect(() => {
        if (query && pathname == "/home") {
            setQuery("");
        }
    }, [pathname]);

    return (
        <>
            <div className="d-flex small-nav-container">
                <div className="d-flex nav-container p-3" id="nav">
                    <Link
                        to="/home"
                        className="nav-title"
                        style={{ fontSize: 40 }}
                    >
                        MH
                    </Link>
                    <div className="search-box-small">
                        <div
                            className="input-group"
                            style={{ height: 36, flexWrap: "nowrap" }}
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
                                className="btn button-style d-flex align-items-center"
                                onClick={() => searchMovies(query)}
                            >
                                <FaSearch style={{ fontSize: 18 }} />
                            </button>
                        </div>
                    </div>

                    <div className="nav-options">
                        <Link
                            to="/home"
                            className="btn button-style d-flex align-items-center"
                            style={{ height: 36 }}
                        >
                            <FaHome style={{ fontSize: 18 }} />
                        </Link>

                        <Link
                            className="d-flex btn button-style align-items-center"
                            to="/users"
                            style={{ height: 36 }}
                        >
                            <HiUserGroup style={{ fontSize: 18 }} />
                        </Link>

                        {currentUser && (
                            <Link
                                className="d-flex btn button-style align-items-center"
                                to="/profile"
                                style={{ height: 36 }}
                            >
                                <FaUserCircle style={{ fontSize: 18 }} />
                            </Link>
                        )}

                        {!currentUser && (
                            <>
                                <Link
                                    to="/login"
                                    className="btn button-style d-flex align-items-center"
                                    style={{
                                        height: 36,
                                    }}
                                >
                                    <FaSignInAlt style={{ fontSize: 18 }} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
