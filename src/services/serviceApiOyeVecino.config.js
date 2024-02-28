import axios from "axios";
import { updateToken } from "../utils/updateToken";

export const extraConfig = () => {
  return axios.create({
    baseURL: "https://localhost:8080/api/v1/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${updateToken()}`,
    },
    timeout: 60000,
  });
};