import { Link } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import Search from "../Search/search";
import { UseSelector, useSelector } from "react-redux";

export default function Home() {
    let [movies, setMovies] = useState<any>([]);
    const getTrending = async () => {
        const movies = await client.getTrendingMovies();
        setMovies(movies);
    };
    useEffect(() => {
        getTrending();
    }, []);

    const { currentUser } = useSelector((state: any) => state.user);

    return (
        <>
            <h1>HOME</h1>
            {currentUser && (
                <>
                    <h3>WELCOME {currentUser.username} </h3>
                    <Link to="/profile"> go to profile</Link>
                </>
            )}

            {!currentUser && (
                <>
                    <h3>WELCOME GUEST</h3>
                    <Link to="/login"> go to login</Link>
                </>
            )}

            <Search />
            <div className="d-flex flex-wrap">
                {movies.map((movie: any) => (
                    <div key={movie.id}>
                        {<h4>{movie.title}</h4>}
                        <img
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
