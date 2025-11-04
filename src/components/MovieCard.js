import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    if (rating >= 5 && rating < 8) return "rating-ok";
    return "rating-bad";
  };

  const getWatchlistText = () => {
    if (isMobile) {
      return isWatchlisted ? "Added" : "Watchlist";
    }
    return isWatchlisted ? "In Watchlist" : "Add to Watchlist";
  };

  const openYouTubeTrailer = () => {
    if (movie.trailerUrl) {
      let watchUrl = movie.trailerUrl;
      
      // Handle different embed URL formats
      if (watchUrl.includes('/embed/')) {
        // Extract video ID from embed URL
        const videoIdMatch = watchUrl.match(/\/embed\/([^?]+)/);
        if (videoIdMatch) {
          const videoId = videoIdMatch[1];
          // Create proper YouTube watch URL
          watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }
      } else if (watchUrl.includes('youtube-nocookie.com')) {
        // Convert nocookie domain to regular youtube domain
        watchUrl = watchUrl.replace('youtube-nocookie.com', 'youtube.com');
        // If it's still an embed URL, convert to watch URL
        if (watchUrl.includes('/embed/')) {
          const videoIdMatch = watchUrl.match(/\/embed\/([^?]+)/);
          if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
          }
        }
      }
      
      window.open(watchUrl, '_blank');
    }
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('.movie-card-actions') || 
        e.target.closest('.youtube-logo-container') ||
        e.target.closest('.switch')) {
      return;
    }
    navigate(`/anime/${movie.id || movie.mal_id}`);
  };

  return (
    <div 
      key={movie.mal_id || movie.id} 
      className="movie-card2 clickable-card" 
      onClick={handleCardClick}
    >
      <img
        src={movie.image}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">
          {movie.title} ({movie.year})
        </h3>
        
        <div className="movie-card-details">
          <span className="movie-card-genre">
            🎭 {Array.isArray(movie.genre) 
              ? movie.genre[0].charAt(0).toUpperCase() + movie.genre[0].slice(1)
              : movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)
            }
          </span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            ⭐ {movie.rating}
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
                {getWatchlistText()}
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
  );
}
