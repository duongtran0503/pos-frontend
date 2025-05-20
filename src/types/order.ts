import { defaultValueProductType, ProductType } from '@/types/product';
import { TableType } from '@/types/table';

export interface OrderDetailType {
    product: ProductType;
    quantity: number;
    isNew: boolean;
}
export const OrderDetailDefaultValue: OrderDetailType = {
    product: defaultValueProductType,
    quantity: 0,
    isNew: true,
};
export interface BillType {
    _id: string;
    orderDetails: OrderDetailType[];
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
    updatedAt: string;
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
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
};
