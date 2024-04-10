import React, { useEffect, useState } from 'react';

import './Profile.css';
import { Link, Outlet, useNavigate, Navigate, useParams } from 'react-router-dom';
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
  const [changeRender, setChangeRender] = useState(false);
  const { logout } = useAuth();

  const navigate = useNavigate();

  //! PARA CONSEGUIR LOS DATOS
  const { user } = useAuth();

  const { id } = useParams();

  const getByIdUser = async (id) => {
    console.log(id);
    setUser(null);
    const resUser = await getById(id);
    const users = resUser.data;

    setUser(users);
  };

  useEffect(() => {
    getByIdUser(id);
  }, []);

  useEffect(() => {
    if (okDelete) {
      logout();
    }
  }, [okDelete, logout]);

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

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: 'Estás seguro de borrar tu perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(73, 193, 162)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
    });

    if (result.isConfirmed) {
      const res = await deleteUser(idRol._id);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario borrado',
          text: 'Esperamos verte pronto de nuevo !',
          showConfirmButton: false,
          timer: 1500,
        });
        setOkDelete(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo borrar el usuario ❎',
          text: 'Por favor, inténtalo de nuevo más tarde',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Operación cancelada',
        text: 'Tu perfil no ha sido eliminado !',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div id="profile-container">
      <div className="nav__profile">
        <nav className="profile__buttons">
          <div className="profile__buttons__primary">
            <select
              id="genero"
              name="gender"
              onChange={(e) => {
                console.log('valor seleect', e.target.value);
                if (e.target.value === 'chat') {
                  console.log('entro');
                  navigate('/chat');
                } else {
                  setChangeRender(true);

                  handleClickBtnProfile(e.target.value);
                }
              }}
            >
              <option value="info">TU INFORMACION PERSONAL</option>
              <option value="ofredServ">Mis Servicios Ofrecidos</option>
              <option value="demanServ"> Mis Servicios Demandados</option>
              <option value="statem">Mis Comunicados</option>
              <option value="event">Mis Eventos</option>
              <option value="favs">Favoritos</option>
              <option value="chat">Chat</option>
            </select>
          </div>
          <div className="profile__buttons__second">
            <Link
              to={`/profile/${id}`}
              onClick={() => {
                setChangeRender(false);
              }}
            >
              <img
                src="https://cdn.discordapp.com/attachments/1194641528757440563/1217890227620937748/pergamino.png?ex=6605aba9&is=65f336a9&hm=cafe18918d97227ee6076e80a05f8700bdbc449c08caeeee4cedcff1721f59cd&"
                alt="infoProfile"
                id="infoProfile"
                className="iconNav_changePass"
              />
            </Link>
            <Link
              to={`/profile/${id}/changePassword`}
              onClick={() => {
                setChangeRender(false);
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3043/3043717.png"
                alt="ChangePassword"
                className="iconNav_changePass"
              />
            </Link>
            <Link to={`/profile/${id}/update`}>
              <img
                src="https://media.discordapp.net/attachments/1205874365154066453/1217903385596924044/image.png?ex=6605b7ea&is=65f342ea&hm=e64fadb8b943d57810bce43232322005e4d80fea811db5c4f292baf1505034a9&=&format=webp&quality=lossless&width=691&height=691"
                alt="Change Profile"
                className="iconNav_ChangeProfile"
                id="change__profile"
              />
            </Link>

            <div onClick={() => handleDeleteClick()} className="nav__img__delete">
              <img
                src="https://cdn.discordapp.com/attachments/1205874365154066453/1217900262635868171/borrar-usuario.png?ex=6605b502&is=65f34002&hm=6f57cf14a26f5e11bfd521351b9a1cec939b55b957ea1c138ae6299ee157ea96&"
                alt="deleteUser"
                id="deleteUser"
              />
            </div>
          </div>
        </nav>
      </div>
      <div className="tools__profile">
        {changeRender ? (
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
        ) : (
          <Outlet />
        )}
      </div>
      <div className="img_footer"></div>
    </div>
  );
};
