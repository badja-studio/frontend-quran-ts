import axios from "axios";

const gtkApiClient = axios.create({
  baseURL: import.meta.env.VITE_GTK_API_BASE_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
});

export default gtkApiClient;
