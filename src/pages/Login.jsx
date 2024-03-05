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
      <div className="vecinos">
        <img
          className="imageLogin"
          src="https://res.cloudinary.com/dqiveomlb/image/upload/v1709666771/APP/composition-login_vqlaqf.png"
          alt="vecindario"
        />
        {/* <div className="mostard-square"></div> */}
      </div>
      <div className="form-container">
        <div className="form-wrap">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="email_container form-group">
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
            <div className="password_container form-group">
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
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? '#4b4848' : '#000000' }}
              >
                LOGIN
              </button>
            </div>
            <div>
              <p className="bottom-text">
                <small>Have you forgotten the password?</small>
              </p>
              <p className="bottom-text">
                <small>
                  <Link to="/forgotpassword" className="anchorCustom">
                    Change password
                  </Link>
                </small>
              </p>
            </div>
          </form>
          <div className="footerForm">
            <p className="parrafoLogin">Are you not registered?</p>
            <p className="parrafoLogin">
              <Link to="/register">Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
