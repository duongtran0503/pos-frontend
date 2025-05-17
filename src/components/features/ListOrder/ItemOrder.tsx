'use client';
import ModalAdminEditOrder from '@/components/common/Modal/ModalAdminEditOrder';
import ModalDetailOrder from '@/components/common/Modal/ModalDetailOrder';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';
import { OrderStatusColors, OrderStatusEnum } from '@/constans/order';
import { PaymentStatusEnum } from '@/constans/payment';
import { BillType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import parseDateTime, { isWithinHours } from '@/utils/parserTimeAndDate';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CiTimer } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { PiBowlFood } from 'react-icons/pi';
interface Props {
    order: BillType;
}
export default function ItemOrder(props: Props) {
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isOpenModalDetailOrder, setIsOpenModalDetailOrder] =
        useState<boolean>(false);
    const [isOpenModalEditOrder, setIsOpenModalEditOrder] =
        useState<boolean>(false);
    useEffect(() => {
        if (isWithinHours(props.order.createdAt, 1)) {
            setIsNew(true);
        }
    }, []);
    return (
        <Box
            sx={{
                height: '250px',
                width: '300px',
                background: 'white',
                borderRadius: '10px',
                boxShadow:
                    ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                border: '1px solid transparent',
                '&:hover': {
                    border: '1px solid #e66d35',
                },
                padding: '8px',
                position: 'relative',
            }}
        >
            {isNew ? (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-10px',
                        right: 0,
                        width: '30px',
                        height: '20px',
                        background: 'rgb(255, 105, 105)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '20%',
                    }}
                >
                    <Typography sx={{ fontSize: '10px', color: 'white' }}>
                        NEW
                    </Typography>
                </Box>
            ) : (
                <></>
            )}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid gray',
                    paddingBottom: '10px',
                }}
            >
                <Typography sx={{ fontSize: '16px' }}>
                    Bàn:{props.order.table.tableNumber}
                </Typography>
                <Typography sx={{ fontSize: '16px', position: 'relative' }}>
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
                                    props.order.status as OrderStatusEnum
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
                        {props.order.status}
                    </Typography>
                </Typography>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        columnGap: '10px',
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: '16px' }}>
                            <PiBowlFood /> Số lượng món ăn:
                            <Typography
                                sx={{ fontWeight: '600' }}
                                component={'span'}
                            >
                                {props.order.orderDetails.length}
                            </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '16px' }}>
                            <CiTimer /> Thời gian đặt:{' '}
                            <Typography
                                component={'span'}
                                sx={{ fontWeight: '600' }}
                            >
                                {parseDateTime(props.order.createdAt).time}
                            </Typography>
                        </Typography>
                        <Typography
                            component={'span'}
                            sx={{ fontSize: '12px' }}
                        >
                            Ngày: {parseDateTime(props.order.createdAt).date}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '5px',

                    borderTop: '1px solid gray',
                }}
            >
                <Typography sx={{ fontSize: '16px' }}>Tổng tiền:</Typography>
                <Typography sx={{ fontSize: '16px', color: 'red' }}>
                    {' '}
                    {formatPriceToVND(props.order.finalAmount)}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                }}
            >
                <Typography sx={{ fontSize: '16px' }}>
                    Tổng tiền đã thu:
                </Typography>
                <Typography sx={{ fontSize: '16px', color: 'red' }}>
                    {' '}
                    {props.order.paymentStatus === PaymentStatusEnum.PAID ? (
                        <>{formatPriceToVND(props.order.finalAmount)}</>
                    ) : (
                        <>{formatPriceToVND(0)}</>
                    )}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    startIcon={<FaEye />}
                    sx={{
                        background: 'white',
                        color: 'black',
                        fontSize: '16px',
                        textTransform: 'lowercase',
                        borderRadius: '8px',
                        boxShadow:
                            ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                        '&:hover': {
                            boxShadow:
                                ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                        },
                        width: '130px',
                    }}
                    onClick={() => setIsOpenModalDetailOrder(true)}
                >
                    Chi tiết
                </Button>
                <Button
                    startIcon={<MdEdit />}
                    sx={{
                        background: 'white',
                        color: 'black',
                        fontSize: '16px',
                        textTransform: 'lowercase',
                        borderRadius: '8px',
                        boxShadow:
                            ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                        '&:hover': {
                            boxShadow:
                                ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                        },
                        width: '130px',
                    }}
                    onClick={() => setIsOpenModalEditOrder(true)}
                >
                    chỉnh sửa
                </Button>
            </Box>
            <ModalWrapper
                isOpen={isOpenModalEditOrder}
                onClose={() => setIsOpenModalEditOrder(false)}
            >
                <ModalAdminEditOrder orderId={props.order._id} />
            </ModalWrapper>
            <ModalWrapper
                isOpen={isOpenModalDetailOrder}
                onClose={() => setIsOpenModalDetailOrder(false)}
            >
                <ModalDetailOrder orderId={props.order._id} />
            </ModalWrapper>
        </Box>
    );
}
