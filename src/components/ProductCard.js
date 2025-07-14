import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onShowDetails, onToggleFavorite, isFavorite }) => {
  return (
    <div className="product-card">
      <div className="card">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = `https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found`; 
          }}
          onClick={() => onShowDetails(product)} 
        />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.shortDescription}</p>
          <div className="item-price">
            <span className="price">{product.price.toLocaleString('vi-VN')} VNĐ</span>
            <button
              onClick={() => onToggleFavorite(product)}
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          <button
            onClick={() => onShowDetails(product)}
            className="detail-button"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;