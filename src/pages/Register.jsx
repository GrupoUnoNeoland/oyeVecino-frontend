import { useEffect, useState } from 'react';
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
    <>
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
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

            <div className="cif">
              <input type="text" name="cif" id="cif" {...register('cif')} maxLength="9" />
              <label htmlFor="cif" className="label-cif">
                CIF
              </label>
              <input type="text" name="adress" id="adress" {...register('adress')} />
              <label htmlFor="adress" className="label-adress">
                Dirección
              </label>
              <input type="number" name="age" id="age" {...register('age')} />
              <label htmlFor="age" className="label-age">
                Edad
              </label>
              <input
                type="text"
                name="description"
                id="description"
                {...register('description')}
              />
              <label htmlFor="description" className="label-description">
                Descripción
              </label>
               <input type="number" name="telephone" id="telephone" {...register('telephone')} />
              <label htmlFor="telephone" className="label-telephone">
                Teléfono
              </label>
            </div>
            <Uploadfile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#2f7a67' }}
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
    </>
  );
};
