import React, { useState } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import TrailerModal from './TrailerModal';

const items = [
    {
        src: 'images/Carousel/naruto.jpg',
        altText: 'Naruto',
        caption: 'Follow Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
        header: 'Naruto',
        trailerUrl: 'https://www.youtube.com/embed/QczGoCmX-pI'
    },
    {
        src: 'images/Carousel/fruits-basket.jpg',
        altText: 'Fruits Basket',
        caption: 'A heartwarming story about Tohru Honda who discovers the Sohma family\'s curse and brings healing through love and acceptance.',
        header: 'Fruits Basket',
        trailerUrl: 'https://www.youtube.com/embed/Wz0P0mYYY0Q'
    },
    {
        src: 'images/Carousel/solo-levelling.jpg',
        altText: 'Solo Levelling',
        caption: 'Sung Jin-Woo rises from the weakest hunter to the strongest through a mysterious system in a world filled with deadly dungeons.',
        header: 'Solo Levelling',
        trailerUrl: 'https://www.youtube.com/embed/I6JIwjWOhnQ'
    },
    {
        src: 'images/Carousel/lord-of-mysteries.png',
        altText: 'Lord of Mysteries',
        caption: 'A mysterious tale of Klein Moretti who gets pulled into a world of supernatural beyonder powers, ancient gods, and eldritch horrors.',
        header: 'Lord of Mysteries',
        trailerUrl: 'https://www.youtube.com/embed/a8p-l75icsA'
    },
    {
        src: 'images/Carousel/demon-slayer.jpg',
        altText: 'Demon Slayer',
        caption: 'Tanjiro Kamado becomes a demon slayer to save his sister Nezuko and avenge his family in this breathtaking tale of courage.',
        header: 'Demon Slayer',
        trailerUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4'
    },
    {
        src: 'images/Carousel/spyfamily.jpeg',
        altText: 'Spy Family',
        caption: 'A spy, an assassin, and a telepath form an unlikely fake family for their secret missions in this hilarious action-comedy.',
        header: 'Spy Family',
        trailerUrl: 'https://www.youtube.com/embed/ofXigq9aIpo'
    }
];

const CarouselComponent = () => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    const openTrailer = (item) => {
        setSelectedTrailer(item);
        setIsTrailerOpen(true);
    };

    const closeTrailer = () => {
        setIsTrailerOpen(false);
        setSelectedTrailer(null);
    };

    // Add custom carousel with trailer buttons
    const customItems = items.map(item => ({
        ...item,
        caption: (
            <div>
                <p>{item.caption}</p>
                <button 
                    className="carousel-trailer-btn" 
                    onClick={() => openTrailer(item)}
                >
                    <i className="bi bi-play-circle-fill"></i>
                    Watch Trailer
                </button>
            </div>
        )
    }));

    return (
        <div>
            <UncontrolledCarousel items={customItems} />
            {selectedTrailer && (
                <TrailerModal
                    isOpen={isTrailerOpen}
                    onClose={closeTrailer}
                    trailerUrl={selectedTrailer.trailerUrl}
                    title={selectedTrailer.header}
                />
            )}
        </div>
    );
};

export default CarouselComponent;





