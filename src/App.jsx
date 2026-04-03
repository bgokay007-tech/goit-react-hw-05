import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import MovieCast from "./components/MovieCast/MovieCast.jsx";
import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";

// Sayfaları lazy load ile yükle
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage.jsx"));

function App() {
    return (
        <>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;