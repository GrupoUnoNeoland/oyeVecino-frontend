import { extraConfig } from "./serviceApiOyeVecino.config";

export const registerUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const registerAdmin = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`/registeradmin`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendCode = async (userId) => {
  const APIUser = extraConfig();

  return APIUser.post(`/register/sendMail/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const resendCode = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`/resend`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const checkCodeNewUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/check`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const login = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`/login`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const autoLogin = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.post(`/login/autologin`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const forgotPassword = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/forgotpassword`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const changePassword = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/changepassword`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const updateUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/update/update`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteUser = async (formData) => {
  const APIUser = extraConfig();

  return APIUser.delete(`/`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const getAllUser = async () => {
  const APIUser = extraConfig();

  return APIUser.get(`/`)
    .then((res) => res)
    .catch((error) => error);
};

export const getById = async (userId) => {
  const APIUser = extraConfig();

  return APIUser.get(`/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleNeighborhood = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/add/neighborhood/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleServicesOffered = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/add/servicesoffered/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleServicesDemanded = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/add/servicesdemanded/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleStatement = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/add/statement/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleCity = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/add/city/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleRequest = async (formData, userId) => {
  const APIUser = extraConfig();

  return APIUser.patch(`/add/request/${userId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};
