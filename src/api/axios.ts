import axios from 'axios';

const API_URL_BASE = `${import.meta.env.VITE_API_URL}` || 'http://localhost:5000';
export const http = axios.create({
    baseURL: API_URL_BASE,
});
