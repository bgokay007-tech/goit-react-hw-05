// src/components/MovieCast/MovieCast.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/tmdb";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setLoading(true);
                const data = await getMovieCast(movieId);
                setCast(data);
            } catch (err) {
                setError("Oyuncular yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };
        fetchCast();
    }, [movieId]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;
    if (!cast.length) return <p>Oyuncu bilgisi bulunamadı.</p>;

    return (
        <ul className={styles.castList}>
            {cast.map((actor) => (
                <li key={actor.cast_id} className={styles.castItem}>
                    <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/no-image.png"}
                        alt={actor.name}
                        className={styles.castImage}
                    />
                    <p>{actor.name}</p>
                    <p className={styles.character}>{actor.character}</p>
                </li>
            ))}
        </ul>
    );
}