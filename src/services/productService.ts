import axiosClient from '@/config/axiosClient';
import { apiEndpoints } from '@/services/apiEndpoints';
import { ApiResponse } from '@/types/apiResponse';
import { ProductType } from '@/types/product';
import { ProductListType } from '@/types/ProductList';
import { AxiosResponse } from 'axios';

const productService = {
    async getProducts({
        type,
        itemPerpage = 5,
        page = 1,
    }: {
        type: string;
        itemPerpage?: number;
        page?: number;
    }): Promise<ProductListType> {
        try {
            const res: AxiosResponse<ApiResponse<ProductListType>> =
                await axiosClient.get(
                    apiEndpoints.product.getProducts +
                        `?type=${type}&itemsPerPage=${itemPerpage}&page=${page}`
                );
            return (
                res.data.data || {
                    products: [],
                    page: 0,
                    currentItemsPerPage: 0,
                    totalProduct: 0,
                }
            );
        } catch (error: unknown) {
            console.error(error);
            return {
                products: [],
                page: 0,
                currentItemsPerPage: 0,
                totalProduct: 0,
            };
        }
    },
    async searchProduct(searchKey: string): Promise<ProductType[]> {
        try {
            const res: AxiosResponse<ApiResponse<ProductType[]>> =
                await axiosClient.get(
                    apiEndpoints.product.searchProduct + `?name=${searchKey}`
                );
            return res.data.data || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
};
export default productService;
