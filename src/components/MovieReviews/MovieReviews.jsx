// src/components/MovieReviews/MovieReviews.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
            } catch (err) {
                setError("İncelemeler yüklenemedi.");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [movieId]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;
    if (!reviews.length) return <p>İnceleme bulunamadı.</p>;

    return (
        <ul className={styles.reviewList}>
            {reviews.map((review) => (
                <li key={review.id} className={styles.reviewItem}>
                    <p className={styles.author}>Yazar: {review.author}</p>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    );
}