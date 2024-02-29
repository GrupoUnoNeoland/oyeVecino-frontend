import { extraConfig } from './serviceApiUser.config';

//!-----------------CREATE----------------------------------------

export const createLike = async (formData) => {
  const APIRating = extraConfig();
  return APIRating.post('/requests/create/', formData)
    .then((res) => res)
    .catch((error) => error);
};
