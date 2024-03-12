import './UpdateProfile.css';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { FigureUser, Uploadfile } from '../components';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { getById, updateUser } from '../services/user.service';
import { useParams } from 'react-router-dom';

import { useUpdateError } from '../hooks';

export const UpdateProfile = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [users, setUser] = useState(null);
  const [byId, setById] = useState(null);
  const { id } = useParams();
  const { logout } = useAuth();

  let defaultData = {
    name: users?.name,
    adress: users?.adress,
    description: users?.description,
    telephone: users?.telephone,
  };

  const getByIdUser = async (id) => {
    setUser(null);
    const resUser = await getById(id);
    setById(resUser);
    if (resUser?.status == 200) {
      const users = resUser.data;
      setUser(users);
      defaultData = {
        name: users?.name,
        adress: users?.adress,
        description: users?.description,
        telephone: users?.telephone,
      };
    }
  };
  useEffect(() => {
    getByIdUser(id);
  }, []);
  useEffect(() => {
    //getByIdUser(id);
    console.log(byId);
  }, [byId]);

  const formSubmit = (formData) => {
    Swal.fire({
      title: '¿Estás seguro de los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(73, 193, 162)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById('file-upload').files;

        if (inputFile.length != 0) {
          const custonFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await updateUser(custonFormData));
          setSend(false);
        } else {
          const custonFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await updateUser(custonFormData));
          setSend(false);
        }
      }
    });
  };

  useEffect(() => {
    //console.log(res);
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <div className="form-wrap">
        <h1>Change your data profile ♻</h1>
        <p>Please, enter your new data profile</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              defaultValue={defaultData?.name}
              {...register('name')}
            />
            {console.log(defaultData)}

            <label htmlFor="custom-input" className="custom-placeholder">
              Username
            </label>
            <input
              className="input_user"
              type="text"
              id="adress"
              name="adress"
              autoComplete="false"
              defaultValue={defaultData?.adress}
              {...register('adress')}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Adress
            </label>
            <input
              className="input_user"
              type="text"
              id="description"
              name="description"
              autoComplete="false"
              defaultValue={defaultData?.description}
              {...register('description')}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Description
            </label>
            <select id="genero" name="gender" {...register('gender', { required: true })}>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="otros">Otros</option>
            </select>
            <input
              className="input_user"
              type="text"
              name="telephone"
              id="telephone"
              defaultValue={defaultData?.telephone}
              {...register('telephone')}
            />
            <label htmlFor="telephone" className="label-telephone">
              Teléfono
            </label>
          </div>
          <Uploadfile registerForm={register} type="image" />
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              CHANGE DATA PROFILE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
