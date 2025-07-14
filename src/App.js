import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import Toast from './components/Toast';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import Footer from './components/Footer';
import { mockProducts, mockAISuggestions } from './api/MockData';

function App() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites", error);
      return [];
    }
  });
  const [viewHistory, setViewHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem('viewHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to parse view history", error);
      return [];
    }
  });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [toast, setToast] = useState(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
    } catch (error) {
      console.error("Failed to save view history", error);
    }
  }, [viewHistory]);

  function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const filteredProducts = useMemo(() => {
    let currentProducts = products;

    if (searchTerm) {
      const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());
      currentProducts = currentProducts.filter(product => {
        const normalizedProductName = removeDiacritics(product.name.toLowerCase());
        return normalizedProductName.includes(normalizedSearchTerm);
      });
    }

    if (priceFilter) {
      currentProducts = currentProducts.filter(product => {
        if (priceFilter === '<500000') {
          return product.price < 500000;
        } else if (priceFilter === '500000-1000000') {
          return product.price >= 500000 && product.price <= 1000000;
        } else if (priceFilter === '>1000000') {
          return product.price > 1000000;
        }
        return true;
      });
    }
    return currentProducts;
  }, [products, searchTerm, priceFilter]);

  const handleShowDetails = useCallback((product) => {
    setSelectedProduct(product);
    setViewHistory(prevHistory => {
      const newHistory = [product, ...prevHistory.filter(item => item.id !== product.id)];
      return newHistory.slice(0, 5);
    });
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleToggleFavorite = useCallback((product) => {
    setFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.some(fav => fav.id === product.id);
      let newFavorites;
      let message;
      let type;

      if (isCurrentlyFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.id !== product.id);
        message = `Đã bỏ yêu thích: ${product.name}`;
        type = 'success';
      } else {
        newFavorites = [...prevFavorites, product];
        message = `Đã thêm vào yêu thích: ${product.name}`;
        type = 'success';
      }
      setToast({ message, type });
      return newFavorites;
    });
  }, []);

  const fetchAISuggestions = useCallback(async () => {
    setAiLoading(true);
    setAiError(null);
    setAiSuggestions([]);
    setShowAiSuggestions(true);
    try {
      const userId = 'user123';
      const suggestions = await mockAISuggestions(userId);
      setAiSuggestions(suggestions);
    } catch (error) {
      setAiError(error.message);
      console.error("Error fetching AI suggestions:", error);
    } finally {
      setAiLoading(false);
    }
  }, []);

  const toggleAiSuggestionsVisibility = () => {
    setShowAiSuggestions(prev => !prev);
  };

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} favorites={favorites} />
      <main className="main-content">
        {activeTab === 'products' && (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceFilter={priceFilter}
              onPriceFilterChange={setPriceFilter}
            />
            <section className="ai-suggestions">
              <div className="section-header">
                <h2 className="section-title">Gợi ý thông minh từ AI</h2>
                <div className="ai-controls">
                  <button onClick={fetchAISuggestions} className="ai-button" disabled={aiLoading}>
                    {aiLoading ? (
                      <svg className="loading-icon" viewBox="0 0 24 24">
                        <circle className="loading-circle" cx="12" cy="12" r="10"></circle>
                        <path className="loading-path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Gợi ý sản phẩm phù hợp'}
                  </button>
                  {aiSuggestions.length > 0 && (
                    <button onClick={toggleAiSuggestionsVisibility} className="toggle-ai-suggestions-button">
                      {showAiSuggestions ? 'Thu gọn ▲' : 'Mở rộng ▼'}
                    </button>
                  )}
                </div>
              </div>

              {aiError && <p className="error-message">{aiError}</p>}

              {showAiSuggestions && (
                <>
                  {aiLoading && (
                    <div className="loading-grid">
                      {[1, 2, 3, 4].map(i => <div key={i} className="loading-card"></div>)}
                    </div>
                  )}
                  {!aiLoading && aiSuggestions.length > 0 && (
                    <div className="suggestions-list">
                      <h3 className="suggestions-title">Sản phẩm gợi ý cho bạn:</h3>
                      <div className="product-grid">
                        {aiSuggestions.map(product => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onShowDetails={handleShowDetails}
                            onToggleFavorite={handleToggleFavorite}
                            isFavorite={favorites.some(fav => fav.id === product.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {!aiLoading && aiSuggestions.length === 0 && !aiError && (
                    <p className="no-products-message">Chưa có gợi ý AI nào. Hãy thử nhấn nút "Gợi ý sản phẩm phù hợp".</p>
                  )}
                </>
              )}
            </section>

            <section className="product-list">
              <h2 className="section-title">Tất cả khóa học & sản phẩm</h2>
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onShowDetails={handleShowDetails}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.some(fav => fav.id === product.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-products-message">Không tìm thấy sản phẩm nào phù hợp.</p>
              )}
            </section>
          </>
        )}
        {activeTab === 'history' && (
          <section className="view-history">
            <h2 className="section-title">Lịch sử xem gần đây</h2>
            {viewHistory.length > 0 ? (
              <div className="product-grid">
                {viewHistory.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onShowDetails={handleShowDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.some(fav => fav.id === product.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="no-products-message">Bạn chưa có lịch sử xem nào.</p>
            )}
          </section>
        )}
        {activeTab === 'favorites' && (
          <section className="favorites">
            <h2 className="section-title">Sản phẩm yêu thích của bạn</h2>
            {favorites.length > 0 ? (
              <div className="product-grid">
                {favorites.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onShowDetails={handleShowDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <p className="no-products-message">Bạn chưa có sản phẩm yêu thích nào.</p>
            )}
          </section>
        )}
        {activeTab === 'chatbot' && <Chatbot products={products} />}
      </main>

      <ProductDetailModal product={selectedProduct} onClose={handleCloseDetails} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Footer />
    </div>
  );
}

export default App;