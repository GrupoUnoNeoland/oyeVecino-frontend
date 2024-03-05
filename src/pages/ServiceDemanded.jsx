import React, { useEffect, useState } from 'react';
import './ServiceDemanded.css';
import { useAuth } from '../context/authContext';
import { getAllServices } from '../services/service.service';
import { getAllUser } from '../services/user.service';

export const ServiceDemanded = () => {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  const getServices = async () => {
    const resService = await getAllServices();
    const services = resService.data;
    setServices(services);
    console.log('services', services);
  };

  const getUsers = async () => {
    const resUser = await getAllUser();
    const users = resUser.data;
    setUsers(users);
    console.log('usuarios', users);
  };

  useEffect(() => {
    getServices();
    getUsers();
  }, []);

  return (
    <>
      {services?.map((service) => (
        <div className="services_container" key={service?._id}>
          <p>TITULO DEL SERVICIO: {service.title}</p>
          <p>USUARIO: {service.provider[0].name}</p>
          <p>FOTO USUARIO DEBAJO:</p>
          {users?.find((user) => user._id === service.provider[0]._id) && (
            <div className="users_container">
              <img
                src={users.find((user) => user._id === service.provider[0]._id).image}
                alt={service.provider[0].name}
              />
            </div>
          )}

          <p>DESCRIPCIÓN: {service.description}</p>
          <img src={service.images[0]} alt={service.name} />
        </div>
      ))}
      <div></div>
    </>
  );
};
