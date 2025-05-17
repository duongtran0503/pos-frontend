import axiosClient from '@/config/axiosClient';
import { apiEndpoints } from '@/services/apiEndpoints';
import { ApiResponse } from '@/types/apiResponse';
import { CategoryType } from '@/types/category';
import { AxiosResponse } from 'axios';

const categoryService = () => {
    return {
        async getCategories(type: string): Promise<CategoryType[]> {
            try {
                const res: AxiosResponse<ApiResponse<CategoryType[]>> =
                    await axiosClient.get(
                        apiEndpoints.category.getCategories + `?type=${type}`
                    );

                return res.data.data || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    };
};

export default categoryService();
