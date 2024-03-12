import React, { useEffect, useState } from 'react';
import './FigureUser.css';
import { deleteUser } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useDeleteUserError } from '../hooks';

export const FigureUser = ({ idRol }) => {
  const [okDelete, setOkDelete] = useState(false);
  const [res, setRes] = useState(null);
  const { id } = useParams();
  const { logout } = useAuth();

  useEffect(() => {
    if (res != null) {
      useDeleteUserError(res, setOkDelete, setRes);
    }
  }, [res]);

  useEffect(() => {
    if (okDelete) {
      logout();
    }
  }, [okDelete, logout]);
  const handleDeleteClick = async () => {
    setOkDelete(false);
    setRes(await deleteUser(idRol._id));
  };

  return (
    <>
      <figure className="dataProfile">
        <img src={idRol?.image} alt="user logo" className="imageUser" />
        <h3 className="user_name">{idRol?.name}</h3>
        <h4 className="user_points">Valoraciones: {idRol?.points}</h4>
        <h4 className="user_email">Email: {idRol?.email}</h4>
        <h4 className="user_city">City: {idRol?.city}</h4>
        <h4 className="user_description">{idRol?.description}</h4>
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
