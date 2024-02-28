import { extraConfig } from "./serviceApiOyeVecino.config";

//!---------CREATE NEIGHBORHOOD:

export const createNeighborhood = async (formData) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.post(`/neighborhoods/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!----------DELETE NEIGHBORHOOD:

export const deleteNeighborhood = async (neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.delete(`/neighborhoods/delete/${neighborhoodId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!-----------UPDATE NEIGHBORHOOD:

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
//!----------GET BY ID:

export const getByIdNeighborhood = async (neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.get(`/neighborhoods/${neighborhoodId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!----------GET ALL:

export const getAllNeighborhood = async () => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.get(`/neighborhoods/`)
    .then((res) => res)
    .catch((error) => error);
};

//!----------TOGGLE USERS:

export const toggleUsersInNeighborhood = async (userId, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(`/neighborhoods/add/${neighborhoodId}`, userId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------TOGGLE SERVICES:

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

//!---------------TOGGLE EVENTS:

export const toggleEventsInNeighborhood = async (eventId, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/add/events/${neighborhoodId}`,
    eventId
  )
    .then((res) => res)
    .catch((error) => error);
};

//!---------TOGGLE STATEMENTS:

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

//!---------TOGGLE CITY:

export const toggleCityInNeighborhood = async (cityId, neighborhoodId) => {
  const APINeighborhood = extraConfig();

  return APINeighborhood.patch(
    `/neighborhoods/add/city/${neighborhoodId}`,
    cityId
  )
    .then((res) => res)
    .catch((error) => error);
};
