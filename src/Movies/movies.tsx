import { Link } from "react-router-dom";

export default function MoviesList({ movies }: { movies: any[] }) {
    return (
        <div className="d-flex flex-wrap">
            {movies.map((movie: any) => (
                <Link
                    to={`/movie/details/${movie.id}`}
                    style={{ textDecoration: "none", color: "white" }}
                    className="movie-card-container"
                >
                    <div className="m-3" key={movie.id} style={{ width: 200 }}>
                        <div
                            className="movie-text"
                            style={{ fontSize: 18, fontWeight: 500 }}
                            title={movie.title}
                        >
                            {movie.title}
                        </div>

                        <img
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
