import { localStorageName } from '@/constans/localStorage';
import { OrderStatusEnum } from '@/constans/order';
import { RootState } from '@/redux/store';
import { BillType, OrderDetailType } from '@/types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface orderState {
    listOrder: OrderDetailType[];
    totalPrice: number;
    totalProduct: number;
    orderStatus: OrderStatusEnum;
    id: string;
    listBill: BillType[];
}

const initialState: orderState = {
    listOrder: [],
    totalPrice: 0,
    totalProduct: 0,
    orderStatus: OrderStatusEnum.PENDING,
    id: '',
    listBill: [],
};

export const orderSilde = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<OrderDetailType>) {
            const newProduct = [
                ...state.listOrder,
                {
                    product: action.payload.product,
                    quantity: action.payload.quantity,
                    isNew: true,
                },
            ];
            const totalProduct = newProduct.length;
            const totalPrice = newProduct.reduce((total, curr) => {
                return total + curr.product.price * curr.quantity;
            }, 0);
            saveOrderToLocalStorage({
                ...state,
                totalPrice,
                totalProduct,
                listOrder: newProduct,
            });
            return {
                ...state,
                totalPrice,
                totalProduct,
                listOrder: newProduct,
            };
        },
        updateOrder: (state, action: PayloadAction<OrderDetailType>) => {
            const { product, quantity } = action.payload;
            const existingOrderIndex = state.listOrder.findIndex(
                (order) => order.product._id === product._id
            );

            if (existingOrderIndex !== -1) {
                state.listOrder = state.listOrder.map((order, index) =>
                    index === existingOrderIndex
                        ? { ...order, quantity: quantity }
                        : order
                );
            }

            state.totalPrice = state.listOrder.reduce((total, curr) => {
                return total + curr.product.price * curr.quantity;
            }, 0);
            saveOrderToLocalStorage(state);
        },
        deleteOrder(state, action: PayloadAction<OrderDetailType>) {
            state.listOrder = state.listOrder.filter(
                (order) => order.product._id !== action.payload.product._id
            );
            state.totalPrice = state.listOrder.reduce((total, curr) => {
                return total + curr.product.price * curr.quantity;
            }, 0);
            state.totalProduct = state.listOrder.length;
            saveOrderToLocalStorage(state);
        },
        setIsOrdered(state, action: PayloadAction<string>) {
            state.orderStatus = action.payload as OrderStatusEnum;
            saveOrderToLocalStorage(state);
        },
        updateOrderId(state, action: PayloadAction<string>) {
            state.id = action.payload;
            saveOrderToLocalStorage(state);
        },
        resetOrder(_state, action: PayloadAction<orderState | undefined>) {
            const newState = action.payload ?? initialState;
            saveOrderToLocalStorage(newState);
            return newState;
        },
        updateListBill(state, action: PayloadAction<BillType[]>) {
            state.listBill = action.payload;
        },
        updateBill(state, action: PayloadAction<BillType>) {
            const isExisted = state.listBill.findIndex(
                (bill) => bill._id === action.payload._id
            );
            if (isExisted !== -1) {
                state.listBill[isExisted] = action.payload;
            }
        },
    },
});
const saveOrderToLocalStorage = (order: orderState) => {
    localStorage.setItem(localStorageName.STORE_ORDER, JSON.stringify(order));
};
export const {
    addProduct,
    updateOrder,
    deleteOrder,
    resetOrder,
    setIsOrdered,
    updateOrderId,
    updateListBill,
    updateBill,
} = orderSilde.actions;
export const orderSelector = (state: RootState) => state.order;
export default orderSilde.reducer;
