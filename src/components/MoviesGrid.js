import React, { useState, useMemo } from "react";
import MovieCard from "./MovieCard";
import CarouselComponent from "./CarouselComponent"

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Extract unique genres from movies data
  const availableGenres = useMemo(() => {
    const genreSet = new Set();
    movies.forEach(movie => {
      if (movie.genre) {
        genreSet.add(movie.genre);
      }
    });
    // Convert to array and sort alphabetically
    return Array.from(genreSet).sort();
  }, [movies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;

      case "Good":
        return movie.rating >= 8;

      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;

      case "Bad":
        return movie.rating < 5;

      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  // Limit to 12 movies initially unless "Show All" is clicked
  const displayedMovies = !showAll 
    ? filteredMovies.slice(0, 12) 
    : filteredMovies;

  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <div>
      
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <CarouselComponent></CarouselComponent>

      <div className="filter-bar">
        <div className="m-2">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="All Genres">All Genres</option>
            {availableGenres.map(genreName => (
              <option key={genreName} value={genreName}>
                {genreName.charAt(0).toUpperCase() + genreName.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="m-2">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {displayedMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)}
          ></MovieCard>
        ))}
      </div>

      {!showAll && filteredMovies.length > 12 && (
        <div className="show-more-container">
          <span className="show-more-link" onClick={handleShowMore}>
            Show More ⬇️
            {/* Show More ({filteredMovies.length - 12} more) */}
          </span>
        </div>
      )}
    </div>
  );
}
