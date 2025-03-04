import React from 'react';
import logo from '../assets/images/logo-banner.png'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <Link to="/">
          <img src={logo} alt="" />
          Mnt
        </Link>
      </div>

      <div className="navBar__actions">
        {/* Example icons or buttons can go here */}
        <a className="navBar__logout" href='/login'  >Déconnexion</a>
      </div>
    </nav>
  );
};

export default NavBar;
