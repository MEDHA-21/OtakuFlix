import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles/categorySection.css';

const CategorySection = ({ title, movies, watchlist, toggleWatchlist, showViewAll = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);

    // Function to determine items per view based on screen size
    const updateItemsPerView = () => {
        const width = window.innerWidth;
        if (width <= 480) {
            setItemsPerView(1); // Mobile: show 1 card
        } else if (width <= 768) {
            setItemsPerView(2); // Tablet: show 2 cards
        } else if (width <= 968) {
            setItemsPerView(2); // Small tablet: show 2 cards
        } else if (width <= 1200) {
            setItemsPerView(3); // Large tablet: show 3 cards
        } else {
            setItemsPerView(4); // Desktop: show 4 cards
        }
    };

    // Set up resize listener
    useEffect(() => {
        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    // Reset currentIndex when itemsPerView changes to avoid showing empty slides
    useEffect(() => {
        setCurrentIndex(0);
    }, [itemsPerView]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, movies.length - itemsPerView);
            return prevIndex + itemsPerView > maxIndex ? 0 : prevIndex + itemsPerView;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                const maxIndex = Math.max(0, movies.length - itemsPerView);
                return Math.floor(maxIndex / itemsPerView) * itemsPerView;
            }
            return Math.max(0, prevIndex - itemsPerView);
        });
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