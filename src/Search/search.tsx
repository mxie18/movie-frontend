import { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import MoviesList from "../Movies/movies";

export default function Search() {
    const { term } = useParams();
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any>([]);

    const [showResults, setShowResults] = useState<any>([]);

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
            {results.length != 0 && <h3 className="title-sec">Movies</h3>}
            <div className="show-row">
                <MoviesList type="movie" movies={results} />
            </div>
            {results.length != 0 && <h3 className="title-sec">Shows</h3>}
            <div className="show-row">
                <MoviesList type="movie" movies={showResults} />
            </div>
        </div>
    );
}
