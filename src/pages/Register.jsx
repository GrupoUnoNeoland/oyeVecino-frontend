import './Register.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Uploadfile } from '../components/index';
import { useAuth } from '../context/authContext';
import { useRegisterError } from '../hooks';
import { registerUser } from '../services/user.service';

export const Register = () => {
  const { allUser, setAllUser, bridgeData, setDeleteUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);
  const [rol, setRol] = useState('vecino');
  const navigate = useNavigate();

  const formSubmit = async (formData) => {
    console.log('formData', formData);
    const inputFile = document.getElementById('file-upload').files;
    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await registerUser(customBody));
      setSend(false);
    } else {
      setSend(true);
      setRes(await registerUser(formData));
      setSend(false);
    }
  };

  const handleRoleClick = (rol) => {
    if (rol == 'vecino') {
      setRol('vecino');
    } else {
      setRol('comercio');
    }
  };

  useEffect(() => {
    console.log(res);
    useRegisterError(res, setOkRegister, setRes);
    if (res?.status == 200) bridgeData('ALLUSER');
  }, [res]);

  useEffect(() => {
    console.log('😍', allUser);
  }, [allUser]);

  useEffect(() => {
    setDeleteUser(() => false);
  }, []);

  if (okRegister) {
    return <Navigate to="/checkCode" />;
  }
  return (
    <div id="register-container">
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Registro</h1>
          <p>Es gratis y solo te toma un minuto.</p>
        </div>

        <h3>Paso 1 de 2</h3>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="roles_options">
            <p
              className={rol == 'vecino' ? 'clicked' : ''}
              onClick={() => handleRoleClick('vecino')}
            >
              Vecino
            </p>
            <p
              className={rol == 'comercio' ? 'clicked' : ''}
              onClick={() => handleRoleClick('comercio')}
            >
              Comercio
            </p>
          </div>
          <div className="form__midle">
            <div className="form__left">
              <div className="user_container info_container">
                <label htmlFor="custom-input" className="custom-placeholder">
                  Username
                </label>
                <input
                  className="input_user"
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="false"
                  required
                  {...register('name', { required: true })}
                />
              </div>
              <div className="email_container info_container">
                <label htmlFor="custom-input" className="custom-placeholder">
                  Email
                </label>
                <input
                  className="input_user"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="false"
                  required
                  {...register('email', { required: true })}
                />
              </div>
              <div className="password_container info_container">
                <label htmlFor="custom-input" className="custom-placeholder">
                  Password
                </label>
                <input
                  className="input_user"
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="false"
                  required
                  {...register('password', { required: true })}
                />
              </div>
              <div className="adress_container info_container">
                <label htmlFor="adress" className="label-adress">
                  Dirección
                </label>
                <input
                  className="input_user"
                  type="text"
                  name="adress"
                  id="adress"
                  required
                  {...register('adress', { required: true })}
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
                  required
                  {...register('telephone')}
                />
              </div>
              {rol == 'vecino' && (
                <div className="gender-age-container ">
                  <div className="genders_container">
                    <label htmlFor="gender" className="label-gender">
                      Genero
                    </label>
                    <select
                      id="genero"
                      name="gender"
                      {...register('gender', { required: true })}
                    >
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  <div className="age_container">
                    <label htmlFor="age" className="label-age">
                      Edad
                    </label>
                    <input
                      className="input_age"
                      type="text"
                      name="age"
                      id="age"
                      required
                      {...register('age')}
                    />
                  </div>
                </div>
              )}
              {rol == 'comercio' && (
                <div className="cif_container info_container">
                  <label htmlFor="cif" className="label-cif">
                    CIF
                  </label>
                  <input
                    className="input_user"
                    type="text"
                    name="cif"
                    id="cif"
                    required
                    {...register('cif')}
                    maxLength="9"
                  />
                </div>
              )}
            </div>
            <div className="form__right">
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
                  {...register('description')}
                />
              </div>

              <Uploadfile registerForm={register} type="image" />
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          ¿Ya estas registrado? <Link to="/login">Logueate aqui</Link>
        </p>
      </div>
    </div>
  );
};
