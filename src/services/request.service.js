import { extraConfig } from './serviceApiOyeVecino.config';

// ------------- create request
export const createRequest = async (formData) => {
  const APIRequest = extraConfig();
  return APIRequest.post('requests/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ------------- delete request
export const deleteRequest = async (requestId) => {
  const APIRequest = extraConfig();
  return APIRequest.delete(`requests/delete/${requestId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleUserInRequest

export const toggleUserInRequest = async (requestId, formData) => {
  const APIRequest = extraConfig();
  return APIRequest.patch(`requests/add/user/${requestId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleNeighborhoodInRequest

export const toggleNeighborhoodInRequest = async (requestId, formData) => {
  const APIRequest = extraConfig();
  return APIRequest.patch(`requests/add/neighborhood/${requestId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleCityInRequest

export const toggleCityInRequest = async (requestId, formData) => {
  const APIRequest = extraConfig();
  return APIRequest.patch(`cities/add/city/${requestId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getByIdRequest
export const getByIdRequest = async (requestId) => {
  const APIRequest = extraConfig();
  return APIRequest.get(`requests/${requestId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getAllRequest

export const getAllRequest = async () => {
  const APIRequest = extraConfig();
  return APIRequest.get(`requests/`)
    .then((res) => res)
    .catch((error) => error);
};
