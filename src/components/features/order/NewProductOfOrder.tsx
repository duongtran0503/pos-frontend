'use client';
import ConfirmDialog from '@/components/common/Dialog/ConfirmDialog';
import { PaymentStatusEnum } from '@/constans/payment';
import {
    deleteproductInOrder,
    paymentSelector,
    updateOrderDetail,
} from '@/redux/slice/paymentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import orderService from '@/services/orderService';
import {
    BillType,
    OrderDetailDefaultValue,
    OrderDetailType,
} from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Button, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { RiSubtractFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
interface Props {
    bill: BillType;
}
export default function NewProductOfOrder(props: Props) {
    const [isOpenDialogConfirm, setIsOpenDialogConfirm] =
        useState<boolean>(false);
    const [orderActive, setOrderActive] = useState<OrderDetailType>(
        OrderDetailDefaultValue
    );
    const router = useRouter();
    const orders = useAppSelector(paymentSelector);
    const dispatch = useAppDispatch();
    const handleIncrease = (order: OrderDetailType) => {
        dispatch(
            updateOrderDetail({
                isNew: true,
                product: order.product,
                quantity: order.quantity + 1,
            })
        );
    };
    const handleDecrease = (order: OrderDetailType) => {
        if (order.quantity > 1) {
            dispatch(
                updateOrderDetail({
                    isNew: true,
                    product: order.product,
                    quantity: order.quantity - 1,
                })
            );
        }
        if (order.quantity === 1) {
            setIsOpenDialogConfirm(true);
            setOrderActive(order);
        }
    };
    const handleDeleteProductInOrder = (order: OrderDetailType) => {
        dispatch(deleteproductInOrder(order));
        setIsOpenDialogConfirm(false);
    };
    const handleUpdateOrder = async () => {
        if (orders.orderDetail.length === 0) {
            toast.error('Vui lòng thêm sản phẩm!');
            return;
        }
        const res = await orderService.updateOrder(
            {
                orderDetails: [
                    ...props.bill.orderDetails,
                    ...orders.orderDetail,
                ].map((order) => ({
                    product: order.product._id,
                    quantity: order.quantity,
                    isNew: true,
                    notes: '',
                })),
                totalAmount: props.bill.totalAmount + orders.totalPrice,
                finalAmount: props.bill.finalAmount + orders.totalPrice,
                paymentStatus: props.bill.paymentStatus as PaymentStatusEnum,
                discountAmount: props.bill.discountAmount,
            },
            props.bill._id
        );
        if (res) {
            toast.success('Thêm sản phẩm thành công!');
            window.location.href =
                'http://localhost:3000/thanh-toan/' + res._id;
        } else {
            toast.error('Lỗi hệ thống!');
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto',
            }}
        >
            <Box
                sx={{
                    maxHeight: '400px',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                    scrollbarWidth: 'none',
                    padding: '5px',
                }}
            >
                <ConfirmDialog
                    isOpen={isOpenDialogConfirm}
                    onClose={() => setIsOpenDialogConfirm(false)}
                    title='Xóa sản phẩm khỏi giỏ hàng ?'
                    content={`Sản phẩm ${orderActive?.product.name}`}
                    handleAgree={() => handleDeleteProductInOrder(orderActive)}
                />
                {orders.orderDetail.map((order) => {
                    return (
                        <Box
                            key={nanoid()}
                            sx={{
                                height: '60px',
                                padding: '8px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '10px',
                                boxShadow:
                                    ' rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                                transition: 'box-shadow ease-in 0.2s',
                                '&:hover': {
                                    boxShadow:
                                        ' rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    maxWidth: '180px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {order.product.name}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        columnGap: '10px',
                                        height: '30px',
                                        alignItems: 'center',
                                        paddingLeft: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            padding: '2px',
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
                                        onClick={() => handleDecrease(order)}
                                    >
                                        <RiSubtractFill />
                                    </Box>

                                    <Box
                                        sx={{
                                            minWidth: '20px',
                                        }}
                                    >
                                        <Typography>
                                            {order.quantity}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            padding: '2px',
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
                                        onClick={() => handleIncrease(order)}
                                    >
                                        <IoAddOutline />
                                    </Box>
                                </Box>
                                <Typography sx={{ fontSize: '14px' }}>
                                    Tạm tính:{' '}
                                    {formatPriceToVND(
                                        order.product.price * order.quantity
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    borderTop: '1px solid gray',
                    paddingTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography>
                    Tổng tiền:{formatPriceToVND(orders.totalPrice)}
                </Typography>
                <Box
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <Button
                        sx={{ border: '1px solid' }}
                        onClick={handleUpdateOrder}
                    >
                        Xác nhận thêm vào đơn hàng
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
