import './Header.css';

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';


export const Header = () => {
  const {user} = useAuth()
  return (
    <div id="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709122389/APP/logo_v7d6ui.png"
          alt="logo"
        />
      </Link>
      {!user && <nav className="header-login">
        <NavLink to="/register">
          <div>REGISTER</div>
        </NavLink>
        <NavLink to="/login">
          <div>LOGIN</div>
        </NavLink>
      </nav>}
      {user && <nav className="header-login">
      {/* <NavLink to="/dashboard" >
          <div>DASHBOARD</div>
        </NavLink> */}
        <NavLink to="/login" >
          <div>LOGOUT</div>
        </NavLink>
        <NavLink to="/profile">
          <img className="profileCircle" src={user.image} alt={user.user}/>
        </NavLink>
      </nav>}
    </div>
  );
};
