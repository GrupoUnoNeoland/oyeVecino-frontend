import './Dashboard.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      <div id="dashboard-container">
        <h1>
          Bienvenidxs a <span>OYEVECINO!</span>
        </h1>
        <div>
          <img
            className="backpicture"
            src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709593054/APP/tony-lee-8IKf54pc3qk-unsplash_zwcr7i.jpg"
            alt="neigbhorhood"
          />
        </div>

        <div className="web-sections">
          <Link to="/serviceOffered">
            {' '}
            {/*mirar ruta*/}
            <div className="box-service-offered">
              <h2>SERVICIOS OFRECIDOS</h2>
              <p>
                Bienvenido a nuestro querido vecindario, donde la comunidad se une para
                ofrecerte servicios excepcionales que harán tu vida más cómoda y
                agradable. En nuestra vibrante sección de servicios, encontrarás una
                variedad de opciones pensadas especialmente para ti.
              </p>
            </div>
          </Link>
          <Link to="/serviceDemanded">
            <div className="box-service-demanded">
              <h2>SERVICIOS DEMANDADOS</h2>
              <p>
                Vecinos, ¿alguna vez has deseado servicios que se adapten perfectamente a
                tus necesidades y estén a solo unos pasos de distancia? Pide lo que
                necesitas.
              </p>
            </div>
          </Link>
          <Link to="/events">
            <div className="box-events">
              <h2>EVENTOS</h2>
              <p>
                ¿Te has preguntado qué está sucediendo en nuestra comunidad? ¡Aquí te
                contamos! Desde divertidas ferias de vecindario hasta eventos culturales y
                actividades familiares, nuestro barrio es el epicentro de la diversión.
              </p>
            </div>
          </Link>
          <Link to="/statements">
            <div className="box-statements">
              <h2>COMUNICADOS</h2>
              <p>
                Bienvenidos a nuestra nueva sección de Comunicados, el lugar donde la voz
                de nuestro barrio cobra vida. Aquí, cada uno de ustedes tiene la
                oportunidad de compartir noticias, anuncios emocionantes y hasta esos
                pequeños detalles que hacen que nuestra comunidad sea tan especial.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
