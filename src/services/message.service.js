import { extraConfig } from "./serviceApiOyeVecino.config";

export const createMessage = async (formData, recipientId) => {
  const APIMessage = extraConfig();

  return APIMessage.post(`/${recipientId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updateMessage = async (formData, messageId) => {
  const APIMessage = extraConfig();

  return APIMessage.patch(`/update/${messageId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteMessage = async (messageId) => {
  const APIMessage = extraConfig();

  return APIMessage.delete(`/delete/${messageId}`)
    .then((res) => res)
    .catch((error) => error);
};

export const getAllMessages = async () => {
  const APIMessage = extraConfig();

  return APIMessage.get(`/getallmessages/`)
    .then((res) => res)
    .catch((error) => error);
};

export const getByIdMessage = async (messageId) => {
  const APIMessage = extraConfig();

  return APIMessage.get(`/${messageId}`)
    .then((res) => res)
    .catch((error) => error);
};
