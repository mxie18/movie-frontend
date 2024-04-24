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
    let [shows, setShows] = useState<any>([]);

    const dispatch = useDispatch();

    const getTrendingMovies = async () => {
        const movies = await client.getTrendingMovies();
        setMovies(movies);
    };

    const getTrendingShows = async () => {
        const shows = await client.getTrendingShows();
        setShows(shows);
    };

    const getRecommendedMovies = async (movieId: string) => {
        const externalMovieId = await client.getExternalMovieID(movieId);
        const movies = await client.getRecommendedMovies(externalMovieId);
        setMovies(movies);
    };

    const getRecommendedShows = async (showId: string) => {
        const externalShowId = await client.getExternalShowID(showId);
        const shows = await client.getRecommendedShows(externalShowId);
        setShows(shows);
    };

    const getProfile = async () => {
        try {
            const profile = await updateUser.profile();
            // console.log("hello");
            if (profile && profile.moviesLiked.length > 0) {
                setMovieText(`Recommended movies for ${profile.username}`);
                getRecommendedMovies(profile.moviesLiked[0]);
            }
            if (profile && profile.showsLiked.length > 0) {
                setShowText(`Recommended shows for ${profile.username}`);
                getRecommendedShows(profile.showsLiked[0]);
            }
            dispatch(setCurrentUser(profile));
        } catch (error) {
            console.log("error here");
            console.log(error);
        }
    };

    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        // document.body.style.overflow = "hidden";

        getTrendingMovies();
        getTrendingShows();
        getProfile();
    }, []);

    let [movieText, setMovieText] = useState("Trending Movies");
    let [showText, setShowText] = useState("Trending Shows");

    return (
        <div className="home">
            <h3 className="title-sec">{movieText}</h3>
            <div className="show-row">
                <MoviesList type="movie" movies={movies} />
            </div>

            <h3 className="title-sec">{showText}</h3>
            <div className="show-row">
                <MoviesList type="show" movies={shows} />
            </div>
        </div>
    );
}
