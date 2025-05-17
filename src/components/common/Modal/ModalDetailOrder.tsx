'use client';
import ExportOrderPDFButton from '@/components/features/ListOrder/ExportOrderPDFButton';
import { OrderStatusColors, OrderStatusEnum } from '@/constans/order';
import orderService from '@/services/orderService';
import { BillType, defaultBill } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import parseDateTime from '@/utils/parserTimeAndDate';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { CiTimer } from 'react-icons/ci';
interface Props {
    orderId: string;
}
export default function ModalDetailOrder(props: Props) {
    const [order, setOrder] = useState<BillType>(defaultBill);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const getOrder = async (id: string) => {
            const res = await orderService.getOrderById(id);
            if (res) {
                setOrder(res);
                setIsLoading(false);
            }
        };
        getOrder(props.orderId);
    }, [props.orderId]);
    return (
        <Box
            sx={{
                width: '800px',
                height: '500px',
                background: 'white',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Grid container height={'400px'}>
                <Grid size={{ xs: 6 }}>
                    {isLoading ? (
                        <Skeleton height={400} width={380} />
                    ) : (
                        <Box
                            sx={{
                                height: '100%',
                                maxHeight: '400px',
                                overflow: 'hidden',
                                overflowY: 'scroll',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {order.orderDetails.map((item) => {
                                return (
                                    <Box
                                        key={nanoid()}
                                        sx={{
                                            height: '40px',

                                            marginTop: '10px',
                                            marginBottom: '10px',
                                            width: '100%',
                                            fontSize: '12px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {JSON.stringify(item.product)}
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </Grid>
                <Grid size={{ xs: 6 }}>
                    {isLoading ? (
                        <Skeleton height={400} width={380} />
                    ) : (
                        <>
                            <Box>
                                <Typography>
                                    Bàn ăn: {order.table.tableNumber}
                                </Typography>
                            </Box>
                            <Box>
                                Tổng tiền: {formatPriceToVND(order.finalAmount)}
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '16px' }}>
                                    <CiTimer /> Thời gian đặt:{' '}
                                    <Typography
                                        component={'span'}
                                        sx={{ fontWeight: '600' }}
                                    >
                                        {parseDateTime(order.createdAt).time}
                                    </Typography>
                                </Typography>
                                <Typography
                                    component={'span'}
                                    sx={{ fontSize: '12px' }}
                                >
                                    Ngày: {parseDateTime(order.createdAt).date}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        component={'span'}
                                        sx={{
                                            position: 'absolute',
                                            left: '-14px',
                                            top: '35%',
                                            width: '10px',
                                            height: '10px',
                                            border: '1px solid gray',
                                            borderRadius: '50%',
                                            background:
                                                OrderStatusColors[
                                                    order.status as OrderStatusEnum
                                                ],
                                        }}
                                    ></Box>
                                    Trạng thái:{' '}
                                    <Typography
                                        component={'span'}
                                        sx={{
                                            borderRadius: '8px',
                                            padding: '2px',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {order.status}
                                    </Typography>
                                </Typography>
                            </Box>
                        </>
                    )}
                </Grid>
            </Grid>
            {isLoading ? (
                <Skeleton height={40} />
            ) : (
                <Box>
                    <ExportOrderPDFButton bill={order} />
                </Box>
            )}
        </Box>
    );
}
