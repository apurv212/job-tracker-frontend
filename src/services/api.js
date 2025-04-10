import axios from "axios";

const api = axios.create({
  baseURL: "https://job-tracker-backend-dt07.onrender.com/api",
});

export default api;
