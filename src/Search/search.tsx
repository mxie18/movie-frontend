import { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import MoviesList from "../Movies/movies";
import * as movieClient from "../Home/client";

export default function Search() {
    const { term } = useParams();

    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any>([]);

    const [showResults, setShowResults] = useState<any>([]);

    const { pathname } = useLocation();

    const setBackground = async () => {
        const movies = await movieClient.getTrendingMovies();
        const random = Math.floor(Math.random() * movies.length);
        document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/original/${movies[random].backdrop_path})`;
    };

    const searchMovies = async (query: string) => {
        const results = await client.searchMovies(query);
        setResults(results);
        navigate(`/search/${query}`);
    };

    const searchShows = async (query: string) => {
        const results = await client.searchShows(query);
        setShowResults(results);
        navigate(`/search/${query}`);
    };

    useEffect(() => {
        setBackground();
        if (term) {
            setQuery(term);
            searchMovies(term);
            searchShows(term);
        } else {
            setQuery("");
            setResults([]);
            setShowResults([]);
        }
    }, [term]);

    return (
        <div>
            {results.length == 0 && <h2 className="m-3">No results found </h2>}
            {results.length != 0 && (
                <h4 className="title-sec">Movie results for "{term}"</h4>
            )}
            <div className="show-row">
                <MoviesList type="movie" movies={results} />
            </div>
            {results.length != 0 && (
                <h4 className="title-sec">Show results for "{term}"</h4>
            )}
            <div className="show-row">
                <MoviesList type="show" movies={showResults} />
            </div>
        </div>
    );
}
