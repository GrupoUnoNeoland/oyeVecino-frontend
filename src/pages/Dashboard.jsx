import './Dashboard.css';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllServices } from '../services/service.service';
import { getAllStatements } from '../services/Statement.service';
import { getAllEvents } from '../services/Events.service';
import { useEffect } from 'react';

export const Dashboard = () => {
  const [content, setContent] = useState(null);
  const [btnClicked, setBtnClicked] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dashboardType = queryParams.get('type');

  const getAllServ = async (type) => {
    setContent(null);
    const resServ = await getAllServices(type);
    const services = resServ.data;
    setContent({ item: 'service', data: services });
  };

  const getAllStat = async () => {
    setContent(null);
    const resStat = await getAllStatements();
    const statements = resStat.data;
    setContent({ item: 'statment', data: statements });
  };

  const getAllEven = async () => {
    setContent(null);
    const resEven = await getAllEvents();
    const events = resEven.data;
    setContent({ item: 'event', data: events });
  };

  const handleClickBtnDashboard = async (option) => {
    switch (option) {
      case 'ofredServ':
        await getAllServ('offered');
        setBtnClicked('Servicios Ofrecidos');
        break;
      case 'demanServ':
        await getAllServ('demanded');
        setBtnClicked('Servicios Demandados');
        break;
      case 'statem':
        await getAllStat();
        setBtnClicked('Comunicados');
        break;
      case 'event':
        await getAllEven();
        setBtnClicked('Eventos');
        break;
    }
  };

  useEffect(() => {
    getAllServ('offered');
    setBtnClicked('Servicios Ofrecidos');
  }, []);
  const handleClickBtnCreate = async (option) => {
    switch (option) {
      case 'Servicios Ofrecidos':
        navigate('/create/service/offered');
        break;
      case 'Servicios Demandados':
        navigate('/create/service/demanded');
        break;
      case 'Comunicados':
        navigate('/create/statement');
        break;
      case 'Eventos':
        navigate('/create/event');
        break;
    }
  };

  useEffect(() => {
    if (dashboardType) {
      handleClickBtnDashboard(dashboardType);
    }
  }, []);

  return (
    <div id="dashboard-container">
      <section className="dashboard__buttons">
        <button
          className="servicios-ofrecidos--btn dashboard__button"
          onClick={() => handleClickBtnDashboard('ofredServ')}
        >
          Servicios Ofrecidos
        </button>
        <button
          className="servicios-demandados--btn dashboard__button"
          onClick={() => handleClickBtnDashboard('demanServ')}
        >
          Servicios Demandados
        </button>
        <button
          className="comunicados--btn dashboard__button"
          onClick={() => handleClickBtnDashboard('statem')}
        >
          Comunicados
        </button>
        <button
          className="eventos--btn dashboard__button"
          onClick={() => handleClickBtnDashboard('event')}
        >
          Eventos
        </button>
      </section>
      <h2 className="dashboard__content-title">{btnClicked}</h2>
      <button onClick={() => handleClickBtnCreate(btnClicked)}>Crear {btnClicked}</button>
      <section className="dashboard__content">
        {content != null &&
          content.item == 'service' &&
          content?.data?.map((item) => (
            <div key={item._id} className="dashboard__card">
              <div className="card__header">
                <img src={item.images[0]} alt={item.title} referrerPolicy="no-referrer" />
              </div>
              <div className="card__body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <Link to={`/service/${item._id}`}>
                  <p className="card__body-detail">Ver más...</p>
                </Link>
              </div>
            </div>
          ))}
        {content != null &&
          content.item == 'statment' &&
          content?.data?.map((item) => (
            <div key={item._id} className="dashboard__card">
              <div className="card__header">
                <img src={item.images[0]} alt={item.title} referrerPolicy="no-referrer" />
              </div>
              <div className="card__body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <Link to={`/statement/${item._id}`}>
                  <p className="card__body-detail">Ver más...</p>
                </Link>
              </div>
            </div>
          ))}
        {content != null &&
          content.item == 'event' &&
          content?.data?.map((item) => (
            <div key={item._id} className="dashboard__card">
              <div className="card__header">
                <img src={item.images[0]} alt={item.name} referrerPolicy="no-referrer" />
              </div>
              <div className="card__body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <Link to={`/event/${item._id}`}>
                  <p className="card__body-detail">Ver más...</p>
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};
