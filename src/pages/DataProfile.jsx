import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { deleteService } from '../services/service.service';
import { getById } from '../services/user.service';
import { useAuth } from '../context/authContext';
import { FigureUser } from '../components';

export const DataProfile = () => {
  const [users, setUser] = useState(null);
  const [okDelete, setOkDelete] = useState(null);

  const navigate = useNavigate();

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

  //! PARA CONSEGUIR LOS DATOS
  const { user } = useAuth();
  return (
    <div>
      {' '}
      <section className="profile_info_card">
        <FigureUser user={user} idRol={users} />
      </section>
    </div>
  );
};
