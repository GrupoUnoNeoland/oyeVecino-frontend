import { extraConfig } from './serviceApiOyeVecino.config';

export const createMessage = async (formData, recipientId) => {
  const APIMessage = extraConfig();

  return APIMessage.post(`messages/${recipientId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updateMessage = async (formData, messageId) => {
  const APIMessage = extraConfig();

  return APIMessage.patch(`messages/update/${messageId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteMessage = async (messageId) => {
  const APIMessage = extraConfig();

  return APIMessage.delete(`messages/delete/${messageId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const getAllMessages = async () => {
  const APIMessage = extraConfig();

  return APIMessage.get(`messages/getallmessages/`)
    .then((res) => res)
    .catch((error) => error);
};

export const getByIdMessage = async (messageId) => {
  const APIMessage = extraConfig();

  return APIMessage.get(`messages/${messageId}`)
    .then((res) => res)
    .catch((error) => error);
};
