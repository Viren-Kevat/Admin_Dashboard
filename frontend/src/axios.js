// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // required for httpOnly cookie
});

export default instance;
