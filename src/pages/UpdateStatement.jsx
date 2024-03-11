import './UpdateStatement.css';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Uploadfile } from '../components';

import { Navigate, useParams } from 'react-router-dom';
//import { useCreateStatementError } from '../hooks/useCreateStatementError';
import { updateStatements, getByIdStatements } from '../services/Statement.service';

export const UpdateStatement = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  //const [okRegister, setOkRegister] = useState(null);
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
        images: inputFile[0],
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

  // useEffect(() => {
  //   useCreateStatementError(res, setOkRegister, setRes);
  // }, [res]);

  // if (okRegister) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <div id="create-statement-container">
      <div className="form-wrap">
        <h1>Editar comunicado</h1>
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
            <Uploadfile registerForm={register} type="image" />
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
