import React, { useState } from 'react';
import MovieCard from './MovieCard';
import '../styles/categorySection.css';

const CategorySection = ({ title, movies, watchlist, toggleWatchlist, showViewAll = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4; // Number of items visible at once

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsPerView >= movies.length ? 0 : prevIndex + itemsPerView
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, movies.length - itemsPerView) : prevIndex - itemsPerView
        );
    };

    const visibleMovies = movies.slice(currentIndex, currentIndex + itemsPerView);

    return (
        <div className="category-section">
            <div className="category-header">
                <h2 className="category-title">{title}</h2>
                {showViewAll && (
                    <button className="view-all-btn">View All →</button>
                )}
            </div>

            <div className="category-carousel">
                <button
                    className="carousel-btn carousel-btn-prev"
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                >
                    ‹
                </button>

                <div className="category-movies-container">
                    <div className="category-movies-grid">
                        {visibleMovies.map((movie) => (
                            <div key={movie.id} className="category-movie-item">
                                <MovieCard
                                    movie={movie}
                                    toggleWatchlist={toggleWatchlist}
                                    isWatchlisted={watchlist.includes(movie.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="carousel-btn carousel-btn-next"
                    onClick={nextSlide}
                    disabled={currentIndex + itemsPerView >= movies.length}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default CategorySection;