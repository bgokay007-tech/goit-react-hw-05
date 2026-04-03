import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    useEffect(() => {
        if (!query) return;
        const fetchMovies = async () => {
            setLoading(true);
            const data = await searchMovies(query);
            setMovies(data);
            setLoading(false);
        };
        fetchMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const value = form.elements.query.value.trim();
        if (!value) return;
        setSearchParams({ query: value });
        form.reset();
    };

    return (
        <div className={css.container}>
            <h1 className={css.title}>Search Movies</h1>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    type="text"
                    name="query"
                    placeholder="Enter movie name..."
                    className={css.input}
                />
                <button type="submit" className={css.button}>
                    Search
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
            {!loading && query && movies.length === 0 && <p>No movies found.</p>}
        </div>
    );
}