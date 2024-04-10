import './UpdateStatement.css';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Uploadfile } from '../components';

import { Navigate, useParams } from 'react-router-dom';

import { updateStatements, getByIdStatements } from '../services/Statement.service';
import { useUpdateStatementError } from '../hooks';
import { useAuth } from '../context/authContext';

export const UpdateStatement = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [okRegister, setOkRegister] = useState(null);
  const [statementId, setStatementId] = useState(id);

  const getPrevData = async () => {
    const allStatementData = await getByIdStatements(statementId);

    const statementData = allStatementData.data;

    setValue('title', statementData.title);
    setValue('description', statementData.description);
    setValue('images', statementData.images[0]);
  };

  useEffect(() => {
    getPrevData(id);
  }, [statementId]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;
    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        images: inputFile,
      };
      setSend(true);
      setRes(await updateStatements(customBody, statementId));
      setSend(false);
    } else {
      const customBody = {
        ...formData,
        images: [''],
      };
      setSend(true);
      setRes(await updateStatements(customBody, statementId));
      setSend(false);
    }
  };

  useEffect(() => {
    useUpdateStatementError(res, setOkRegister, setRes);
  }, [res]);

  if (okRegister) {
    return <Navigate to={`/profile/${user?._id}`} />;
  }

  return (
    <div id="create-statement-container">
      <div className="form-wrap">
        <div className="form-title-container">
          <h1>Editar comunicado</h1>
          <p>
            Introduzca los nuevos datos de tu comunicado para tener a tus vecinos
            actualizados al 100%.
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
            <label htmlFor="description" className="label-description">
              Descripción
            </label>
            <textarea
              className="input_user_textArea"
              rows="7"
              cols="28"
              id="description"
              name="description"
              autoComplete="false"
              {...register('description', { required: true })}
            />
          </div>

          <Uploadfile registerForm={register} type="image" multipleUpload={true} />

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
