import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="personal-info">
          <p>Người thực hiện: Ngô Quốc Cường</p>
          <p>Email: ngoquoccuongfml1@gmail.com</p>
          <p>
            GitHub: 
            <a href="https://github.com/quoccuongjk" target="_blank" rel="noopener noreferrer">
              https://github.com/quoccuongjk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;