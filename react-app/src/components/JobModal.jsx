import React from 'react';

export default function JobModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{job.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="modal-company">{job.company}</div>
          <div className="modal-meta">
            <span>
              <i className="fas fa-map-marker-alt"></i> {job.location || 'Remote'}
            </span>
            <span>
              <i className="fas fa-money-bill-wave"></i> {job.salary || 'Not specified'}
            </span>
            {job.posted && (
              <span className="modal-posted">
                <i className="fas fa-calendar-alt"></i> Posted: {job.posted}
              </span>
            )}
          </div>

          <div className="modal-description">
            <h4>Description</h4>
            <p>{job.description || 'No detailed description provided for this position.'}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="apply-now-btn"
            onClick={() => {
              if (job.apply_url) {
                window.open(job.apply_url, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
