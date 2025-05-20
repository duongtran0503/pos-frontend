import { useDispatch, useSelector } from 'react-redux';
import orderReducer from '@/redux/slice/orderSlice';
import paymentReducer from '@/redux/slice/paymentSlice';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        order: orderReducer,
        payment: paymentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
