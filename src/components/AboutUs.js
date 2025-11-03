import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/aboutUs.css';

const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-us-page pt-2">

            <div className="about-content">
                <div className="about-section">
                    <div className="section-header">
                        <h2>👨‍💻 My Story</h2>
                    </div>
                    <p>
                        Hey there! I'm a passionate front-end React developer who happens to be a huge anime lover. 
                        OtakuFlix started as my personal project to combine two things I'm obsessed with - 
                        building cool web applications and watching amazing anime. This isn't just another portfolio 
                        project; it's my playground for experimenting with React, practicing modern web development, 
                        and creating something that fellow otaku would actually want to use!
                    </p>
                </div>

                <div className="about-section">
                    <div className="section-header">
                        <h2>� Why I Built This</h2>
                    </div>
                    <p>
                        As a developer, I believe the best way to learn is by building real projects that solve real problems. 
                        As an anime fan, I wanted a clean, beautiful interface to discover and organize my anime watchlist. 
                        So why not kill two birds with one stone? This project helps me practice React hooks, state management, 
                        responsive design, API integration, and all the modern web dev skills while creating something I'd 
                        actually use in my daily life!
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚛️</div>
                        <h3>React Practice</h3>
                        <p>Hands-on experience with React hooks, routing, state management, and component architecture</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>UI/UX Design</h3>
                        <p>Experimenting with modern CSS, responsive design, and creating intuitive user experiences</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">�</div>
                        <h3>API Integration</h3>
                        <p>Working with real anime data from MyAnimeList API to create dynamic, data-driven interfaces</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💖</div>
                        <h3>Passion Project</h3>
                        <p>Building something I genuinely care about - a platform for anime lovers by an anime lover</p>
                    </div>
                </div>

                <div className="about-section">
                    <div className="section-header">
                        <h2>🛠️ Tech Stack & Learning</h2>
                    </div>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <div className="tech-icon">⚛️</div>
                            <div className="tech-info">
                                <h4>React</h4>
                                <p>Functional components, hooks, context, and modern React patterns</p>
                            </div>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">🎨</div>
                            <div className="tech-info">
                                <h4>CSS3 & Bootstrap-5</h4>
                                <p>Flexbox, Grid, animations, responsive design, and modern styling techniques</p>
                            </div>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">🌐</div>
                            <div className="tech-info">
                                <h4>API Integration</h4>
                                <p>RESTful APIs, async/await, error handling, and data fetching best practices</p>
                            </div>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">📱</div>
                            <div className="tech-info">
                                <h4>Responsive Design</h4>
                                <p>Mobile-first approach, cross-browser compatibility, and accessibility</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section stats-section">
                    <div className="section-header">
                        <h2>📊 My Journey So Far</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Hours Coded</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Anime Watched</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Coffee Cups</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1</span>
                            <span className="stat-label">Passionate Dev</span>
                        </div>
                    </div>
                </div>

                <div className="about-section cta-section">
                    <div className="cta-content">
                        <h2>Let's Connect! 🤝</h2>
                        <p>Fellow developer? Anime enthusiast? I'd love to hear your thoughts on this project!</p>
                        <div className="cta-buttons">
                            <button className="cta-btn primary" onClick={() => navigate('/')}>
                                Explore the App
                            </button>
                            <button className="cta-btn secondary" onClick={() => navigate('/contact')}>
                                Get in Touch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;