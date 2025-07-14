import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({ activeTab, setActiveTab, favorites }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 onClick={() => handleTabClick('products')} className={`title ${activeTab === 'products' ? 'active' : ''}`}>FE</h1>
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Mở menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={() => handleTabClick('products')} className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}>
            Khóa học
          </button>
          <button onClick={() => handleTabClick('favorites')} className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}>
            Yêu thích
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </button>
          <button onClick={() => handleTabClick('history')} className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}>
            Lịch sử
          </button>
          <button onClick={() => handleTabClick('chatbot')} className={`tab-button ${activeTab === 'chatbot' ? 'active' : ''}`}>
            Chatbot AI ✨
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;