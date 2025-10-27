import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:7008/api",
    timeout: 5000,
});

api.interceptors.response.use(
    response => response,
    error => {
        const msg = error?.response?.data ?? error.message ?? "Något gick fel";
        console.error(msg);
        return Promise.reject(new Error(typeof msg === "string" ? msg : JSON.stringify(msg)));
    }
);
