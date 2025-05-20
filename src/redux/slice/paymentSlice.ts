import { RootState } from '@/redux/store';
import { OrderDetailType } from '@/types/order';
import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface InitialStateType {
    orderDetail: OrderDetailType[];
    totalPrice: number;
}
const initialState: InitialStateType = {
    orderDetail: [],
    totalPrice: 0,
};
const paymentSlice = createSlice({
    initialState,
    name: 'payment',
    reducers: {
        addProductToOrder(state, action: PayloadAction<ProductType>) {
            if (
                state.orderDetail.some(
                    (order) => order.product._id === action.payload._id
                )
            ) {
                toast.error('Sản phẩm đã có trong giỏ hàng!');
            } else {
                state.orderDetail.push({
                    quantity: 1,
                    isNew: true,
                    product: action.payload,
                });
                state.totalPrice = state.orderDetail.reduce((total, curr) => {
                    return total + curr.product.price * curr.quantity;
                }, 0);
            }
        },
        updateOrderDetail(state, action: PayloadAction<OrderDetailType>) {
            const indexof = state.orderDetail.findIndex(
                (order) => order.product._id === action.payload.product._id
            );
            if (indexof !== -1) {
                state.orderDetail[indexof] = action.payload;
                state.totalPrice = state.orderDetail.reduce((total, curr) => {
                    return total + curr.product.price * curr.quantity;
                }, 0);
            }
        },
        deleteproductInOrder(state, action: PayloadAction<OrderDetailType>) {
            state.orderDetail = state.orderDetail.filter(
                (order) => order.product._id !== action.payload.product._id
            );
            state.totalPrice = state.orderDetail.reduce((total, curr) => {
                return total + curr.product.price * curr.quantity;
            }, 0);
        },
    },
});

export const { addProductToOrder, updateOrderDetail, deleteproductInOrder } =
    paymentSlice.actions;
export const paymentSelector = (state: RootState) => state.payment;
export default paymentSlice.reducer;
