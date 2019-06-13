import React from 'react';
import { Link } from 'react-router-dom';
import wine_journal_logo from '../../images/wine_journal_logo.png';

const SiteLayout = ({ children }) => {
  return (
    <section className="bg-image">
      <Link to="/">
        <img src={wine_journal_logo} className="logo-img" alt="Wine Journal" />
      </Link>
      {children}
      <div className="white-overlay"></div>
    </section >
  )
}

export default SiteLayout;