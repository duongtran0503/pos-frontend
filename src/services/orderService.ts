import axiosClient from '@/config/axiosClient';
import { CreateOrderSchemaType, UpdateOrderSchemaType } from '@/schemas/order';
import { apiEndpoints } from '@/services/apiEndpoints';
import { ApiResponse } from '@/types/apiResponse';
import { BillType } from '@/types/order';
import { TableType } from '@/types/table';
import getAccessToken from '@/utils/getAccessToken';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const orderService = () => {
    let token = getAccessToken() || '';
    return {
        setToken(newToken:string) {
           token = newToken;
        },
        async createOrder(
            data: CreateOrderSchemaType
        ): Promise<BillType | null> {
            try {
                const res: AxiosResponse<ApiResponse<BillType>> =
                    await axiosClient.post(
                        apiEndpoints.order.createOrder,
                        data
                    );
                if (res.status === 201) {
                    toast.success('Đặt món thành công!');
                }
                return res.data.data || null;
            } catch (error) {
                console.error(error);

                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 400) {
                        toast.error('Bạn chưa gọi món ăn nào!');
                    }
                } else {
                    toast.error('Hệ thống bận vui lòng thử lại sau!');
                }
                return null;
            }
        },
        async getTable(): Promise<TableType[]> {
            try {
                const res: AxiosResponse<ApiResponse<TableType[]>> =
                    await axiosClient.get(apiEndpoints.table.getTable);
                return res.data.data || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },
        async getOrder(): Promise<BillType[]> {
            try {
                const res: AxiosResponse<ApiResponse<BillType[]>> =
                    await axiosClient.get(apiEndpoints.order.getOrder, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                return res.data.data || [];
            } catch (error) {
                console.error(error);
                return [];
            }
        },
        async getOrderById(id: string): Promise<BillType | null> {
            try {
                const res: AxiosResponse<ApiResponse<BillType>> =
                    await axiosClient.get(
                        apiEndpoints.order.getOrderDetail + id
                    );
                return res.data.data || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        async updateOrder(
            data: UpdateOrderSchemaType,
            id: string
        ): Promise<BillType | null> {
            try {
                const res: AxiosResponse<ApiResponse<BillType>> =
                    await axiosClient.put(
                        apiEndpoints.order.updateOrder + id,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                return res.data.data || null;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    };
};
export default orderService();
