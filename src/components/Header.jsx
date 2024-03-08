import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import React, { useState } from 'react';

export const Header = () => {
  const { user } = useAuth();
  const [showMenuMob, setShowMenuMob] = useState(false);

  const handleClickMenu = () => {
    setShowMenuMob(!showMenuMob);
  };
  return (
    <>
      <div id="header-container">
        <div className="nav-fixed">
          <Link to={user ? '/dashboard' : '/'}>
            <img
              className="header-logo"
              src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709122389/APP/logo_v7d6ui.png"
              alt="logo"
            />
          </Link>
          <i className="fa fa-bars" onClick={handleClickMenu}></i>
          {/* <div className="hamburguer-menu-container">
        <i class="fa fa-bars"></i>
      </div> */}
          {!user && (
            <nav className="header-login">
              <NavLink to="/register">
                <div className="header-nav__item">REGISTER</div>
              </NavLink>
              <NavLink to="/login">
                <div className="header-nav__item">LOGIN</div>
              </NavLink>
            </nav>
          )}
          {user && (
            <nav className="header-login">
              {/* <NavLink to="/dashboard" >
          <div>DASHBOARD</div>
        </NavLink> */}
              <NavLink to="/login">
                <div>LOGOUT</div>
              </NavLink>
              <NavLink to="/profile">
                <img className="profileCircle" src={user.image} alt={user.user} />
              </NavLink>
            </nav>
          )}
        </div>
        <nav className={showMenuMob ? 'nav-mobile' : 'nav-mobile hidden'}>
          {!user && (
            <>
              <NavLink to="/register">
                <div className="header-nav__item--mobile" onClick={handleClickMenu}>
                  REGISTER
                </div>
              </NavLink>
              <NavLink to="/login">
                <div className="header-nav__item--mobile" onClick={handleClickMenu}>
                  LOGIN
                </div>
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/profile">
                <div className="header-nav__item--mobile" onClick={handleClickMenu}>
                  PROFILE
                </div>
              </NavLink>
              <NavLink to="/login">
                <div className="header-nav__item--mobile" onClick={handleClickMenu}>
                  LOGOUT
                </div>
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </>
  );
};
