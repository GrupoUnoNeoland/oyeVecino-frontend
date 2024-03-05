import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
export const useRequestError = (res, setRes, setOkRequest, userRequest) => {
  console.log('>>res', res);

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Interval Server Error ❎!',
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
    setOkRequest(false);
  }

  if (res?.status == 200) {
    if (localStorage.getItem('user')) {
      const currentUser = localStorage.getItem('user');
      const parseUser = JSON.parse(currentUser);
      const customUser = {
        ...parseUser,
        request: true,
      };

      const stringUser = JSON.stringify(customUser);
      userRequest(stringUser);
    }
    setOkRequest(true);
    setRes(() => ({}));
    Swal.fire({
      icon: 'success',
      title: 'Ok request create ✅',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.message == 'Network Error') {
    setRes(() => ({}));
    setOkRequest(false);
    Swal.fire({
      icon: 'error',
      title: 'Internal server error ❎.',
      text: 'No files sent',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  if (res?.data?.delete?.includes('not saved')) {
    setOkRequest(false);
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'Request not saved ❎.',
      text: 'Your request was not saved.',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  if (res?.response?.status == 409) {
    setOkRequest(true);
    setRes(() => ({}));
    Swal.fire({
      icon: 'error',
      title: 'Internal server error ❎.',
      text: 'A request already exists.',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
