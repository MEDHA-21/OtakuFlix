import React, { useState, useMemo } from "react";
import CategorySection from "./CategorySection";
import CarouselComponent from "./CarouselComponent";
import MovieCard from "./MovieCard";
import "../styles/landingPage.css";

export default function LandingPage({ movies, categorizedData, watchlist, toggleWatchlist }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    // Extract unique genres from movies data
    const availableGenres = useMemo(() => {
        const genreSet = new Set();
        movies.forEach(movie => {
            if (movie.genre) {
                genreSet.add(movie.genre);
            }
        });
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

    return (
        <div className="landing-page">
            {/* Simple Search Bar - Original Style */}
            <input
                type="text"
                className="search-input"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {/* Hero Carousel */}
            <CarouselComponent />

            {/* Filter Bar - Always Visible */}
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

            {/* Show search results if searching, otherwise show categories */}
            {searchTerm.trim() !== "" || genre !== "All Genres" || rating !== "All" ? (
                <div className="movies-grid">
                    {filteredMovies.map((movie) => (
                        <MovieCard
                            movie={movie}
                            key={movie.id}
                            toggleWatchlist={toggleWatchlist}
                            isWatchlisted={watchlist.includes(movie.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="categories-container">
                    {categorizedData?.popular && categorizedData.popular.length > 0 && (
                        <CategorySection
                            title="Popular Picks"
                            movies={categorizedData.popular}
                            watchlist={watchlist}
                            toggleWatchlist={toggleWatchlist}
                        />
                    )}

                    {categorizedData?.currentSeason && categorizedData.currentSeason.length > 0 && (
                        <CategorySection
                            title="This Season"
                            movies={categorizedData.currentSeason}
                            watchlist={watchlist}
                            toggleWatchlist={toggleWatchlist}
                        />
                    )}

                    {categorizedData?.action && categorizedData.action.length > 0 && (
                        <CategorySection
                            title="Action & Adventure"
                            movies={categorizedData.action}
                            watchlist={watchlist}
                            toggleWatchlist={toggleWatchlist}
                        />
                    )}

                    {categorizedData?.romance && categorizedData.romance.length > 0 && (
                        <CategorySection
                            title="Romance"
                            movies={categorizedData.romance}
                            watchlist={watchlist}
                            toggleWatchlist={toggleWatchlist}
                        />
                    )}

                    {categorizedData?.comedy && categorizedData.comedy.length > 0 && (
                        <CategorySection
                            title="Comedy"
                            movies={categorizedData.comedy}
                            watchlist={watchlist}
                            toggleWatchlist={toggleWatchlist}
                        />
                    )}

                    {/* Always show a fallback section if no categorized data */}
                    {(!categorizedData || Object.values(categorizedData).every(cat => !cat || cat.length === 0)) && movies.length > 0 && (
                        <CategorySection
                            title="All Anime"
                            movies={movies.slice(0, 20)}
                            watchlist={watchlist}
                            toggleWatchlist={toggleWatchlist}
                        />
                    )}
                    
                    {/* Debug info - remove this in production */}
                    {categorizedData && (
                        <div style={{ padding: '1rem', fontSize: '0.8rem', color: '#666' }}>
                            <strong>Debug Info:</strong> Popular: {categorizedData.popular?.length || 0}, 
                            Action: {categorizedData.action?.length || 0}, 
                            Romance: {categorizedData.romance?.length || 0}, 
                            Comedy: {categorizedData.comedy?.length || 0}, 
                            Current Season: {categorizedData.currentSeason?.length || 0}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}