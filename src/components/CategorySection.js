import React, { useState, useEffect } from 'react';
import SimpleAnimeCard from './SimpleAnimeCard';
import '../styles/categorySection.css';
import '../styles/simpleAnimeCard.css';

const CategorySection = ({ title, movies, watchlist, toggleWatchlist, showViewAll = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);
    const [isExpanded, setIsExpanded] = useState(false);

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

    const handleViewAll = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setCurrentIndex(0); // Reset to beginning when expanding
        }
    };

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

    // Show all movies when expanded, otherwise show carousel behavior
    const visibleMovies = isExpanded ? movies : movies.slice(currentIndex, currentIndex + itemsPerView);

    return (
        <div className="category-section">
            <div className="category-header">
                <h2 className="category-title">{title}</h2>
                {showViewAll && (
                    <button className="view-all-btn" onClick={handleViewAll}>
                        {isExpanded ? 'Show Less ←' : 'View All →'}
                    </button>
                )}
            </div>

            <div className={`category-carousel ${isExpanded ? 'expanded' : ''}`}>
                {!isExpanded && (
                    <button
                        className="carousel-btn carousel-btn-prev"
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                    >
                        ‹
                    </button>
                )}

                <div className="category-movies-container">
                    <div className={`category-movies-grid ${isExpanded ? 'grid-expanded' : ''}`}>
                        {visibleMovies.map((movie) => (
                            <div key={movie.id || movie.mal_id} className="category-movie-item">
                                <SimpleAnimeCard
                                    movie={movie}
                                    isWatchlisted={watchlist.includes(movie.id || movie.mal_id)}
                                    toggleWatchlist={toggleWatchlist}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {!isExpanded && (
                    <button
                        className="carousel-btn carousel-btn-next"
                        onClick={nextSlide}
                        disabled={currentIndex + itemsPerView >= movies.length}
                    >
                        ›
                    </button>
                )}
            </div>

            {isExpanded && (
                <div className="expanded-controls">
                    <p>{movies.length} anime in this category</p>
                </div>
            )}
        </div>
    );
};

export default CategorySection;