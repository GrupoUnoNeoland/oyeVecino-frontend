import React, { useEffect, useState } from 'react';
import './FigureUser.css';
import { deleteUser } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const FigureUser = ({ idRol }) => {
  const [okDelete, setOkDelete] = useState(false);
  const [res, setRes] = useState(null);
  const { id } = useParams();
  const { logout } = useAuth();

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

  useEffect(() => {
    if (okDelete) {
      logout();
    }
  }, [okDelete, logout]);

  return (
    <>
      <figure className="dataProfile">
        <img src={idRol?.image} alt="user logo" className="imageUser" />
        <h3 className="user_name"> Nombre: {idRol?.name}</h3>
        <h4 className="user_points">Valoraciones: {idRol?.points}</h4>
        <h4 className="user_email">Email: {idRol?.email}</h4>
        <h4 className="user_city">City: {idRol?.city[0]?.name}</h4>
        <h4 className="user_description">Descripción: {idRol?.description}</h4>
      </figure>
      <div className="options_container">
        <Link to={`/profile/${id}/changePassword`}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3043/3043717.png"
            alt="ChangePassword"
            className="iconNav_changePass"
          />
        </Link>
        <Link to={`/profile/${id}/update`}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3800/3800840.png"
            alt="Change Profile"
            className="iconNav_ChangeProfile"
          />
        </Link>

        <span className="material-symbols-outlined" onClick={() => handleDeleteClick()}>
          person_remove
        </span>
      </div>
    </>
  );
};
