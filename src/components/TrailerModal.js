import React, { useState, useEffect } from 'react';
import '../styles.css';

const TrailerModal = ({ isOpen, onClose, trailerUrl, title }) => {
    const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Delay iframe loading to ensure modal is fully rendered
            const timer = setTimeout(() => {
                setShouldLoadIframe(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setShouldLoadIframe(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleClose = () => {
        setShouldLoadIframe(false);
        onClose();
    };

    return (
        <div className="trailer-modal-overlay" onClick={handleOverlayClick}>
            <div className="trailer-modal-content">
                <div className="trailer-modal-header">
                    <h3>{title} - Trailer</h3>
                    <button className="trailer-close-btn" onClick={handleClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="trailer-video-container">
                    {shouldLoadIframe ? (
                        <iframe
                            src={trailerUrl}
                            title={`${title} Trailer`}
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    ) : (
                        <div className="trailer-loading">
                            <i className="bi bi-play-circle" style={{ fontSize: '4rem', color: '#fff' }}></i>
                            <p>Loading trailer...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;