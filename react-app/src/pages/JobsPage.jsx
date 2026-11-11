import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../hooks/useJobs';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Pagination from '../components/Pagination';
import CustomAlert from '../components/CustomAlert';
import '../styles/jobs.css';

const JOBS_PER_PAGE = 20;

export default function JobsPage() {
  const { user, logout } = useAuth();
  const { filteredJobs, loading, error, filterJobs, getFilterOptions, fetchJobs } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [searchMeta, setSearchMeta] = useState(null);

  useEffect(() => {
    document.title = 'Jobs - MLJobWatch';
  }, []);

  const filterOptions = useMemo(() => getFilterOptions(), [getFilterOptions]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleSearch = (filters) => {
    const result = filterJobs(filters);
    setCurrentPage(1);
    setSearchMeta({
      count: result.length,
      query: filters.query,
      category: filters.category,
      level: filters.level,
    });
  };

  const handleCardClick = (index) => {
    const globalIndex = (currentPage - 1) * JOBS_PER_PAGE + index;
    setSelectedJob(filteredJobs[globalIndex]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header>
        <h1>MLJobWatch</h1>
        <nav>
          <Link to="/" title="Home"><i className="fas fa-home"></i></Link>
          {user && <span className="user-info">{user.email}</span>}
          <button className="logout-btn" title="Logout" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </nav>
      </header>

      <main>
        <SearchBar filterOptions={filterOptions} onSearch={handleSearch} />

        <div className="result-container">
          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Searching for jobs...</p>
            </div>
          )}

          {error && (
            <div className="error-card">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button className="retry-btn" onClick={fetchJobs}>Try Again</button>
            </div>
          )}

          {!loading && !error && (
            <>
              {searchMeta && (
                <>
                  <div className="search-meta">
                    <p>
                      <strong>Found {searchMeta.count} jobs{searchMeta.query ? ` for: ${searchMeta.query}` : ''}</strong>
                      {' | '}<strong>Category:</strong> {searchMeta.category || 'All'}
                      {' | '}<strong>Level:</strong> {searchMeta.level || 'All'}
                    </p>
                  </div>
                  <hr style={{ margin: '10px 0', border: 0, borderTop: '1px solid #eee' }} />
                </>
              )}

              {filteredJobs.length === 0 ? (
                <div className="no-results">
                  No jobs found matching your criteria. Try adjusting your filters!
                </div>
              ) : (
                <div className="job-list">
                  {paginatedJobs.map((job, index) => (
                    <JobCard
                      key={job.id || index}
                      job={job}
                      index={index}
                      onCardClick={handleCardClick}
                    />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>

      <footer style={{ marginBottom: '100px' }}>
        <p>&copy; 2026 API Project</p>
      </footer>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {alertMessage && (
        <CustomAlert message={alertMessage} onDone={() => setAlertMessage(null)} />
      )}
    </>
  );
}
