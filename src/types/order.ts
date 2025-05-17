import { ProductType } from '@/types/product';
import { TableType } from '@/types/table';

export interface OrderType {
    product: ProductType;
    quantity: number;
}

export interface BillType {
    _id: string;
    orderDetails: OrderType[];
    table: TableType;
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    status: string;
    orderType: string;
    staffNotes?: string;
    customNotes?: string;
    paymentStatus: string;
    paymentDate?: string;
    updateAt: string;
    createdAt: string;
    [key: string]: unknown;
}

export const defaultBill: BillType = {
    _id: '',
    orderDetails: [],
    table: {
        _id: '',
        capacity: 0,
        status: '',
        tableNumber: 0,
    },
    totalAmount: 0,
    discountAmount: 0,
    finalAmount: 0,
    status: '',
    orderType: '',
    staffNotes: '',
    customNotes: '',
    paymentStatus: '',
    paymentDate: undefined,
    updateAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
};
