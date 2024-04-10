import './Home.css';

import React from 'react';

import { Footer } from '../components';

export const Home = () => {
  return (
    <>
      <section className="">
        <div id="home-container">
          <section className="first-section">
            <div className="first-section__left">
              <div className="first-section__text-container">
                <img
                  className="first-section__image"
                  src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709120993/APP/chat_eniufn.png"
                  alt="chat"
                />
                <h1 className="first-section__title">
                  OYE <span>VECINO!</span>
                </h1>
                <h2 className="first-section__subtitle">
                  Bienvenido a tu Red Social del Vecindario
                </h2>
                <p>
                  OYE VECINO es la plataforma digital que te conecta con la comunidad que
                  te rodea de una manera única y atractiva. Esta red social exclusiva está
                  diseñada para fortalecer los lazos entre vecinos, proporcionando una
                  experiencia interactiva que va más allá de las fronteras físicas de las
                  casas.
                </p>
              </div>
            </div>
            <div className="first-section__right">
              <div className="first-section__mustard-square"></div>
              <img
                src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709115813/APP/vecinos_x7iilc.jpg"
                alt="vecinos"
              />
            </div>
          </section>
          <section className="second-section"></section>
          <section className="third-section">
            <div className="third-section__cards-container">
              <figure className="third-section__card">
                <div className="third-section__card-image third-section__card-image--first"></div>
                <div className="third-section__card-text">
                  <h3>Eventos</h3>
                  <p>
                    Comparte y descubre eventos emocionantes que suceden en tu vecindario.
                  </p>
                  <p>
                    Organiza fiestas en la calle, ferias locales, encuentros comunitarios
                    y mucho más.
                  </p>
                </div>
              </figure>
              <figure className="third-section__card">
                <div className="third-section__card-image third-section__card-image--second"></div>
                <div className="third-section__card-text">
                  <h3>Comunicados</h3>
                  <p>
                    Recibe y comparte comunicados importantes de la administración del
                    barrio, manteniendo a todos informados sobre cuestiones relevantes.
                  </p>
                </div>
              </figure>
              <figure className="third-section__card">
                <div className="third-section__card-image third-section__card-image--third"></div>
                <div className="third-section__card-text">
                  <h3>Servicios</h3>
                  <p>
                    Facilita la colaboración entre vecinos al ofrecer tus servicios o
                    solicitar ayuda.
                  </p>
                  <p>
                    Encuentra profesionales locales garantizando una red de apoyo
                    confiable.
                  </p>
                </div>
              </figure>
              <figure className="third-section__card">
                <div className="third-section__card-image third-section__card-image--fourth"></div>
                <div className="third-section__card-text">
                  <h3>Mensajes Directos</h3>
                  <p>
                    Comunícate directamente con otros vecinos para discutir eventos,
                    intercambiar información o coordinar servicios.
                  </p>
                </div>
              </figure>

              <figure className="third-section__card">
                <div className="third-section__card-image third-section__card-image--fifth"></div>
                <div className="third-section__card-text">
                  <h3>Puntos para Cambio</h3>
                  <p>
                    Puntos generados a partir de la valoración de los servicios prestados
                    para que puedan ser cambiados por descuentos en el comércio local.
                  </p>
                </div>
              </figure>
            </div>
          </section>
          {/* <section className="fourth-section">
          <h2>
            Beneficios de <span>OYE VECINO</span>
          </h2>
          <p>
            "OYE VECINO" es más que una red social; es la llave para construir un barrio
            vibrante y solidario.
          </p>
          <p>
            Únete a nosotros y descubre las innumerables formas en que tu participación
            puede marcar la diferencia en el lugar que llamas hogar.{' '}
          </p>
          <p>¡Conéctate, comparte y fortalece tu vecindario hoy!</p>
          <div className="fourth-section__cards-container">
            {/* <div className="fourth-section__card">
            <p className="card__title">Fortalecimiento de la Comunidad</p>
            <div className="card__line"></div>
            <p className="card__text">Estimula una comunidad más cohesionada, donde la colaboración y la amistad florecen.</p>
          </div>
          <div className="fourth-section__card">
            <p className="card__title">Fomentar la Economia Local</p>
            <div className="card__line"></div>
            <p className="card__text">Promueve el apoyo a la economía local al utilizar servicios ofrecidos por vecinos cercanos.</p>
          </div>
          <div className="fourth-section__card">
            <p className="card__title">Seguridad y Vigilancia Colaborativa</p>
            <div className="card__line"></div>
            <p className="card__text">Mantén la seguridad comunitaria a través de alertas y discusiones sobre temas de seguridad locales.</p>
          </div> 
          </div>
        </section> */}
        </div>
      </section>

      <Footer />
    </>
  );
};
