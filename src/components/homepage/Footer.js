import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <section className='footer-container'>
      <span className="background"></span>
      <span className="background-2"></span>
      <div class='content'>
        <div class='marsfooter'></div>
        <div class='social-icons'>
          <Link class='social-icon-link facebook' to='/'>
            <i class='fab fa-facebook-f' />
          </Link>
          <Link class='social-icon-link instagram' to='/'>
            <i class='fab fa-instagram' />
          </Link>
          <Link class='social-icon-link twitter' to='/'>
            <i class='fab fa-twitter' />
          </Link>
        </div>
      </div>
    </section>
  );
}

