import React, { useState } from 'react';
import './CreateOfferedService.css';
import { useForm } from 'react-hook-form';
import { createService } from '../services/service.service';
import { Uploadfile } from '../components';

export const CreateOfferedService = () => {
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;
    if (inputFile.length != 0) {
      const customBody = {
        ...formData,
        images: inputFile[0],
        type: 'offered',
      };
      //! si hay imagen:
      setSend(true);
      setRes(await createService(customBody));
      setSend(false);
    } else {
      //! si no hay imagen
      setSend(true);
      setRes(await createService(formData));
      setSend(false);
    }
  };

  //useEffect(() => { //el useEffect escucha la respuesta de la "res" -> respuesta, si tiene, se lanza (que siempre va a tener)
  //useCreateOfferedServiceError(res, setOkRegister, setRes);
  //if (res?.status == 200);
  //}, [res]);
  //if (okRegister) {escribir pagina para navegar (AQUI UN NAVIGATE)}

  return (
    <div id="create-service-container">
      <div className="form-wrap">
        <h1>Crear servicio</h1>
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
              Descripción del servicio
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
