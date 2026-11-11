import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function HomePage() {
  useEffect(() => {
    document.title = 'MLJobWatch - Discover ML AI Jobs';
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-text">
          <h1>MLJobWatch</h1>
          <p>Track the latest machine learning and AI job opportunities across the industry.</p>
          <div className="cta-wrapper">
            <Link to="/jobs" className="btn-go-jobs" aria-label="Go to jobs">
              Start Now!
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-robot">
          <img src="/assets/robot.gif" alt="MLJobWatch Robot" className="robot-gif" />
        </div>
      </section>

      <nav className="nav-links">
        <Link to="/login" className="nav-link">
          <i className="fas fa-sign-in-alt"></i> Sign In
        </Link>
        <Link to="/about" className="nav-link">
          <i className="fas fa-info-circle"></i> About
        </Link>
      </nav>
    </>
  );
}
