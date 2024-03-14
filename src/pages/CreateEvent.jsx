import './CreateEvent.css';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Uploadfile } from '../components';
import { createEvent } from '../services/Events.service';
import { useCreateEventError } from '../hooks';
import { Navigate } from 'react-router-dom';

export const CreateEvent = () => {
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
      };

      console.log(customBody);
      setSend(true);
      setRes(await createEvent(customBody));
      setSend(false);
    } else {
      const customBody = {
        ...formData,
        images: [''],
      };
      setSend(true);
      setRes(await createEvent(customBody));
      setSend(false);
    }
  };

  useEffect(() => {
    useCreateEventError(res, setOkRegister, setRes);
  }, [res]);

  if (okRegister) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div id="create-event-container">
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Crear evento</h1>
          <p>
            ¿Algun evento digno de recordar en el vecindario? Crea un evento para que tus
            vecinos no se lo pierdan.
          </p>
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
              Descripción
            </label>
            <input
              className="input_description"
              type="text"
              id="description"
              name="description"
              autoComplete="false"
              {...register('description', { required: true })}
            />

            <div className="adress_container info_container">
              <label htmlFor="custom-input" className="custom-placeholder">
                Dirección
              </label>
              <input
                className="input_adress"
                type="text"
                id="adress"
                name="adress"
                autoComplete="false"
                {...register('adress', { required: true })}
              />
            </div>
            <div className="dateTime_event">
              <div className="date_container info_container">
                <label htmlFor="custom-input" className="custom-placeholder">
                  Fecha del evento
                </label>
                <input
                  className="input_date"
                  type="date"
                  id="date"
                  name="date"
                  autoComplete="false"
                  {...register('date', { required: true })}
                />
              </div>
              <div className="timetable_container info_container">
                <label htmlFor="custom-input" className="custom-placeholder">
                  Horario del evento
                </label>
                <input
                  className="input_timetable"
                  type="time"
                  id="timetable"
                  name="timetable"
                  autoComplete="false"
                  {...register('timetable', { required: true })}
                />
              </div>
            </div>

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
