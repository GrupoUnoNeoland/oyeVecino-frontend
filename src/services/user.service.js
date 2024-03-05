import { extraConfig } from './serviceApiOyeVecino.config';

export const registerUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`users/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const registerAdmin = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`users/registeradmin`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendCode = async (userId) => {
  const APIUser = extraConfig();

  return APIUser.post(`users/register/sendMail/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const resendCode = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`users/resend`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const checkCodeNewUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/check`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const loginUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post('users/login', formData)
    .then((res) => res)
    .catch((error) => error);
};

export const autoLogin = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`users/login/autologin`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const forgotPassword = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/forgotpassword`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const changePassword = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/changepassword`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const updateUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/update/update`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updateAdressCheck = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/update/adresscheck/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.delete(`users/`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const getAllUser = async () => {
  const APIUser = extraConfig();

  return APIUser.get(`users/`)
    .then((res) => res)
    .catch((error) => error);
};

export const getById = async (userId) => {
  const APIUser = extraConfig();

  return APIUser.get(`users/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleNeighborhoodInUser = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/add/neighborhood/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleServicesOffered = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/add/servicesoffered/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleServicesDemanded = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/add/servicesdemanded/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleStatement = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/add/statement/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleCity = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/add/city/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleRequest = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`users/add/request/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};
