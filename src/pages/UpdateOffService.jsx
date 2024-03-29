import './UpdateOffService.css';

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Uploadfile } from '../components';

import { Navigate, useParams } from 'react-router-dom';
import { getByIdService, updateServices } from '../services/service.service';
import { useAuth } from '../context/authContext';
import { useUpdateServiceError } from '../hooks';

export const UpdateOffService = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [okRegister, setOkRegister] = useState(null);
  const [serviceId, setServiceId] = useState(id);

  const getPrevData = async () => {
    const allServiceData = await getByIdService(serviceId);

    const serviceData = allServiceData.data;
    console.log('serviceData:', allServiceData);

    setValue('title', serviceData.title);
    setValue('description', serviceData.description);
    setValue('images', serviceData.images[0]);
  };

  useEffect(() => {
    getPrevData(id);
  }, [serviceId]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;
    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        images: inputFile,
      };
      setSend(true);

      setRes(await updateServices(customBody, serviceId));
      setSend(false);
    } else {
      const customBody = {
        ...formData,
        images: [''],
      };
      setSend(true);
      setRes(await updateServices(customBody, serviceId));
      setSend(false);
    }
  };

  useEffect(() => {
    useUpdateServiceError(res, setOkRegister, setRes);
  }, [res]);

  if (okRegister) {
    return <Navigate to={`/profile/${user?._id}`} />;
  }

  return (
    <div id="create-statement-container">
      <div className="form-wrap">
        <h1>Editar Servicio Ofrecido</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="title_container">
            <input
              className="input_title"
              type="text"
              id="title"
              name="title"
              autoComplete="false"
              {...register('title', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Título
            </label>
          </div>
          <div className="description_container">
            <input
              className="input_description"
              type="text"
              id="description"
              name="description"
              autoComplete="false"
              {...register('description', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Descripción del Comunicado
            </label>
            <Uploadfile registerForm={register} type="image" multipleUpload={true} />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000' }}
            >
              Actualizar
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
