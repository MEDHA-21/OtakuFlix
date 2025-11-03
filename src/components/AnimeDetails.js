import React, { useState ,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrailerModal from "./TrailerModal";
import "../styles/animeDetails.css";
import { Link } from 'react-router-dom';

export default function AnimeDetails({ movies, watchlist, toggleWatchlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
          window.scrollTo(0, 0);
      }, []);

  // Find the anime by ID (using both id and mal_id for compatibility)
  const anime = movies.find(movie => movie.id === parseInt(id) || movie.mal_id === parseInt(id));

  if (!anime) {
    return (
      <div className="anime-details-container">
        <div className="anime-not-found">
          <h2>Anime not found</h2>
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const openTrailer = () => {
    if (anime.trailerUrl) {
      setIsTrailerModalOpen(true);
    } else {
      // If no trailer available, show an alert or message
      alert('No trailer available for this anime.');
    }
  };

  const closeTrailer = () => {
    setIsTrailerModalOpen(false);
  };

  const isWatchlisted = watchlist.includes(anime.id || anime.mal_id);

  const handleWatchlistToggle = () => {
    toggleWatchlist(anime.id || anime.mal_id);
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  // Format studios
  const formatStudios = (studios) => {
    if (!studios) return '';
    if (typeof studios === 'string') return studios;
    if (Array.isArray(studios)) return studios.map(studio => studio.name || studio).join(', ');
    return '';
  };

  // Get anime image
  const getAnimeImage = () => {
    return anime.image ||
      anime.images?.jpg?.large_image_url ||
      anime.images?.jpg?.image_url ||
      "images/default.jpg";
  };

  // Get synopsis with read more functionality
  const getSynopsis = () => {
    if (!anime.synopsis) return '';
    if (isReadMore || anime.synopsis.length <= 300) {
      return anime.synopsis;
    }
    return anime.synopsis.substring(0, 300) + '...';
  };

  return (
    <div className="anime-details-container">
      <Link
        to="/"
        className="back-button"
      >
        <span>  ← Back</span>
      </Link>

      <div className="anime-details-content">
        <div className="anime-hero-section px-5" >
          <div className="anime-poster">
            <img
              src={getAnimeImage()}
              alt={anime.title || anime.title_english}
              onError={handleError}
              className="anime-poster-img"
            />
          </div>

          <div className="anime-info">
            <div className="anime-header">
              <h1 className="anime-title">
                {anime.title}
              </h1>

              {anime.rating && (
                <div className="anime-rating-badge">
                  <span className="content-rating">{anime.rating}</span>
                </div>
              )}
            </div>

            <div className="anime-meta-info">
              <span className="country-year">
                {anime.status} • {anime.year} • {anime.episodes} episodes
              </span>
            </div>

            <div className="anime-details-info">
              {anime.studios && (
                <div className="info-item">
                  <span className="info-label">STUDIO</span>
                  <span className="info-value">{formatStudios(anime.studios)}</span>
                </div>
              )}

              {anime.genre && (
                <div className="info-item">
                  <span className="info-label">PRIMARY GENRE</span>
                  <span className="info-value">{anime.genre.charAt(0).toUpperCase() + anime.genre.slice(1)}</span>
                </div>
              )}
            </div>

            <div className="anime-genres">
              {anime.genres && anime.genres.length > 0 && anime.genres.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </span>
              ))}
            </div>

          </div>
        </div>
        <div className="anime-description px-5">
          {anime.synopsis && (
            <>
              <p>{getSynopsis()}</p>
              {anime.synopsis.length > 300 && (
                <button className="read-more-btn" onClick={toggleReadMore}>
                  {isReadMore ? 'Show Less' : 'Read More'}
                </button>
              )}
            </>
          )}
        </div>

        <div className="anime-bottom-section">
          <div className="anime-actions">
            {/* Show trailer button always, handle no trailer case in onClick */}
            <button className="watch-trailer-btn" onClick={openTrailer}>
              Watch Trailer
            </button>

            <button
              className={`watchlist-btn ${isWatchlisted ? 'added' : ''}`}
              onClick={handleWatchlistToggle}
            >
              {isWatchlisted ? '✓ Watchlist' : '+ Watchlist'}
            </button>
          </div>
        </div>
      </div>

      {isTrailerModalOpen && anime.trailerUrl && (
        <TrailerModal
          isOpen={isTrailerModalOpen}
          trailerUrl={anime.trailerUrl}
          title={anime.title}
          onClose={closeTrailer}
        />
      )}
    </div>
  );
}