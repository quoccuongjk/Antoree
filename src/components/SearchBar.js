import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, priceFilter, onPriceFilterChange }) => {
  return (
    <div className="searchbar-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="price-select-wrapper">
        <select
          value={priceFilter}
          onChange={(e) => onPriceFilterChange(e.target.value)}
          className="price-select"
        >
          <option value="">Tất Cả</option>
          <option value="<500000">{'0 - 500K VNĐ'}</option>
          <option value="500000-1000000">500K - 1 Triệu VNĐ</option>
          <option value=">1000000">{'Trên 1 Triệu VNĐ'}</option>
        </select>
        <svg className="select-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;