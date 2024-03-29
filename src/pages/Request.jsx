import './Request.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Uploadfile } from '../components/index';
import { useAuth } from '../context/authContext';
import { useRegisterError } from '../hooks';
import { useRequestError } from '../hooks/useRequestError';
import { createRequest } from '../services/request.service';
import { registerUser } from '../services/user.service';

export const Request = () => {
  const { allUser, setAllUser, bridgeData, setDeleteUser, userRequest } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRequest, setOkRequest] = useState(false);

  const formSubmit = async () => {
    const inputFile = document.getElementById('file-upload').files;
    const formData = { document: inputFile[0] };
    // console.log('formData', formData, {"document": inputFile[0]});
    if (inputFile.length != 0) {
      console.log('aqui');
      setSend(true);
      setRes(await createRequest(formData));
      setSend(false);
    } else {
      setSend(true);
      setRes(await createRequest(formData));
      setSend(false);
    }
  };

  useEffect(() => {
    console.log(res);
    useRequestError(res, setRes, setOkRequest, userRequest);
    // if (res?.status == 200) bridgeData('ALLUSER');
  }, [res]);

  // useEffect(() => {
  //   console.log('😍', allUser);
  // }, [allUser]);

  // useEffect(() => {
  //   setDeleteUser(() => false);
  // }, []);

  if (okRequest) {
    console.log('okRequest', okRequest);
    return <Navigate to="/dashboard" />;
  }

  return (
    <div id="request-container">
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Verificación de vecino</h1>
          <p>
            Este es el último paso, comprobaremos que eres un vecino real de este barrio.
          </p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)}>
          <label>Comprobante de residencia</label>
          <Uploadfile registerForm={register} type="file" />
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              Send
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
