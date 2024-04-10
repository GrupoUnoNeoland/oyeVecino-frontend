import React, { useEffect, useState } from 'react';
import './FigureUser.css';
import { deleteUser } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const FigureUser = ({ idRol }) => {
  return (
    <>
      <figure className="dataProfile">
        {console.log(idRol)}

        <img src={idRol?.image} alt="user logo" className="imageUser" />
        <div className="info_user_data">
          <h3 className="user_name">
            {' '}
            Nombre:<span> {idRol?.name}</span>
          </h3>
          {/* <h4 className="user_points">Valoraciones: {idRol?.points}</h4> -----> hauy que sacar la media */}
          <h4 className="user_email">
            Email:<span> {idRol?.email}</span>
          </h4>
          {/* <h4 className="user_city">City: {idRol?.city[0]?.name}</h4> */}
          <h4 className="user_description">
            Descripción:<span> {idRol?.description}</span>
          </h4>
        </div>
      </figure>
    </>
  );
};
