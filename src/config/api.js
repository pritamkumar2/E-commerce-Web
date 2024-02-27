import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

const DEPLOYED = "https://pear-poised-hen.cyclic.app/";
const LOCALHOST = apiUrl;

export const API_BASE_URL = LOCALHOST;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
