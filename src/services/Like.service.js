import { extraConfig } from "./serviceApiUser.config";

//!-----------------CREATE----------------------------------------

export const createLike = async (formData, formDataId) => {
  const APILike = extraConfig();
  return APILike.post(`/like/create/${formDataId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

//!---------------DELETE-----------------------------------------

export const deleteLike = async (formData, formDataId) => {
  const APILike = extraConfig();
  return APILike.delete(`/like/delete/${formDataId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};
