import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
      <div className="footer-content">
        <p>© 2025 NovaChain. All rights reserved.</p>
        <p>Follow us on:</p>
        <ul className="social-media-links">
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
  )
}

export default Footer
