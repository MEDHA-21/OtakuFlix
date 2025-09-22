import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
    {
        src: 'images/Carousel/naruto.jpg',
        altText: 'Naruto',
        caption: 'Follow Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
        header: 'Naruto'
    },
    {
        src: 'images/Carousel/fruits-basket.jpg',
        altText: 'Fruits Basket',
        caption: 'A heartwarming story about Tohru Honda who discovers the Sohma family\'s curse and brings healing through love and acceptance.',
        header: 'Fruits Basket'
    },
    {
        src: 'images/Carousel/solo-levelling.jpg',
        altText: 'Solo Levelling',
        caption: 'Sung Jin-Woo rises from the weakest hunter to the strongest through a mysterious system in a world filled with deadly dungeons.',
        header: 'Solo Levelling'
    },
    {
        src: 'images/Carousel/lord-of-mysteries.png',
        altText: 'Lord of Mysteries',
        caption: 'A mysterious tale of Klein Moretti who gets pulled into a world of supernatural beyonder powers, ancient gods, and eldritch horrors.',
        header: 'Lord of Mysteries'
    },
    {
        src: 'images/Carousel/demon-slayer.jpg',
        altText: 'Demon Slayer',
        caption: 'Tanjiro Kamado becomes a demon slayer to save his sister Nezuko and avenge his family in this breathtaking tale of courage.',
        header: 'Demon Slayer'
    },
    {
        src: 'images/Carousel/spyfamily.jpeg',
        altText: 'Spy Family',
        caption: 'A spy, an assassin, and a telepath form an unlikely fake family for their secret missions in this hilarious action-comedy.',
        header: 'Spy Family'
    }
];

const CarouselComponent = () => <UncontrolledCarousel items={items} />;

export default CarouselComponent;





