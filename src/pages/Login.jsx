import './Login.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { useLoginError } from '../hooks';
import { loginUser } from '../services/user.service';

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [loginOk, setLoginOk] = useState(false);
  const { login, setUser } = useAuth();

  const formSubmit = async (formData) => {
    console.log('FORMDATA', formData);
    setSend(true);
    setRes(await loginUser(formData));
    setSend(false);
  };

  useEffect(() => {
    console.log(res);
    useLoginError(res, setRes, login, setLoginOk);
  }, [res]);

  useEffect(() => {
    setUser(() => null);
    localStorage.removeItem('user');
  }, []);

  if (loginOk) {
    if (res.data?.user?.confirmationCodeChecked == false) {
      return <Navigate to="/checkCode" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return (
    <div id="login-container">
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Login</h1>
          <p>Logueate y ¡No te pierdas nada vecino!</p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register('email', { required: true })}
            />
          </div>
          <div className="password_container info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register('password', { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              Login
            </button>
          </div>
          <div>
            <p className="bottom-text">
              <small>¿No recuerdas tu contraseña?</small>
            </p>
            <p className="bottom-text">
              <small>
                <Link to="/forgotpassword" className="anchorCustom">
                  Cambiar contraseña
                </Link>
              </small>
            </p>
          </div>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          ¿No estas registrado? <Link to="/register">Registrate aqui</Link>
        </p>
      </div>
    </div>
  );
};
