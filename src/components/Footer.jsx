import { useLocation } from 'react-router-dom';
import './Footer.css';

import React from 'react';

export const Footer = () => {
  const location = useLocation();
  const page = location.pathname
  console.log(page) 
  return (
    <div id="footer-container">
      <section className="fourth-section">
        {page == "/" && <><h2>Beneficios de <span>OYE VECINO</span></h2>
        <p>
          "OYE VECINO" es más que una red social; es la llave para construir un barrio
          vibrante y solidario.
        </p>
        <p>
          Únete a nosotros y descubre las innumerables formas en que tu participación
          puede marcar la diferencia en el lugar que llamas hogar.
        </p>
        <p>¡Conéctate, comparte y fortalece tu vecindario hoy!</p></>}
      </section>
      <footer>Footer</footer>
    </div>
  );
};
