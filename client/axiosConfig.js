import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "http://localhost3000",
    headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${sessionStorage.getItem("authToken")}`,
        "Accept" :  "application/json",
    },
});

axiosInstance.interceptors.request.use((config)=> {
    const token = sessionStorage.getItem("jwt");
    if (token) {
        config.headers["Authorization"] = `Bearer${token}`;
    }
    return config;
});

export default axiosInstance;