import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    // baseURL: "http://3.142.184.4/api",
    withCredentials: true,
    json: true,
});

export default newRequest;