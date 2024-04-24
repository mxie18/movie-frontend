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
        <div>
            {results.length == 0 && <h2 className="m-3">No results found </h2>}
            {results.length != 0 && (
                <h2 className="m-3">Search results for {term}</h2>
            )}
            <MoviesList movies={results} />
        </div>
    );
}
