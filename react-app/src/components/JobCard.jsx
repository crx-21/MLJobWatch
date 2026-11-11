import React from 'react';

export default function JobCard({ job, index, onCardClick }) {
  return (
    <div className="job-card" onClick={() => onCardClick(index)}>
      <h3>{job.title}</h3>
      <div className="company">{job.company}</div>
      <div className="details">
        <span className="detail-item">
          <i className="fas fa-map-marker-alt"></i> {job.location || 'Remote'}
        </span>
        <span className="detail-item">
          <i className="fas fa-tag"></i> {job.category || 'N/A'}
        </span>
        <span className="detail-item">
          <i className="fas fa-layer-group"></i> {job.level || 'N/A'}
        </span>
        <span className="detail-item">
          <i className="fas fa-calendar-alt"></i> Posted: {job.posted || 'N/A'}
        </span>
      </div>
      <a
        href={job.apply_url || job.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="fast-apply-btn"
        onClick={(e) => e.stopPropagation()}
      >
        Fast Apply
      </a>
    </div>
  );
}
