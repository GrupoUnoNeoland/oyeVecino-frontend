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
        <div className="form-title-container">
          <h1>Cambiar la informacion personal</h1>
          <p>Por favor, introduzca su datos actualizados.</p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              Username
            </label>
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              defaultValue={defaultData?.name}
              {...register('name')}
            />
          </div>

          <div className="info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              Adress
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
          </div>

          <div className="description_container info_container">
            <label htmlFor="description" className="label-description">
              Descripción
            </label>
            <textarea
              className="input_user_textArea"
              name="description"
              id="description"
              rows="7"
              cols="28"
              defaultValue={defaultData?.description}
              {...register('description')}
            />
          </div>
          <div className="telephone_container info_container">
            <label htmlFor="telephone" className="label-telephone">
              Teléfono
            </label>
            <input
              className="input_user"
              type="text"
              name="telephone"
              id="telephone"
              defaultValue={defaultData.telephone}
              {...register('telephone')}
            />
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
