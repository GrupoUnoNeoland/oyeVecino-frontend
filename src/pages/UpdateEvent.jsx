import './UpdateEvent.css';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Uploadfile } from '../components';
import { createEvent, getByIdEvents, updateEvents } from '../services/Events.service';
import { useCreateEventError, useUpdateEventError } from '../hooks';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const UpdateEvent = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const { user } = useAuth();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [okRegister, setOkRegister] = useState(null);
  const [data, setData] = useState(null);

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
    setData(eventData);
  };
  useEffect(() => {
    getPrevData(id);
  }, [eventId]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;

    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        images: inputFile,
      };

      setSend(true);
      setRes(await updateEvents(customBody, eventId));
      setSend(false);
    } else {
      const customBody = {
        ...formData,
        images: [...data.images],
      };
      setSend(true);
      setRes(await updateEvents(customBody, eventId));
      setSend(false);
    }
  };

  useEffect(() => {
    useUpdateEventError(res, setOkRegister, setRes);
  }, [res]);

  if (okRegister) {
    return <Navigate to={`/profile/${user._id}`} />;
  }

  return (
    <div id="create-event-container">
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Modificar evento</h1>
          <p>Introduzca los nuevo datos de tu evento.</p>
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
            <label htmlFor="description" className="label-description">
              Descripción
            </label>
            <textarea
              className="input_user_textArea"
              name="description"
              id="description"
              rows="7"
              cols="28"
              {...register('description')}
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
