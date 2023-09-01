import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    // baseURL: "http://18.117.161.119/api",
    withCredentials: true,
    json: true,
});

export default newRequest;