import React, { useEffect, useState } from 'react';
import './CreateService.css';
import { useForm } from 'react-hook-form';
import { createService } from '../services/service.service';
import { Uploadfile } from '../components';
import { Navigate } from 'react-router-dom';
import { useCreateServiceError } from '../hooks/useCreateServiceError';

export const Createservice = ({ type }) => {
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [okRegister, setOkRegister] = useState(null);
  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;
    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        images: inputFile,
        type: type,
      };
      setSend(true);
      setRes(await createService(customBody));
      setSend(false);
    } else {
      const customBody = {
        ...formData,
        type: type,
        images: [''],
      };
      setSend(true);
      setRes(await createService(customBody));
      setSend(false);
    }
  };

  useEffect(() => {
    useCreateServiceError(res, setOkRegister, setRes);
  }, [res]);

  if (okRegister) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div id="create-service-container">
      <div className="form-wrap">
        <div className="form-title-container">
          {type == 'demanded' ? (
            <h1>Crear una petición de un servicio</h1>
          ) : (
            <h1>Crear una oferta de tu servicio</h1>
          )}

          {type == 'demanded' ? (
            <p>Aqui podras crear el servicio que demandas encontrar en tus vecinos.</p>
          ) : (
            <p>
              Aqui podras crear el servicio que estas dispuesto a ofrecer a tus vecinos.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="title_container info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              Título
            </label>
            <input
              className="input_title"
              type="text"
              id="title"
              name="title"
              autoComplete="false"
              {...register('title', { required: true })}
            />
          </div>
          <div className="description_container info_container">
            <label htmlFor="custom-input" className="custom-placeholder">
              Descripción del servicio
            </label>
            <input
              className="input_description"
              type="text"
              id="description"
              name="description"
              autoComplete="false"
              {...register('description', { required: true })}
            />

            <Uploadfile registerForm={register} type="image" multipleUpload={true} />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
      {/*<div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link to="/login">Login Here</Link>
         </p>
      </div>*/}
    </div>
  );
};
