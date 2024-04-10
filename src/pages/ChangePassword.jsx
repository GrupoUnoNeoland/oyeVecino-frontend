import './ChangePassword.css';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import React from 'react';

import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import { changePassword } from '../services/user.service';
import { useChangePasswordError } from '../hooks';

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;

    if (newPassword == confirmPassword) {
      Swal.fire({
        title: '¿Estás seguro de querer cambiar la contraseña?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(73, 193, 162)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSend(true);
          setRes(await changePassword({ password, newPassword }));
          setSend(false);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: " New Password don't match witch confirmation password❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  useEffect(() => {
    console.log(res);
    useChangePasswordError(res, setRes, setUser);
  }, [res]);

  return (
    <>
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Cambiar la contraseña</h1>
          <p>
            Por favor ingrese su nueva y antigua contraseña para poder actualizar su
            información
          </p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="password_container form-group info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              Old password
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
          <div className="newPassword_container form-group info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register('newPassword', { required: true })}
            />
          </div>
          <div className="confirmPassword_container form-group info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              Confirm new password
            </label>
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register('confirmPassword', { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
