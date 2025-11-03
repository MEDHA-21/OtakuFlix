import React from "react";
import { useNavigate } from "react-router-dom";

export default function SimpleAnimeCard({ movie, isWatchlisted, toggleWatchlist }) {
    const navigate = useNavigate();

    const handleError = (e) => {
        e.target.src = "images/default.jpg";
    };

    const handleCardClick = () => {
        navigate(`/anime/${movie.id || movie.mal_id}`);
    };

    const handleBookmarkClick = (e) => {
        e.stopPropagation(); // Prevent card click when clicking bookmark
        toggleWatchlist(movie.id || movie.mal_id);
    };

    return (
        <div className="simple-anime-card" onClick={handleCardClick}>
            <div className="simple-anime-image">
                <img
                    src={movie.images?.jpg?.image_url || movie.image}
                    alt={movie.title_english || movie.title}
                    onError={handleError}
                />
                <div 
                    className={`bookmark-star ${isWatchlisted ? 'bookmarked' : ''}`}
                    onClick={handleBookmarkClick}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
            </div>
            <div className="simple-anime-title">
                {movie.title_english || movie.title}
            </div>
        </div>
    );
}