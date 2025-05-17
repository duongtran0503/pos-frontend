import { envConfig } from '@/config/config';
import axios from 'axios';
const axiosClient = axios.create({
    baseURL: envConfig.apiURl,
});

axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
