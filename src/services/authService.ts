import axiosClient from '@/config/axiosClient';
import { loginSchemaType } from '@/schemas/login';
import { apiEndpoints } from '@/services/apiEndpoints';
import { ApiResponse } from '@/types/apiResponse';
import { LoginType } from '@/types/auth';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const authService = () => {
    return {
        async login(data: loginSchemaType): Promise<LoginType> {
            try {
                const res: AxiosResponse<ApiResponse<LoginType>> =
                    await axiosClient.post(apiEndpoints.auth.login, data);
                console.log(res);
                return res.data.data || { token: '' };
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const statusCode = error.response?.data?.statusCode;
                    const message = error.response?.data?.message;

                    if (statusCode === 400) {
                        toast.error(message);
                    } else {
                        toast.error('Hệ thống bận vui lòng thử lại sau!');
                    }
                } else {
                    toast.error('Hệ thống bận vui lòng thử lại sau!');
                }
                return { token: '' };
            }
        },
    };
};
export default authService();
