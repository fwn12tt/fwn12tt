import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './style.css'

export default function Footer() {
  return (
    <footer className='footer-section'>
     <div className="container">
        <div className="content-footer flex-box">
          <div className="site-logo site-logo-desktop">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className='make-by'>
           <h3>Fwn12tt © 2023. Made with ☕ by Ngoon24tt</h3>
          </div>
        </div>
      </div>
    </footer>
  )
}
