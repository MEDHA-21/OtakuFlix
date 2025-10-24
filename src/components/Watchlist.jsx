import React, { useState } from "react";
import MovieCard from "./MovieCard";

export default function Watchlist({ movies, watchlist, toggleWatchlist }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const watchlistMovies = watchlist
        .map((id) => movies.find((movie) => movie.id === id))
        .filter(Boolean);

    const totalMovies = watchlistMovies.length;
    const averageRating =
        totalMovies > 0
            ? (
                watchlistMovies.reduce(
                    (sum, movie) => sum + parseFloat(movie.rating),
                    0
                ) / totalMovies
            ).toFixed(1)
            : 0;

    // Get recommendations based on watchlist genres
    const getRecommendations = () => {
        if (totalMovies === 0) return [];

        const watchlistGenres = watchlistMovies.map((movie) => movie.genre);
        const popularGenres = [...new Set(watchlistGenres)];

        return movies
            .filter(
                (movie) =>
                    !watchlist.includes(movie.id) &&
                    popularGenres.includes(movie.genre) &&
                    parseFloat(movie.rating) >= 7.0
            )
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, 4);
    };

    const recommendations = getRecommendations();

    const handleClearAll = () => {
        watchlist.forEach((id) => toggleWatchlist(id));
        setShowConfirmation(false);
    };

    return (
        <div>
            <div className="watchlist-header">
                <div className="watchlist-header-content">
                    <div className="watchlist-title-section">
                        <h1 className="watchlist-main-title">🎬 My Watchlist</h1>
                        <p className="watchlist-subtitle">
                            Your curated collection of must-watch movies
                        </p>
                    </div>
                    <div className="watchlist-stats">
                        <div className="stat-item">
                            <span className="stat-number">{totalMovies}</span>
                            <span className="stat-label">Movies</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{averageRating}</span>
                            <span className="stat-label">Avg Rating</span>
                        </div>
                        {totalMovies > 0 && (
                            <button
                                className="clear-all-btn"
                                onClick={() => setShowConfirmation(true)}
                            >
                                🗑️ Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-modal">
                        <h3>Clear All Movies?</h3>
                        <p>
                            Are you sure you want to remove all movies from your watchlist?
                            This action cannot be undone.
                        </p>
                        <div className="confirmation-buttons">
                            <button className="confirm-btn" onClick={handleClearAll}>
                                Yes, Clear All
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            {totalMovies === 0 ? (
                <div className="empty-watchlist">
                    <div className="empty-illustration">
                        <div className="empty-icon">🎬</div>
                        <h2>Your Watchlist is Empty</h2>
                        <p>
                            Discover amazing movies and add them to your personal collection!
                        </p>
                        <div className="empty-suggestions">
                            <span>💡 Browse by genre</span>
                            <span>⭐ Check high-rated movies</span>
                            <span>🔍 Use the search feature</span>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="watchlist">
                        {watchlist.map((id) => {
                            const movie = movies.find((movie) => movie.id === id);
                            return (
                                <MovieCard
                                    key={id}
                                    movie={movie}
                                    toggleWatchlist={toggleWatchlist}
                                    isWatchlisted={true}
                                ></MovieCard>
                            );
                        })}
                    </div>

                    {/* Smart Recommendations */}
                    {recommendations.length > 0 && (
                        <div className="recommendations-section">
                            <div className="recommendations-header">
                                <h2 className="recommendations-title">
                                    <span className="recommendations-icon">💫</span>
                                    Based on your watchlist, you might like...
                                </h2>
                                <p className="recommendations-subtitle">
                                    Handpicked animes matching your taste
                                </p>
                            </div>
                            <div className="recommendations-grid">
                                {recommendations.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        toggleWatchlist={toggleWatchlist}
                                        isWatchlisted={watchlist.includes(movie.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
