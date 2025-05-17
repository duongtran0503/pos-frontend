'use client';
import LoadingOrderItem from '@/components/common/LoadingProduct/LoadingOrderItem';
import ItemOrder from '@/components/features/ListOrder/ItemOrder';
import { orderSelector, updateListBill } from '@/redux/slice/orderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import orderService from '@/services/orderService';
import { Box, Grid } from '@mui/material';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export default function ListOrder() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const store = useAppSelector(orderSelector);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getOrders = async () => {
            const res = await orderService.getOrder();
            dispatch(updateListBill(res));
            setIsLoading(false);
        };
        getOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
        return <LoadingOrderItem />;
    }
    return (
        <Box>
            <Grid container rowGap={5}>
                {store.listBill.map((order) => {
                    return (
                        <Grid key={nanoid()} size={{ xs: 12 / 4 }}>
                            <ItemOrder order={order} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
