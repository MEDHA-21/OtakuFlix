import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Connect with us:</h3>
                    <div className="social-icons">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bi bi-facebook"
                        ></a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-app">
                <h3>Download our App</h3>
                <div className="app-links">
                    <div className="pb-2">
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bi bi-google-play"
                        >
                            {" "}
                            For Android devices
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.microsoft.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bi bi-windows"
                        >
                            {" "}
                            For PC's and Laptop devices
                        </a>
                    </div>
                </div>
            </div>
            <p className="footer-text">
                © {currentYear} OtakuFlix, All rights reserved. Made with ❤️ for Anime lovers!
            </p>
        </footer>
    );
}
