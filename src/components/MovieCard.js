import React from "react";
import "../styles.css";

export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    if (rating >= 5 && rating < 8) return "rating-ok";
    return "rating-bad";
  };

  const openYouTubeTrailer = () => {
    if (movie.trailerUrl) {
      // Convert embed URL to watch URL for better user experience
      const watchUrl = movie.trailerUrl.replace('/embed/', '/watch?v=');
      window.open(watchUrl, '_blank');
    }
  };

  return (
    <div key={movie.id} className="movie-card">
    <div key={movie.id} className="movie-card2">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        
        <div className="movie-card-actions">
          <label className="switch">
            <input
              type="checkbox"
              checked={isWatchlisted}
              onChange={() => toggleWatchlist(movie.id)}
            ></input>

            <span className="slider">
              <span className="slider-label">
                {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
              </span>
            </span>
          </label>
          
          {movie.trailerUrl && (
            <div className="youtube-logo-container" onClick={openYouTubeTrailer}>
              <svg className="youtube-logo" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
