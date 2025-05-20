'use client';
import LoadingOrder from '@/components/common/Loading/LoadingOrder';
import { OrderStatusEnum } from '@/constans/order';
import { PaymentStatusEnum } from '@/constans/payment';
import { updateBill } from '@/redux/slice/orderSlice';
import { useAppDispatch } from '@/redux/store';
import orderService from '@/services/orderService';
import { BillType, defaultBill } from '@/types/order';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { ChangeEvent, useEffect, useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { IoIosAddCircle } from 'react-icons/io';
interface Props {
    orderId: string;
}
export default function ModalAdminEditOrder(props: Props) {
    const [order, setOrder] = useState<BillType>(defaultBill);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const [valueStatusOrder, setValueStatusOrder] = useState<string>(
        OrderStatusEnum.PROCESSING
    );
    const [valueStatusPayment, setValueStatusPayment] = useState<string>(
        PaymentStatusEnum.UNPAID
    );
    const handleChangeSelectStatusOrder = (event: SelectChangeEvent) => {
        setValueStatusOrder(event.target.value);
    };
    const handleChangeStatusPayment = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value === PaymentStatusEnum.PAID) {
            setValueStatusOrder(OrderStatusEnum.SERVED);
        }
        setValueStatusPayment(event.target.value);
    };
    const handleUpdateOrder = async () => {
        setIsLoading(true);
        const res = await orderService.updateOrder(
            {
                status: valueStatusOrder as OrderStatusEnum,
                paymentStatus: valueStatusPayment as PaymentStatusEnum,
            },
            order._id
        );
        if (res) {
            dispatch(updateBill(res));
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (props.orderId) {
            const getOrder = async (id: string) => {
                const res = await orderService.getOrderById(id);
                if (res) {
                    setOrder(res);
                    setValueStatusOrder(res.status);
                    setIsLoading(false);
                }
            };
            getOrder(props.orderId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'transparent',
                    zIndex: isLoading ? 1000 : -100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <LoadingOrder />
            </Box>
            <Grid container height={400}>
                <Grid size={{ lg: 6 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                        }}
                    >
                        <Box>
                            <Typography>Thông tin đơn hàng</Typography>
                        </Box>
                        <Box
                            sx={{
                                height: '300px',
                                width: '380px',
                                overflow: 'hidden',
                            }}
                        >
                            {JSON.stringify(order)}
                        </Box>
                        <Box
                            sx={{
                                marginTop: '10px',
                            }}
                        >
                            <Button
                                startIcon={<IoIosAddCircle />}
                                sx={{
                                    background: 'white',
                                    color: 'black',
                                    fontSize: '14px',
                                    textTransform: 'lowercase',
                                    borderRadius: '8px',
                                    boxShadow:
                                        ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                                    '&:hover': {
                                        boxShadow:
                                            ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                                    },
                                    width: '200px',
                                }}
                            >
                                Thêm món ăn mới vào
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <Box>
                        <Typography>Cập nhật trạng thái đơn hàng</Typography>
                        <Box sx={{ height: '80px' }}>
                            <FormControl
                                sx={{ height: '40px' }}
                                disabled={
                                    order.status === OrderStatusEnum.CANCELLED
                                }
                            >
                                <Select
                                    value={valueStatusOrder}
                                    onChange={handleChangeSelectStatusOrder}
                                    displayEmpty
                                    defaultValue={valueStatusOrder}
                                >
                                    {Object.values(OrderStatusEnum).map(
                                        (status) => {
                                            return (
                                                <MenuItem
                                                    value={status}
                                                    key={nanoid()}
                                                >
                                                    {status}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    {order.status === OrderStatusEnum.CANCELLED ? (
                        <></>
                    ) : (
                        <Box>
                            <Typography>
                                Cập nhật trạng thái thanh toán
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    defaultValue={PaymentStatusEnum.UNPAID}
                                    name='radio-buttons-group'
                                    value={valueStatusPayment}
                                    onChange={handleChangeStatusPayment}
                                >
                                    <FormControlLabel
                                        value={PaymentStatusEnum.UNPAID}
                                        control={<Radio />}
                                        label='Chưa thanh toán'
                                    />
                                    <FormControlLabel
                                        value={PaymentStatusEnum.PAID}
                                        control={<Radio />}
                                        label='Đã thanh toán'
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    startIcon={<GrUpdate />}
                    sx={{
                        background: 'white',
                        color: 'black',
                        fontSize: '14px',
                        textTransform: 'lowercase',
                        borderRadius: '8px',
                        boxShadow:
                            ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',

                        '&:hover': {
                            boxShadow:
                                ' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                        },
                        width: '140px',
                    }}
                    onClick={handleUpdateOrder}
                >
                    Cập nhật
                </Button>
            </Box>
        </Box>
    );
}
