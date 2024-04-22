import { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useNavigate, useParams } from "react-router-dom";

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

    console.log("hello");

    return (
        <div>
            <h1>SEARCH</h1>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => searchMovies(query)}>Search</button>
            {results.map((movie: any) => (
                <Link to={`/movie/details/${movie.id}`}>
                    <div key={movie.id}>
                        {<h4>{movie.title}</h4>}
                        <img
                            style={{}}
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
