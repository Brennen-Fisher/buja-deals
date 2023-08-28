import axios from "axios";

const newRequest = axios.create({
    // baseURL: "http://localhost:8800/api",
    baseURL: "http://52.15.59.66/api",
    withCredentials: true,
    json: true,
});

export default newRequest;