import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About - MLJobWatch';
  }, []);

  return (
    <div className="about-shell">
      <header className="about-header">
        <Link to="/" className="about-brand">MLJobWatch</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/login">Sign in</Link>
        </nav>
      </header>

      <main className="about-content">
        <section className="about-card">
          <p className="about-eyebrow">About the project</p>
          <h1>Find your next opportunity in AI</h1>
          <p>
            MLJobWatch brings machine learning and artificial intelligence job
            listings together so you can explore opportunities in one place.
          </p>

          <div className="about-features">
            <article>
              <h2>Search your way</h2>
              <p>Search by keyword and narrow results by category, experience level, location, and company.</p>
            </article>
            <article>
              <h2>Explore each role</h2>
              <p>Review job details and follow the application link to the original listing.</p>
            </article>
          </div>

          <Link to="/login" className="about-cta">Get started</Link>
        </section>
      </main>
    </div>
  );
}
