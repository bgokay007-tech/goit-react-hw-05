import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../api/tmdb";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../../components/MovieReviews/MovieReviews"));

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from ?? "/movies");

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            const data = await getMovieDetails(movieId);
            setMovie(data);
            setLoading(false);
        };
        fetchMovie();
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found.</p>;

    return (
        <div className={css.container}>
            <NavLink to={backLinkRef.current} className={css.back}>
                ← Go back
            </NavLink>
            <div className={css.details}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={css.poster}
                />
                <div className={css.info}>
                    <h2>{movie.title}</h2>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average}</p>
                </div>
            </div>

            <div className={css.subnav}>
                <NavLink to="cast" state={{ from: backLinkRef.current }} className={css.link}>
                    Cast
                </NavLink>
                <NavLink to="reviews" state={{ from: backLinkRef.current }} className={css.link}>
                    Reviews
                </NavLink>
            </div>

            <Suspense fallback={<p>Loading section...</p>}>
                <Outlet />
            </Suspense>
        </div>
    );
}

