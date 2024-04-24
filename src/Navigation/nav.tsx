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

export default function Nav() {
    const { currentUser } = useSelector((state: any) => state.user);
    const { pathname } = useLocation();

    const { term } = useParams();
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any>([]);

    const searchMovies = async (query: string) => {
        const results = await client.searchMovies(query);
        setResults(results);
        navigate(`/search/${query}`);
    };

    useEffect(() => {
        if (term) {
            setQuery(term);
            searchMovies(term);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [term]);

    return (
        <div className="d-flex nav-container p-3" id="nav">
            <Link to="/home" className="nav-title" style={{ fontSize: 45 }}>
                MovieHub
            </Link>

            {/* <Link to="/home"> Home</Link>
            <Link to="/community"> Community </Link> */}
            <div style={{}}>
                <div
                    className="input-group"
                    style={{ height: 40, flexWrap: "nowrap" }}
                >
                    <input
                        value={query}
                        className="form-control"
                        style={{
                            width: 400,
                            boxShadow: "none",
                            outline: "none",
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for movies/shows..."
                    />
                    <button
                        className="btn button-style"
                        onClick={() => searchMovies(query)}
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
                        <FaUserCircle style={{ fontSize: 20, marginLeft: 5 }} />
                    </Link>
                )}

                {!currentUser && (
                    <>
                        <Link
                            to="/login"
                            className="btn button-style"
                            style={{
                                fontSize: 18,
                                fontWeight: 500,
                                height: 40,
                            }}
                        >
                            Login / Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
