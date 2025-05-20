'use client';
import ConfirmDialog from '@/components/common/Dialog/ConfirmDialog';
import { deleteOrder, updateOrder } from '@/redux/slice/orderSlice';
import { useAppDispatch } from '@/redux/store';
import { OrderDetailType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { RiDeleteBin6Line, RiSubtractFill } from 'react-icons/ri';
interface Props {
    order: OrderDetailType;
}
export default function ItemCart(props: Props) {
    const { order } = props;
    const [isOpenDialogConfirm, setIsOpentDialogConfirm] =
        useState<boolean>(false);
    const dispatch = useAppDispatch();
    const handleIncrease = () => {
        dispatch(
            updateOrder({
                product: order.product,
                quantity: order.quantity + 1,
                isNew: true,
            })
        );
    };
    const handleDecrease = () => {
        if (order.quantity > 1) {
            dispatch(
                updateOrder({
                    product: order.product,
                    quantity: order.quantity - 1,
                    isNew: true,
                })
            );
        }
    };
    const handleDeleteOrder = () => {
        setIsOpentDialogConfirm(true);
    };
    const handleConfirmAgreeDeleteOrder = () => {
        dispatch(deleteOrder(order));
    };
    return (
        <Box
            sx={{
                width: '100%',
                margin: '10px 0',
            }}
        >
            <ConfirmDialog
                isOpen={isOpenDialogConfirm}
                onClose={() => setIsOpentDialogConfirm(false)}
                title='Bạn muốn xóa món ăn khỏi giỏ hảng ?'
                content={`Món:${order.product.name}, số lượng:${order.quantity} phần`}
                handleAgree={handleConfirmAgreeDeleteOrder}
            />
            <Box
                sx={{
                    padding: '10px',
                    display: 'flex',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    height: '110px',
                    border: '1px solid gray',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        background: '#ff715c',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        '&:hover': {
                            background: '#ff5940',
                        },
                        marginRight: '8px',
                    }}
                    onClick={handleDeleteOrder}
                >
                    <RiDeleteBin6Line color='white' />
                </Box>
                <Box
                    sx={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        width: '80px',
                        height: '80px',
                    }}
                >
                    <Image
                        src={order.product.image}
                        alt=''
                        width={80}
                        height={80}
                    />
                </Box>
                <Box
                    sx={{
                        padding: '0  10px',
                        display: 'flex',
                        width: '250px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                maxWidth: '250px',
                                fontWeight: '500',
                                fontSize: '16px',
                            }}
                        >
                            {order.product.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '14px', color: '#eb4034' }}>
                            Giá: {formatPriceToVND(order.product.price)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >
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
                            <Typography>{order.quantity}</Typography>
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
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Tổng tiền:
                            {formatPriceToVND(
                                order.product.price * order.quantity
                            )}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
