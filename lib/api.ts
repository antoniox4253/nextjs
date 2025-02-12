import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Gracias al proxy en Vite, no necesitas poner la URL completa
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
