import { extraConfig } from './serviceApiOyeVecino.config';

//!-----------------CREATE----------------------------------------

export const createRating = async (formData) => {
  const APIRating = extraConfig();
  return APIRating.post('/rating/create/', formData)
    .then((res) => res)
    .catch((error) => error);
};
