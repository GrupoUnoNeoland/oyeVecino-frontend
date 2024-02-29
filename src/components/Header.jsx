import './Header.css';

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div id="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709122389/APP/logo_v7d6ui.png"
          alt="logo"
        />
      </Link>
      <nav className="header-login">
        <NavLink to="/register">
          <div>REGISTER</div>
        </NavLink>
        <NavLink to="/login">
          <div>LOGIN</div>
        </NavLink>
      </nav>
    </div>
  );
};
