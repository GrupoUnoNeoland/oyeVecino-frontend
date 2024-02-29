import { extraConfig } from './serviceApiUser.config';

//!-----------------CREATE----------------------------------------

export const createEvents = async (formData) => {
  const APIEvent = extraConfig();
  return APIEvent.post('/events/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!---------------DELETE-----------------------------------------

export const deleteEvents = async (eventId) => {
  const APIEvent = extraConfig();
  return APIEvent.delete(`/events/delete/${eventId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------GET ALL------------------------------------

export const getAllEvents = async () => {
  const APIEvent = extraConfig();
  return APIEvent.get('/events/')
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------GET BY ID-----------------------------------

export const getByIdEvents = async (eventId) => {
  const APIEvent = extraConfig();
  return APIEvent.get(`/events/${eventId}`)
    .then((res) => res)
    .catch((error) => error);
};

//!--------------------UPDATE-------------------------------------

export const updateEvents = async (formData) => {
  const APIEvent = extraConfig();
  return APIEvent.post('/events/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------GET ALL LIKE------------------------------------

export const getAllLikeEvents = async () => {
  const APIEvent = extraConfig();
  return APIEvent.get('/events/getalllikes')
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE CITY--------------------------------------

export const toggleCityInEvent = async (cityId, event) => {
  const APIEvent = extraConfig();
  return APIEvent.patch(`/add/city/${event}`, cityId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE NEIGHBORHOOD--------------------------------------

export const toggleNeighborhoodInEvent = async (neighborhoodId, event) => {
  const APIEvent = extraConfig();
  return APIEvent.patch(`/add/neighborhoods/${event}`, neighborhoodId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE SPONSOR--------------------------------------

export const toggleSponsorInEvent = async (sponsorId, event) => {
  const APIEvent = extraConfig();
  return APIEvent.patch(`/add/sponsors/${event}`, sponsorId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE LIKE--------------------------------------

export const toggleLikeInEvent = async (likeId, event) => {
  const APIEvent = extraConfig();
  return APIEvent.patch(`/add/likes/${event}`, likeId)
    .then((res) => res)
    .catch((error) => error);
};

//!-------------------TOGGLE ORGANIZER--------------------------------------

export const toggleOrganizerInEvent = async (organizerId, event) => {
  const APIEvent = extraConfig();
  return APIEvent.patch(`/add/organizers/${event}`, organizerId)
    .then((res) => res)
    .catch((error) => error);
};
