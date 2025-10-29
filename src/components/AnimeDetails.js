import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AnimeDetails({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the anime by ID
  const anime = movies.find(movie => movie.id === parseInt(id));
  
  if (!anime) {
    return (
      <div className="anime-details-container">
        <div className="anime-not-found">
          <h2>Anime not found</h2>
        </div>
      </div>
    );
  }

  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    if (rating >= 5 && rating < 8) return "rating-ok";
    return "rating-bad";
  };

  const openYouTubeTrailer = () => {
    if (anime.trailerUrl) {
      const watchUrl = anime.trailerUrl.replace('/embed/', '/watch?v=');
      window.open(watchUrl, '_blank');
    }
  };

  return (
    <div className="anime-details-container">
      
      <div className="anime-details-content">
        <div className="anime-details-header">
          <div className="anime-poster">
            <img
              src={anime.image}
              alt={anime.title}
              onError={handleError}
              className="anime-poster-img"
            />
          </div>
          
          <div className="anime-info">
            <h1 className="anime-title">{anime.title}</h1>
            <div className="anime-meta">
              <span className="anime-year">📅 {anime.year}</span>
              <span className="anime-episodes">📺 {anime.episodes} Episodes</span>
              <span className="anime-status">📊 {anime.status}</span>
            </div>
            
            <div className="anime-stats">
              <div className="anime-rating">
                <span className={`rating-badge ${getRatingClass(anime.rating)}`}>
                  ⭐ {anime.rating}
                </span>
              </div>
              <div className="anime-genre">
                <span className="genre-badge">
                  🎭 {Array.isArray(anime.genre) 
                    ? anime.genre.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')
                    : anime.genre.charAt(0).toUpperCase() + anime.genre.slice(1)
                  }
                </span>
              </div>
            </div>

            {anime.studios && (
              <div className="anime-studios">
                <strong>🎬 Studios:</strong> {anime.studios}
              </div>
            )}

            <div className="anime-actions">
              {anime.trailerUrl && (
                <button className="trailer-btn" onClick={openYouTubeTrailer}>
                  <svg className="youtube-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>

        {anime.synopsis && (
          <div className="anime-synopsis">
            <h3>Synopsis</h3>
            <p>{anime.synopsis}</p>
          </div>
        )}
      </div>
    </div>
  );
}