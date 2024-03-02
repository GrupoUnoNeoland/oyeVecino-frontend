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
  const [rol, setRol] = useState("vecino")
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
    if(rol == "vecino") {
      setRol("vecino")
    } else {
      setRol("comercio")
    }
  }

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
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="roles_options"><p className={rol == "vecino" ? "clicked" : ""} onClick={()=>handleRoleClick("vecino")}>Vecino</p><p  className={rol == "comercio" ? "clicked" : ""} onClick={()=>handleRoleClick("comercio")}>Comercio</p></div>
          <div className="user_container">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register('name', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              username
            </label>
          </div>
          <div className="password_container">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register('password', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
          </div>
          <div className="email_container">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register('email', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>
          </div>
          {rol == "comercio" && <div className="cif_container">
            <input className="input_user" type="text" name="cif" id="cif" {...register('cif')} maxLength="9" />
            <label htmlFor="cif" className="label-cif">
              CIF
            </label>
          </div>}
          
          <div className="adress_container">
            <input className="input_user" 
              type="text"
              name="adress"
              id="adress"
              {...register('adress', { required: true })}
            />
            <label htmlFor="adress" className="label-adress">
              Dirección
            </label>
          </div>
          {rol == "vecino" && <div className="gender-age-container">
          <div className="genders_container">
            <select id="genero" name="gender" {...register('gender', { required: true })}>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div className="age_container">            
          <label htmlFor="age" className="label-age">
              Edad
            </label>
            <input className="input_age" type="text" name="age" id="age" {...register('age')} />
          </div>
          </div>}
          
          <div className="description_container">
            <input className="input_user"
              type="text"
              name="description"
              id="description"
              {...register('description')}
            />
            <label htmlFor="description" className="label-description">
              Descripción
            </label>
          </div>
          <div className="telephone_container">
            <input
             className="input_user"
              type="text"
              name="telephone"
              id="telephone"
              {...register('telephone')}
            />
            <label htmlFor="telephone" className="label-telephone">
              Teléfono
            </label>
          </div>
          <Uploadfile />

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
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{' '}
              <Link className="anchorCustom">Terms & Conditions</Link> and{' '}
              <Link className="anchorCustom">Privacy Policy</Link>.
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};
