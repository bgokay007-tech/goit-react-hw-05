import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
    const location = useLocation();
    return (
        <ul className={css.list}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.item}>
                    <Link
                        to={`/movies/${movie.id}`}
                        state={{ from: location }}
                        className={css.link}
                    >
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className={css.image}
                            />
                        ) : (
                            <div className={css.placeholder}>No Image</div>
                        )}
                        <p className={css.title}>{movie.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}