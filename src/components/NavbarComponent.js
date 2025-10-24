import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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





