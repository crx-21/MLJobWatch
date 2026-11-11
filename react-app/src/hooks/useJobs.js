import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://artificialintelligencejobs.co/api/jobs?limit=200';

export function useJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const jobs = Array.isArray(data) ? data : (data.jobs || []);
      setAllJobs(jobs);
      setFilteredJobs(jobs);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filterJobs = useCallback(({ query = '', category = '', level = '', location = '', company = '' }) => {
    const q = query.toLowerCase();
    const filtered = allJobs.filter(job => {
      const matchesQuery = !q || (job.title || '').toLowerCase().includes(q) ||
                          (job.company || '').toLowerCase().includes(q);
      const matchesCategory = !category || job.category === category;
      const matchesLevel = !level || job.level === level;
      const matchesLocation = !location || job.location === location;
      const matchesCompany = !company || job.company === company;
      return matchesQuery && matchesCategory && matchesLevel && matchesLocation && matchesCompany;
    });
    setFilteredJobs(filtered);
    return filtered;
  }, [allJobs]);

  const getFilterOptions = useCallback(() => {
    const categories = new Set();
    const levels = new Set();
    const locations = new Set();
    const companies = new Set();

    allJobs.forEach(job => {
      if (job.category) categories.add(job.category);
      if (job.level) levels.add(job.level);
      if (job.location) locations.add(job.location);
      if (job.company) companies.add(job.company);
    });

    return {
      categories: Array.from(categories).sort(),
      levels: Array.from(levels).sort(),
      locations: Array.from(locations).sort(),
      companies: Array.from(companies).sort(),
    };
  }, [allJobs]);

  return {
    allJobs,
    filteredJobs,
    loading,
    error,
    fetchJobs,
    filterJobs,
    getFilterOptions,
  };
}
