import './UpdateEvent.css';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Uploadfile } from '../components';
import { createEvent, getByIdEvents } from '../services/Events.service';
import { useCreateEventError } from '../hooks';
import { Navigate, useParams } from 'react-router-dom';

export const UpdateEvent = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [okRegister, setOkRegister] = useState(null);

  const { id } = useParams();
  const [eventId, setEventId] = useState(id);
  const getPrevData = async () => {
    const allEventData = await getByIdEvents(eventId);

    const eventData = allEventData.data;

    setValue('title', eventData.title);
    setValue('description', eventData.description);
    setValue('adress', eventData.adress);
    setValue('date', eventData.date);
    setValue('timetable', eventData.timetable);
    setValue('price', eventData.price);
  };
  useEffect(() => {
    getPrevData(id);
  }, [eventId]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;
    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        images: inputFile[0],
      };

      setSend(true);
      setRes(await createEvent(customBody, eventId));
      setSend(false);
    } else {
      const customBody = {
        ...formData,
        images: [''],
      };
      setSend(true);
      setRes(await createEvent(customBody, eventId));
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
        <h1>Modificar Evento</h1>
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
              Descripción del Evento
              <div className="adress_container">
                <input
                  className="input_adress"
                  type="text"
                  id="adress"
                  name="adress"
                  autoComplete="false"
                  {...register('adress', { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                  Dirección
                </label>
              </div>
              <div className="date_container">
                <input
                  className="input_date"
                  type="text"
                  id="date"
                  name="date"
                  autoComplete="false"
                  {...register('date', { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                  Fecha del evento
                </label>
              </div>
              <div className="timetable_container">
                <input
                  className="input_timetable"
                  type="text"
                  id="timetable"
                  name="timetable"
                  autoComplete="false"
                  {...register('timetable', { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                  Horario del evento
                </label>
              </div>
            </label>
            <Uploadfile registerForm={register} type="image" />
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
