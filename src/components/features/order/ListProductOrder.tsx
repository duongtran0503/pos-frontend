'use client';

import ProductCart from '@/components/features/order/ProductCart';
import { orderSelector } from '@/redux/slice/orderSlice';
import { useAppSelector } from '@/redux/store';
import { Box } from '@mui/material';
import { nanoid } from 'nanoid';

export default function ListProductOrder() {
    const orders = useAppSelector(orderSelector);
    return (
        <Box>
            {orders.listOrder.map((order) => {
                return <ProductCart key={nanoid()} order={order} />;
            })}
        </Box>
    );
}
