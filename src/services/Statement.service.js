import { extraConfig } from './serviceApiOyeVecino.config';

//!-----------------CREATE----------------------------------------

export const createStatement = async (formData) => {
  const APIStatement = extraConfig();
  return APIStatement.post('/statements/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!---------------DELETE-----------------------------------------

export const deleteStatement = async (statementId) => {
  const APIStatement = extraConfig();
  return APIStatement.delete(`/statements/delete/${statementId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------GET ALL------------------------------------

export const getAllStatements = async () => {
  const APIStatement = extraConfig();
  return APIStatement.get('/statements/')
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------GET BY ID-----------------------------------

export const getByIdStatements = async (statementId) => {
  const APIStatement = extraConfig();
  return APIStatement.get(`/statements/${statementId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!--------------------UPDATE-------------------------------------

export const updateStatements = async (formData) => {
  const APIStatement = extraConfig();
  return APIStatement.post('/statements/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------GET ALL LIKE------------------------------------

export const getAllLikeStatement = async () => {
  const APIStatement = extraConfig();
  return APIStatement.get('/statements/getalllikes')
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE CITY--------------------------------------

export const toggleCityInStatement = async (cityId, statement) => {
  const APIStatement = extraConfig();
  return APIStatement.patch(`/add/city/${statement}`, cityId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE NEIGHBORHOOD--------------------------------------

export const toggleNeighborhoodInStatement = async (neighborhoodId, statement) => {
  const APIStatement = extraConfig();
  return APIStatement.patch(`/add/neighborhoods/${statement}`, neighborhoodId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE USER--------------------------------------

export const toggleUserInStatement = async (userId, statement) => {
  const APIStatement = extraConfig();
  return APIStatement.patch(`/add/${statement}`, userId)
    .then((res) => res)
    .catch((error) => error);
};
