import { Link } from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
import Search from "../Search/search";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Account/reducer";
import MoviesList from "../Movies/movies";

import * as updateUser from "../Account/client";
import "./index.css";

export default function Home() {
    let [movies, setMovies] = useState<any>([]);

    const dispatch = useDispatch();

    const getTrending = async () => {
        const movies = await client.getTrendingMovies();
        setMovies(movies);
    };

    const getRecommended = async (movieId: string) => {
        const externalMovieId = await client.getExternalMovieID(movieId);
        console.log("movieId", externalMovieId);

        const movies = await client.getRecommendedMovies(externalMovieId);
        console.log("recommended", movies);
        setMovies(movies);
    };

    const getProfile = async () => {
        try {
            const profile = await updateUser.profile();

            if (profile && profile.moviesLiked.length > 0) {
                console.log("asdasdasdasd");
                setText(`Recommended movies for ${profile.username}`);
                getRecommended(profile.moviesLiked[0]);
            }

            dispatch(setCurrentUser(profile));
        } catch (error) {
            console.log(error);
        }
    };

    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        getTrending();
        getProfile();
    }, []);

    let [text, setText] = useState("Trending Now");

    console.log(currentUser);

    return (
        <div>
            {/* {currentUser && (
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
            )} */}

            <h2 className="m-3">{text}</h2>
            <MoviesList movies={movies} />
        </div>
    );
}
