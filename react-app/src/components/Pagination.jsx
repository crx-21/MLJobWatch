import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push({ type: 'page', number: i });
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push({ type: 'ellipsis', key: i });
    }
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pages.map((item) =>
        item.type === 'ellipsis' ? (
          <span className="pagination-btn" key={`ellipsis-${item.key}`}>...</span>
        ) : (
          <button
            key={item.number}
            className={`pagination-btn ${item.number === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(item.number)}
          >
            {item.number}
          </button>
        )
      )}

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
