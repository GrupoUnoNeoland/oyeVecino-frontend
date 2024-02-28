import { extraConfig } from "./serviceApiOyeVecino.config";

export const createNeighborhood = async (formData) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.post(`/neighborhoods/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteNeighborhood = async (neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.delete(`/neighborhoods/delete/${neighborhoodId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const updateNeighborhood = async (formData, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/update/${neighborhoodId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

export const getByIdNeighborhood = async (neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.get(`/neighborhoods/${neighborhoodId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const getAllNeighborhood = async () => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.get(`/neighborhoods/`)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleUsersInNeighborhood = async (userId, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(`/neighborhoods/add/${neighborhoodId}`, userId)
    .then((res) => res)
    .catch((error) => error);
};

export const toggleServicesInNeighborhood = async (
  serviceId,
  neighborhoodId
) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/add/services/${neighborhoodId}`,
    serviceId
  )
    .then((res) => res)
    .catch((error) => error);
};

export const toggleEventsInNeighborhood = async (eventId, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/add/events/${neighborhoodId}`,
    eventId
  )
    .then((res) => res)
    .catch((error) => error);
};

export const toggleStatementsInNeighborhood = async (
  statementId,
  neighborhoodId
) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/add/statements/${neighborhoodId}`,
    statementId
  )
    .then((res) => res)
    .catch((error) => error);
};

export const toggleCityInNeighborhood = async (cityId, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/add/city/${neighborhoodId}`,
    cityId
  )
    .then((res) => res)
    .catch((error) => error);
};
