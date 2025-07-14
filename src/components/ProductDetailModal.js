import React from 'react';
import '../styles/ProductDetailModal.css'; // Import CSS file

// Component con để hiển thị sao (giữ nguyên)
const StarRating = ({ rating }) => {
  const numericRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;
  const totalStars = 5;
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="star-icon filled" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.864 1.48-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="star-icon half-filled" viewBox="0 0 24 24" fill="currentColor">
          <defs>
            <linearGradient id={`half-gradient-${Math.random().toString(36).substr(2, 9)}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style={{stopColor: 'currentColor'}} />
              <stop offset="50%" style={{stopColor: 'transparent'}} />
            </linearGradient>
          </defs>
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.864 1.48-8.279-6.064-5.828 8.332-1.151z" fill={`url(#half-gradient-${Math.random().toString(36).substr(2, 9)})`}/>
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="star-icon empty" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.864 1.48-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      ))}
    </div>
  );
};

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Đóng"
        >
          <svg className="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="modal-body-wrapper">
          {/* Phần trên: Ảnh và Khối thông tin chính */}
          <div className="modal-top-section">
            <div className="modal-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="modal-image"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x450/CCCCCC/000000?text=Image+Not+Found`; }}
              />
            </div>
            <div className="modal-info-content"> {/* Khối chứa Tiêu đề, Giá, Đánh giá, Button */}
              <h2 className="modal-title">{product.name}</h2>
              <p className="modal-price">{product.price.toLocaleString('vi-VN')} VNĐ</p>

              {typeof product.reviews === 'number' && !isNaN(product.reviews) && product.reviews >= 0 && (
                // Đánh giá và số lượng đánh giá nằm trên 1 hàng
                <div className="modal-reviews">
                  <span className="reviews-label">Đánh giá:</span>
                  <StarRating rating={product.reviews} />
                  {product.numReviews !== undefined && typeof product.numReviews === 'number' && (
                    <span className="reviews-value">({product.numReviews} đánh giá)</span>
                  )}
                </div>
              )}

              {/* Nút đăng ký nằm dưới đánh giá và căn phải */}
              <div className="register-button-wrapper"> {/* Thêm wrapper để căn phải nút */}
                <button
                  className="register-button"
                  onClick={() => alert('Đăng ký ngay khóa học!')}
                >
                  Đăng ký ngay
                </button>
              </div>

            </div>
          </div>
          {/* Phần dưới: Mô tả */}
          <p className="modal-description">{product.longDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;