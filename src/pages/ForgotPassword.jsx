import React from 'react';
import './ForgotPassword.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { forgotPassword } from '../services/user.service';
import { useForgotPasswordError } from '../hooks';

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
      <div className="form-wrap">
        <h1>Change your password</h1>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
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

          <p className="bottom-text">
            <small>Enter your email to send you the new password</small>
          </p>
        </form>
      </div>
    </div>
  );
};
