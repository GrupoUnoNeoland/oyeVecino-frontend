import { extraConfig } from "./serviceApiOyeVecino.config";

// ------------- create service
export const createService = async (formData) => {
  const APIService = extraConfig();
  return APIService.post("/service/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ------------- delete service
export const deleteService = async (serviceId) => {
  const APIService = extraConfig();
  return APIService.delete(`/services/delete/${serviceId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleUserServiceOffered

export const toggleUserServiceOffered = async (serviceId) => {
  const APIService = extraConfig();
  return APIService.patch(`services/add/users/servicedemanded/${serviceId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleUsersServiceDemanded

export const toggleUsersServiceDemanded = async (serviceId, formData) => {
  const APIService = extraConfig();
  return APIService.patch(
    `services/add/users/serviceoffered/${serviceId}`,
    formData
  )
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleNeighborhoods

export const toggleNeighborhoods = async (serviceId, formData) => {
  const APIService = extraConfig();
  return APIService.patch(`services/add/neighborhoods/${serviceId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- toggleCity

export const toggleCity = async (serviceId, formData) => {
  const APIService = extraConfig();
  return APIService.patch(`services/add/city/${serviceId}`, formData)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getByIdService
export const getByIdService = async (serviceId) => {
  const APIService = extraConfig();
  return APIService.get(`services/${serviceId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getAllServices

export const getAllServices = async () => {
  const APIService = extraConfig();
  return APIService.get(`services/`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getByNameServices

export const getByNameServices = async (title) => {
  const APIService = extraConfig();
  return APIService.get(`services/byName/${title}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- updateServices

export const updateServices = async (serviceId, formData) => {
  const APIService = extraConfig();
  return APIService.patch(`services/update/service/${serviceId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ------------- calculateStarsAverage

export const calculateStarsAverage = async (userId) => {
  const APIService = extraConfig();
  return APIService.post(`services/add/rating/${userId}`)
    .then((res) => res)
    .catch((error) => error);
};

// ------------- getAllServicesStar

export const getAllServicesStar = async () => {
  const APIService = extraConfig();
  return APIService.get(`services/getallorder/`)
    .then((res) => res)
    .catch((error) => error);
};
