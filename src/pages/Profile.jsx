import React, { useEffect, useState } from 'react';

import './Profile.css';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { deleteService } from '../services/service.service';
import { FigureUser } from '../components';
import { getById } from '../services/user.service';
import { useAuth } from '../context/authContext';
import { deleteStatement } from '../services/Statement.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { deleteEvents } from '../services/Events.service';

export const Profile = () => {
  const [btnClicked, setBtnClicked] = useState(null);
  const [users, setUser] = useState(null);
  const [okDelete, setOkDelete] = useState(null);

  const navigate = useNavigate();

  //! PARA CONSEGUIR LOS DATOS
  const { user } = useAuth();

  const { id } = useParams();

  const getByIdUser = async (id) => {
    setUser(null);
    const resUser = await getById(id);
    const users = resUser.data;

    setUser(users);
  };

  useEffect(() => {
    getByIdUser(id);
  }, [okDelete]);

  //! LOS BOTONES PARA VER EL CONTENIDO

  const handleClickBtnProfile = async (option) => {
    switch (option) {
      case 'ofredServ':
        setBtnClicked('Servicios Ofrecidos');
        break;
      case 'demanServ':
        setBtnClicked('Servicios Demandados');
        break;
      case 'statem':
        setBtnClicked('Mis Comunicados');
        break;
      case 'event':
        setBtnClicked('Mis Eventos');
        break;
      case 'favs':
        setBtnClicked('Mis Favoritos');
        break;
    }
  };

  //! PARA GESTION DE UPDATE
  const handleClickUpdateServOff = async (service) => {
    navigate(`/update/offserv/${service._id}`);
  };
  const handleClickUpdateServDem = async (service) => {
    navigate(`/update/demserv/${service._id}`);
  };

  const handleClickUpdateStat = async (statement) => {
    navigate(`/update/statement/${statement._id}`);
  };
  const handleClickUpdateEvent = async (event) => {
    navigate(`/update/event/${event._id}`);
  };

  //! PARA DELETE DE "MIS" :

  const handleDeleteClick = (id, type) => {
    setOkDelete(id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then(async (result) => {
      if (result.isConfirmed) {
        type == 'service' && (await deleteService(id));
        type == 'statement' && (await deleteStatement(id));
        type == 'event' && (await deleteEvents(id));

        setOkDelete(null);
      }
    });
  };

  return (
    <div id="profile-container">
      <Outlet />
      <div className="profile__right">
        <section className="profile_info_card">
          <FigureUser user={user} idRol={users} />
        </section>
      </div>
      <div className="profile__left">
        <section className="profile__buttons">
          <button
            className="servicios-ofrecidos--btn profile__button"
            onClick={() => handleClickBtnProfile('ofredServ')}
          >
            Mis Servicios Ofrecidos
          </button>
          <button
            className="servicios-demandados--btn profile__button"
            onClick={() => handleClickBtnProfile('demanServ')}
          >
            Mis Servicios Demandados
          </button>
          <button
            className="comunicados--btn profile__button"
            onClick={() => handleClickBtnProfile('statem')}
          >
            Mis Comunicados
          </button>
          <button
            className="comunicados--btn profile__button"
            onClick={() => handleClickBtnProfile('event')}
          >
            Mis Eventos
          </button>
          <button
            className="favoritos--btn profile__button"
            onClick={() => handleClickBtnProfile('favs')}
          >
            Favoritos
          </button>
          <button
            className="chats--btn profile__button"
            onClick={() => navigate('/chat')}
          >
            Chats
          </button>
        </section>
        <section className="my_content" key={''}>
          {btnClicked == 'Servicios Ofrecidos' &&
            users?.servicesOffered?.map((service) => (
              <div key={service._id} className="dashboard__card">
                <div className="card__header">
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card__body">
                  <h4>{service.title}</h4>

                  <div className="update_delete_buttons">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleDeleteClick(service._id, 'service')}
                    >
                      delete
                    </span>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleClickUpdateServOff(service)}
                    >
                      edit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {btnClicked == 'Servicios Demandados' &&
            users?.servicesDemanded?.map((service) => (
              <div key={service._id} className="dashboard__card">
                <div className="card__header">
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card__body">
                  <h4>{service.title}</h4>

                  <div className="update_delete_buttons">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleDeleteClick(service._id, 'service')}
                    >
                      delete
                    </span>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleClickUpdateServDem(service)}
                    >
                      edit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {btnClicked == 'Mis Comunicados' &&
            users?.statements?.map((statement) => (
              <div key={statement._id} className="dashboard__card">
                <div className="card__header">
                  <img
                    src={statement?.images[0]}
                    alt={statement.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card__body">
                  <h4>{statement.title}</h4>

                  <div className="update_delete_buttons">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleDeleteClick(statement._id, 'statement')}
                    >
                      delete
                    </span>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleClickUpdateStat(statement)}
                    >
                      edit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {btnClicked === 'Mis Favoritos' && (
            <>
              {users?.eventsFav?.map((event) => (
                <div key={event._id} className="dashboard__card">
                  <div className="card__header">
                    <img
                      src={event.images}
                      alt={event.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="card__body">
                    <h4>{event.title}</h4>
                    <div className="like-button liked">
                      <Link to={`/event/${event._id}`}>
                        <span className="heart-icon">&#x2665;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {users?.statementsFav?.map((statement) => (
                <div key={statement._id} className="dashboard__card">
                  <div className="card__header">
                    <img
                      src={statement.images[0]}
                      alt={statement.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="card__body">
                    <h4>{statement.title}</h4>
                    <div className="like-button liked">
                      <Link to={`/statement/${statement._id}`}>
                        <span className="heart-icon">&#x2665;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {btnClicked == 'Mis Eventos' &&
            users?.events?.map((event) => (
              <div key={event._id} className="dashboard__card">
                <div className="card__header">
                  <img
                    src={event?.images[0]}
                    alt={event.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card__body">
                  <h4>{event.title}</h4>

                  <div className="update_delete_buttons">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleDeleteClick(event._id, 'event')}
                    >
                      delete
                    </span>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleClickUpdateEvent(event)}
                    >
                      edit
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};
