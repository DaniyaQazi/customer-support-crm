import axios from "axios";

const api = axios.create({
    baseURL: "https://customer-support-crm-3kza.onrender.com/api"
});
export default api;