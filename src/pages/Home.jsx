import './Home.css';

import React from 'react';

import { Footer } from '../components';

export const Home = () => {
  return (
    <>
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
                OYE VECINO es la plataforma digital que te conecta con la comunidad que te
                rodea de una manera única y atractiva. Esta red social exclusiva está
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
                  Organiza fiestas en la calle, ferias locales, encuentros comunitarios y
                  mucho más.
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
                  Encuentra profesionales locales garantizando una red de apoyo confiable.
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
          </div>
        </section>
        <section className="fourth-section">
          <h2>
            Beneficios de <span>OYE VECINO</span>
          </h2>
        </section>
      </div>
      <Footer />
    </>
  );
};
