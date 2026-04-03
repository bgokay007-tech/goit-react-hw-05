import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            const data = await getTrendingMovies();
            setMovies(data);
            setLoading(false);
        };
        fetchTrending();
    }, []);

    return (
        <div className={css.container}>
            <h1 className={css.title}>Trending Movies</h1>
            {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
        </div>
    );
}