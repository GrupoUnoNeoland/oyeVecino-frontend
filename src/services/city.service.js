import { extraConfig } from './serviceApiOyeVecino.config';

// ------------- create city
export const createCity = async (formData) => {
  const APICity = extraConfig();
  return APICity.post('cities/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ------------- delete city
export const deleteCity = async (cityId) => {
  const APICity = extraConfig();
  return APICity.delete(`cities/delete/${cityId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleNeighborhoodInCity

export const toggleNeighborhoodInCity = async (cityId, formData) => {
  const APICity = extraConfig();
  return APICity.patch(`cities/add/neighborhood/${cityId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleUserInCity

export const toggleUserInCity = async (cityId, formData) => {
  const APICity = extraConfig();
  return APICity.patch(`cities/add/users/${cityId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getByIdCity
export const getByIdCity = async (cityId) => {
  const APICity = extraConfig();
  return APICity.get(`cities/${cityId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getAllCity

export const getAllCity = async () => {
  const APICity = extraConfig();
  return APICity.get(`cities/`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- update city

export const updateCity = async (cityId, formData) => {
  const APICity = extraConfig();
  return APICity.patch(`cities/update/${cityId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};
