import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

import React from 'react';

export const Footer = () => {
  const location = useLocation();
  const page = location.pathname;
  console.log(page);

  return (
    <div id="footer-container">
      <section className="fourth-section">
        {page == '/' && (
          <>
            <h2>
              Beneficios de <span>OYE VECINO</span>
            </h2>
            <p>
              "OYE VECINO" es más que una red social; es la llave para construir un barrio
              vibrante y solidario.
            </p>
            <p>
              Únete a nosotros y descubre las innumerables formas en que tu participación
              puede marcar la diferencia en el lugar que llamas hogar.
            </p>
            <p>¡Conéctate, comparte y fortalece tu vecindario hoy!</p>
          </>
        )}
      </section>

      <footer>
        <div className="block_one">
          <h4>
            <Link to="/login">TU CUENTA</Link>
          </h4>
          <ul>
            <li>Acerca de</li>
            <li>Cerrar sesión</li>
            <li>Ayuda</li>
            <li>FAQS</li>
            <li>Regístrate</li>
          </ul>
        </div>
        <div className="block_two">
          <h4>
            <Link to="/dashboard">DESCUBRIR</Link>
          </h4>
          <ul>
            <li>Servicios ofertados</li>
            <li>Servicios demandados</li>
            <li>Eventos</li>
            <li>Comunicados</li>
          </ul>
        </div>
        <div className="redes">
          <h4>SÍGUENOS</h4>
          <img
            className="facebook_icon"
            src="https://res.cloudinary.com/dqiveomlb/image/upload/v1710282137/APP/Icons/facebook_fubyqf.png"
            alt="facebook logo"
          />
          <img
            className="instagram_icon"
            src="https://res.cloudinary.com/dqiveomlb/image/upload/v1710282240/APP/Icons/instagram_bqc0eu.png"
            alt="instagram logo"
          />
          <img
            className="linkedin_icon"
            src="https://res.cloudinary.com/dqiveomlb/image/upload/v1710282304/APP/Icons/linkedin_atpaue.png"
            alt="linkedin logo"
          />
        </div>
        <div className="condiciones">
          <ul>
            <li>© 2024 oyeVecino</li>
            <li>Condiciones del servicio</li>
            <li>Política de privacidad</li>
            <li>Ajustes de cookies</li>
            <li>Política de cookies</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
