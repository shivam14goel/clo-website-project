import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, setFilters, resetFilters }) => {
  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="filter-panel">
      <h4>Filter by</h4>
      <div className="checkbox-group">
        {['Paid', 'Free', 'ViewOnly'].map((key) => (
          <label key={key}>
            <input type="checkbox" checked={filters[key]} onChange={() => toggleFilter(key)} />
            {key}
          </label>
        ))}
        <button onClick={resetFilters}>Reset</button>
      </div>
    </div>
  );
};

export default FilterPanel;