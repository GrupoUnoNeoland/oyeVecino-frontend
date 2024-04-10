import './ForgotPassword.css';

import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { useForgotPasswordError } from '../hooks';
import { forgotPassword } from '../services/user.service';

export const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);

  const formSubmit = async (formData) => {
    console.log('formData', formData);
    setSend(true);
    setRes(await forgotPassword(formData));
    setSend(false);
  };

  useEffect(() => {
    useForgotPasswordError(res, setRes, setForgotOk);
  }, [res]);

  if (forgotOk) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="forgotpassword-container">
      <div className="form-container">
        <div className="form-wrap">
          <div className="form-title-container">
            <h1>Cambiar la contraseña</h1>
            <p>
              Si has olvidado la contraseña, introduce tu email y te enviaremos una nueva
              para poder acceder.
            </p>
          </div>

          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group info_container">
              <input
                className="input_user"
                type="text"
                id="email"
                name="email"
                autoComplete="false"
                {...register('email', { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Email
              </label>
            </div>

            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? '#4b4848' : '#000000' }}
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
