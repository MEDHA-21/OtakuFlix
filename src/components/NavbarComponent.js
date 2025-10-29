import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check for saved theme preference or default to light theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
            document.body.setAttribute('data-theme', savedTheme);
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        const theme = newTheme ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Brand/Logo */}
                <Link to="/" className="navbar-brand">
                    <i className="bi bi-film"></i>
                    <span>OtakuFlix</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link 
                                to="/watchlist" 
                                className={`nav-link ${isActive('/watchlist') ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="bi bi-bookmark-heart"></i>
                                <span>My List</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/login" 
                                className={`nav-link login-link ${isActive('/login') ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="bi bi-person-circle"></i>
                                <span>Login</span>
                            </Link>
                        </li>
                        {/* Toggle button theme from https://uiverse.io/ */}
                        <li className="nav-item theme-toggle-item">
                            <label className="switch">
                                <input 
                                    id="theme-input" 
                                    type="checkbox" 
                                    checked={isDarkTheme} 
                                    onChange={toggleTheme}
                                />
                                <div className="slider round">
                                    <div className="sun-moon">
                                        <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>

                                        <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                        <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="50"></circle>
                                        </svg>
                                    </div>
                                    <div className="stars">
                                        <svg id="star-1" className="star" viewBox="0 0 20 20">
                                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                                        </svg>
                                        <svg id="star-2" className="star" viewBox="0 0 20 20">
                                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                                        </svg>
                                        <svg id="star-3" className="star" viewBox="0 0 20 20">
                                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                                        </svg>
                                        <svg id="star-4" className="star" viewBox="0 0 20 20">
                                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>

                {/* Mobile Hamburger Menu */}
                <button 
                    className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>
        </nav>
    )
};

export default NavbarComponent;





