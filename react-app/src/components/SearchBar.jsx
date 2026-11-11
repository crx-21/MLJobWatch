import React, { useState } from 'react';

export default function SearchBar({ filterOptions, onSearch }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSearch = () => {
    if (!query.trim() && !category && !level && !location && !company) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    onSearch({ query, category, level, location, company });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="search-container">
      <div className="search-bar">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search jobs, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={shake ? 'shake' : ''}
          />
          <button id="fetch-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="filters-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {filterOptions.categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            className="advanced-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? ' Close Filters ' : ' Advanced Filters '}
            <i className={`fas fa-chevron-${showAdvanced ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="advanced-grid">
            <div className="filter-item">
              <label>Experience Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">All Levels</option>
                {filterOptions.levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All Locations</option>
                {filterOptions.locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>Company</label>
              <select value={company} onChange={(e) => setCompany(e.target.value)}>
                <option value="">All Companies</option>
                {filterOptions.companies.map((com) => (
                  <option key={com} value={com}>{com}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
