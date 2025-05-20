'use client';

import { deleteOrder, updateOrder } from '@/redux/slice/orderSlice';
import { useAppDispatch } from '@/redux/store';
import { OrderDetailType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import Image from 'next/image';
import { RiDeleteBin6Line, RiSubtractFill } from 'react-icons/ri';
import ConfirmDialog from '@/components/common/Dialog/ConfirmDialog';
interface Props {
    order: OrderDetailType;
}

export default function ProductCart(props: Props) {
    const { order } = props;

    const [quantity, setQuantity] = useState<number>(order.quantity);
    const dispatch = useAppDispatch();
    const handleIncrease = () => {
        dispatch(
            updateOrder({
                product: order.product,
                quantity: quantity + 1,
                isNew: true,
            })
        );
        setQuantity((prev) => prev + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(
                updateOrder({
                    product: order.product,
                    quantity: quantity - 1,
                    isNew: true,
                })
            );
            setQuantity((prev) => prev - 1);
        }
    };
    const [isOpenDialogConfirm, setIsOpentDialogConfirm] =
        useState<boolean>(false);
    const handleDeleteOrder = () => {
        setIsOpentDialogConfirm(true);
    };
    const handleConfirmAgreeDeleteOrder = () => {
        dispatch(deleteOrder(order));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100px',
                padding: '10px',
                borderRadius: '10px',
                columnGap: '10px',
                alignItems: 'center',
                background: 'white',
                margin: '10px 0',
            }}
        >
            {order.isNew && (
                <Box
                    sx={{ cursor: 'pointer' }}
                    component={'div'}
                    onClick={handleDeleteOrder}
                >
                    <RiDeleteBin6Line />
                </Box>
            )}
            <ConfirmDialog
                isOpen={isOpenDialogConfirm}
                onClose={() => setIsOpentDialogConfirm(false)}
                title='Bạn muốn xóa món ăn khỏi giỏ hảng ?'
                content={`Món:${order.product.name}, số lượng:${order.quantity} phần`}
                handleAgree={handleConfirmAgreeDeleteOrder}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        columnGap: '10px',
                    }}
                >
                    <Box
                        sx={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={order.product.image}
                            alt=''
                            width={80}
                            height={80}
                        />
                    </Box>
                    <Box>
                        <Typography>
                            {order.product.name}

                            <Typography
                                component={'span'}
                                sx={{ color: 'red' }}
                            >
                                x {order.quantity}
                            </Typography>
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        minWidth: '380px',
                        height: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                        }}
                    >
                        <Box>
                            {order.isNew && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        columnGap: '10px',
                                        height: '60px',
                                        alignItems: 'center',
                                        paddingLeft: '30px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            padding: '5px',
                                            border: '1px solid gray',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '20%',
                                            '&:hover': {
                                                boxShadow:
                                                    ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                                            },
                                            ':disabled': {
                                                background: 'gray',
                                            },
                                        }}
                                        onClick={handleDecrease}
                                    >
                                        <RiSubtractFill />
                                    </Box>

                                    <Box
                                        sx={{
                                            minWidth: '20px',
                                        }}
                                    >
                                        <Typography>{quantity}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            padding: '5px',
                                            border: '1px solid gray',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '20%',
                                            '&:hover': {
                                                boxShadow:
                                                    ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                                            },
                                        }}
                                        component={'div'}
                                        onClick={handleIncrease}
                                    >
                                        <IoAddOutline />
                                    </Box>
                                </Box>
                            )}
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                Tổng tiền:
                                {formatPriceToVND(
                                    order.product.price * quantity
                                )}
                            </Typography>
                        </Box>
                    </Box>
                    tạm tính:{' '}
                    <Typography sx={{ color: 'red' }} component={'span'}>
                        {formatPriceToVND(order.product.price * quantity)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
