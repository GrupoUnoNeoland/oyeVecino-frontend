import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const useCreateServiceError = (res, setRegisterOk, setRes) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    const dataToString = JSON.stringify(res);
    localStorage.setItem('data', dataToString);
    setRegisterOk(() => true);

    Swal.fire({
      icon: 'success',
      title: 'Servico creado con éxito ! 👏',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
  //! -------------------- 500 : internal server error

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Interval server error!❎ Please try again.',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! -------------------- 404: 'error, resend code'
  if (res?.response?.status == 404) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Servicio no registrado ! ❌',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};
