import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/contactUs.css';

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just show an alert. Later on, this will be sent to a backend
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    const navigateToFooter = () => {
        navigate('/');
        // Small delay to ensure the page loads before scrolling
        setTimeout(() => {
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div className="contact-us-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">
                        <span className="contact-icon">📬</span>
                        Contact Us
                    </h1>
                    <p className="contact-subtitle">
                        I'd love to hear from you. Send me a message and I'll respond as soon as possible.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="info-icon">📧</div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p>medhaverma15@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">💬</div>
                            <div className="info-text">
                                <h3>Chat</h3>
                                <p>Available 24/7</p>
                            </div>
                        </div>
                        <div className="info-item social-clickable" onClick={navigateToFooter}>
                            <div className="info-icon">🌐</div>
                            <div className="info-text">
                                <h3>Social</h3>
                                <p>Click to view my social links</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a topic</option>
                                <option value="general">General Inquiry</option>
                                <option value="technical">Technical Support</option>
                                <option value="content">Content Request</option>
                                <option value="feedback">Feedback</option>
                                <option value="partnership">Partnership</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Tell us how we can help you..."
                                rows="5"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            <span>Send Message</span>
                            <span className="btn-icon">✈️</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;