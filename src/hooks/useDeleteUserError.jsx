import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const useDeleteUserError = (res, setOkDelete, setRes) => {
  Swal.fire({
    title: 'Estás seguro de borrar tu perfil?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgb(73, 193, 162)',
    cancelButtonColor: '#d33',
    confirmButtonText: 'YES',
  }).then(async (result) => {
    if (result.isConfirmed) {
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            title: 'Usuario borrado',
            text: 'Esperamos verte pronto de nuevo !',
            showConfirmButton: false,
            timer: 1500,
          });
          setOkDelete(() => true);
          setRes(null);

          break;

        default:
          Swal.fire({
            icon: 'error',
            title: 'No delete User ❎',
            text: 'Please, try again',
            showConfirmButton: false,
            timer: 1500,
          });
          setOkDelete(() => false);
          setRes(null);
          break;
      }
    }
  });
};
